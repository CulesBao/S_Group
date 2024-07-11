import db from '../config/db.js'
import timeUtils from '../utils/time.utils.js'

const createPoll = async(obj) => {
    try{
        const createAt = await timeUtils.time();
        await db.pool.query(`INSERT INTO polls(title, userId, createAt, isLock) VALUES (?, ?, ?, ?)`, [obj.title, obj.userId, createAt, obj.isLock])
        return true
    }
    catch(err){
        console.log('Loi o service: ', err)
        return false
    }
}

const deletePoll = async(id) => {
    try{
        await db.pool.query('DELETE FROM user_options WHERE optionId = ANY(SELECT id FROM `option` WHERE pollId = ?)', [id])
        await db.pool.query('DELETE FROM `option` WHERE pollId = ?', [id])
        await db.pool.query(`DELETE FROM polls WHERE id = ?`, [id])
        return true
    }
    catch(err){
        console.log('Loi o service: ', err)
        return false
    }
}

//Obj: pollId, title array, 
const createOption = async (obj) => {
    try{
        const createAt = await timeUtils.time()

        await db.pool.query('INSERT INTO `option` (title, createAt, pollId) VALUES (?, ?, ?)', [obj.title, createAt, obj.pollId])

        return true
    }
    catch(err){
        console.log('Loi o service: ', err)
        return false
    }
}

//obj: userId, optionId
const vote = async(obj) => {
    try{
        const person = await db.pool.query(`SELECT * FROM user_options WHERE userId = ? AND optionId = ?`, [obj.userId, obj.optionId])
        if (person[0].length > 0)
            return false
        else{
            db.pool.query(`INSERT INTO user_options(userId, optionId) VALUES (?, ?)`, [obj.userId, obj.optionId])
            return true
        }
    }
    catch(err){
        console.log('Loi o service: ', err)
        return false
    }
}

const unVote = async(obj) => {
    try{
        await db.pool.query(`DELETE FROM user_options WHERE userId = ? AND optionId = ?`, [obj.userId, obj.optionId])
        return true
    }
    catch(err){
        console.log('Loi o service: ', err)
        return false
    }
}

const getVote = async(id) => {
    try{
        const poll = await db.pool.query('SELECT * FROM polls WHERE id = ?', [id])

        const person = await db.pool.query(`SELECT username FROM users WHERE id = ?`, [poll[0][0].userId])
        const getData = await db.pool.query('SELECT o.title, o.createAt, COUNT(s.optionId) AS count FROM `option` o LEFT JOIN user_options s ON o.id = s.optionId WHERE o.pollId = ? GROUP BY o.id', [id]);
        console.log(person[0][0])
        let ans = {
            title: poll[0][0].title,
            createAt: poll[0][0].createAt,
            createdBy: person[0][0].username,
            Lock: poll[0][0].isLock,
            options: getData[0].map((data) => ({
            option: data.title,
            dayCreated: data.createAt,
            numberOfVotes: data.count
            }))
        }
        return ans; // Add this line to return the result
    }
    catch(err){
        console.log('Loi o service: ', err)
        return false
    }
}

const isLock = async(obj) => {
    try{
        await db.pool.query(`UPDATE polls SET isLock = ? WHERE id = ? AND userId = ?`, [obj.isLock, obj.pollId, obj.userId])
    }
    catch(err){
        console.log('Loi o service: ', err)
        return false
    }
}

export default {createPoll, createOption, vote, getVote, deletePoll, unVote, isLock}