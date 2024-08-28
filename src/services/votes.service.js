import db from '../config/db.js'
import timeUtils from '../utils/time.utils.js'

const createPoll = async(pollInfo) => {
    try{
        const createAt = await timeUtils.time();
        await db.pool.query(`INSERT INTO polls(title, userId, createAt, isLock) VALUES (?, ?, ?, ?)`, [pollInfo.title, pollInfo.userId, createAt, pollInfo.isLock])
        let [pollId] = await db.pool.query('SELECT id FROM polls WHERE title = ? AND userId = ? AND createAt = ? AND isLock = ?', [pollInfo.title, pollInfo.userId, createAt, pollInfo.isLock])
        return {
            status: 200,
            message: "Create poll success!",
            pollId: pollId[0].id
        }
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

const deletePoll = async(id) => {
    try{
        await db.pool.query('DELETE FROM user_options WHERE optionId = ANY(SELECT id FROM `option` WHERE pollId = ?)', [id])
        await db.pool.query('DELETE FROM `option` WHERE pollId = ?', [id])
        await db.pool.query(`DELETE FROM polls WHERE id = ?`, [id])
        
        return {
            status: 200,
            message: "Delete poll success!"
        }
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

//Obj: pollId, title array, 
const createOption = async (optionInfo) => {
    try{
        const createAt = await timeUtils.time()
        await db.pool.query('INSERT INTO `option` (title, createAt, pollId) VALUES (?, ?, ?)', [optionInfo.title, createAt, optionInfo.pollId])
        let [optionId] = await db.pool.query('SELECT id FROM `option` WHERE title = ? AND pollId = ?', [optionInfo.title, optionInfo.pollId])

        return {
            status: 200,
            message: "Create option success!",
            optionId: optionId[0].id
        }
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

//obj: userId, optionId
const vote = async(voteInfo) => {
    try{
        const [voted] = await db.pool.query(`SELECT * FROM user_options WHERE userId = ? AND optionId = ?`, [voteInfo.userId, voteInfo.optionId])
        if (voted.length > 0)
            return {
                status: 400,
                message: "You have voted for this option!"
            }
        else{
            db.pool.query(`INSERT INTO user_options(userId, optionId) VALUES (?, ?)`, [voteInfo.userId, voteInfo.optionId])
            return {
                status: 200,
                message: "Vote success!"
            }
        }
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

const unVote = async(unVoteInfo) => {
    try{
        await db.pool.query(`DELETE FROM user_options WHERE userId = ? AND optionId = ?`, [unVoteInfo.userId, unVoteInfo.optionId])
        return {
            status: 200,
            message: "Unvote success!"
        }
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

const getVote = async(id) => {
    try{
        const [poll] = await db.pool.query('SELECT * FROM polls WHERE id = ?', [id])
        const [person] = await db.pool.query(`SELECT username FROM users WHERE id = ?`, [poll[0].userId])
        const [getData] = await db.pool.query('SELECT o.title, o.createAt, COUNT(s.optionId) AS count FROM `option` o LEFT JOIN user_options s ON o.id = s.optionId WHERE o.pollId = ? GROUP BY o.id', [id])
        let pollInfo = {
            title: poll[0].title,
            createAt: poll[0].createAt,
            createdBy: person[0].username,
            Lock: poll[0].isLock,
            options: getData.map((data) => ({
                option: data.title,
                dayCreated: data.createAt,
                numberOfVotes: data.count
            }))
        }
        return {
            status: 200,
            message: "Get vote success!",
            pollInfo
        }
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

const lockStatus = async(lockStatusInfo) => {
    try{
        await db.pool.query(`UPDATE polls SET isLock = ? WHERE id = ? AND userId = ?`, [lockStatusInfo.isLock, lockStatusInfo.pollId, lockStatusInfo.userId])
        return {
            status: 200,
            message: "Set " + lockStatusInfo.isLock + " for poll where pollId = " + lockStatusInfo.pollId + " success!" 
        }     
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

export default {createPoll, createOption, vote, getVote, deletePoll, unVote, lockStatus}