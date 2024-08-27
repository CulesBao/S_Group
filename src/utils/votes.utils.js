import db from '../config/db.js'
let isValidId = async (id) => {
    try{
        const [person] = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
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

let isValidPollId = async (id) => {
    try{
        const [poll] = await db.pool.query('SELECT * FROM `polls` WHERE id = ?', [id])
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

let isValidOptionId = async (id) => {
    try{
        const [option] = await db.pool.query('SELECT * FROM `option` WHERE id = ?', [id])
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

let lockStatus = async(id) => {
    try{
        const [status] = await db.pool.query(`SELECT isLock FROM polls WHERE id = ?`, [id])

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
export default {lockStatus, isValidId, isValidPollId, isValidOptionId}