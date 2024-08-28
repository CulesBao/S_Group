import database from '../config/db.js'
const isValidId = async (id) => {
    try{
        const [person] = await database.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
        if (person.length == 0){
            console.log('ID user khong hop le')
            return false
        }
        return true
    }
    catch(err){
        console.log("Err in isValidId: ", err)
        return false
    }
}

const isValidPollId = async (id) => {
    try{
        const [poll] = await database.pool.query('SELECT * FROM `polls` WHERE id = ?', [id])
        if (poll.length == 0){
            console.log('ID poll khong hop le')
            return false
        }
        return true
    }
    catch(err){
        console.log("Err in isValidPollId: ", err)
        return false
    }
}

const isValidOptionId = async (id) => {
    try{
        const [option] = await database.pool.query('SELECT * FROM `option` WHERE id = ?', [id])
        if (option.length == 0){
            console.log('ID Option khong hop le')
            return false
        }
        return true
    }
    catch(err){
        console.log("Err in isValidOptionId: ", err)
        return false
    }
}

const lockStatus = async(id) => {
    try{
        const [status] = await database.pool.query(`SELECT isLock FROM polls WHERE id = ?`, [id])

        if (status[0].isLock == false)
            return true
        else
            return false
    }
    catch(err){
        console.log("Err in lockStatus: ", err)
        return false
    }
}

const pollId = async(optionId) => {
    return await database.pool.query('SELECT pollId FROM `option` WHERE id = ?', [optionId])
}
const voted = async(userId, optionId) => {
    return await database.pool.query(`SELECT * FROM user_options WHERE userId = ? AND optionId = ?`, [userId, optionId])
}
const poll = async (userId, pollId) => {
    return await database.pool.query(`SELECT * FROM polls WHERE userId = ? AND id = ?`, [userId, pollId])
}
export default {lockStatus, isValidId, isValidPollId, isValidOptionId, pollId, voted, poll}