import db from '../config/db.js'

let isValidId = async (id) => {
    try{
        const person = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
        if (person[0].length == 0){
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
        const poll = await db.pool.query('SELECT * FROM `polls` WHERE id = ?', [id])
        if (poll[0].length == 0){
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
        const option = await db.pool.query('SELECT * FROM `option` WHERE id = ?', [id])
        if (option[0].length == 0){
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
        const status = await db.pool.query(`SELECT isLock FROM polls WHERE id = ?`, [id])

        if (status[0][0].isLock == false)
            return true
        else
            return false
    }
    catch(err){
        console.log("Err in lockStatus: ", err)
        return false
    }
}

const createPoll = async (req, res, next) => {
    try{
        const object = req.body;
        console.log(object, !object.title)

        if (!object.title) {
            return res.status(400).send('There was no poll in the request');
        }
        if (!(object.isLock == true || object.isLock == false)) {
            return res.status(400).send('isLock must be a boolean');
        }
        if (! await isValidId(object.userId))
            return res.status(400).send("UserId is not valid")
        
        next();
    }
    catch(err){
        console.log("Loi o middleware: ", err)
        return res.status(400).json("Error in middleware: ", err)
    }
}

const deletePoll = async(req, res, next) => {
    try{
        let pollId = req.params.id
        if (!await lockStatus(pollId))
            return res.status(400).json("Poll is locked!")

        let boolean = await isValidPollId(pollId)

        console.log(boolean)
        if (!boolean)
            return res.status(400).json("PollId is not valid")

        return next()
    }
    catch(err){
        console.log("Loi o middleware: ", err)
        return res.status(400).json("Error in middleware: ", err)
    }
}

const createOption = async(req, res, next) => {
    try{
        const obj = req.body
        if (!await lockStatus(obj.pollId))
            return res.status(400).json("Poll is locked!")

        const boolean = await isValidPollId(obj.pollId)
        if (!boolean)
            return res.status(400).json("Poll ID is not valid")
        if (obj.title == '')
            return res.status(400).json("Title mustn't be empty")

        next();
    }
    catch(err){
        console.log("Loi o middleware: ", err)
        return res.status(400).json("Error in middleware: ", err)
    }
}

const vote = async(req, res, next) => {
    try{
        let obj = req.body
        
        if (! await isValidId(obj.userId))
            return res.status(400).json("UserId is not valid")
        if (! await isValidOptionId(obj.optionId))
            return res.status(400).json("OptionId is not valid")
        let pollId = await db.pool.query('SELECT pollId FROM `option` WHERE id = ?', [obj.optionId])
        if (!await lockStatus(pollId[0][0].pollId))
            return res.status(400).json("Poll is locked!")

        next()
    }
    catch(err){
        console.log("Loi o middleware: ", err)
        return res.status(400).json("Error in middleware: ", err)
    }
}

const unVote = async(req, res, next) =>{
    try{
        const obj = req.body
        let vote = await db.pool.query(`SELECT * FROM user_options WHERE userId = ? AND optionId = ?`, [obj.userId, obj.optionId])
        
        if (vote[0].length == 0){
            return res.status(400).json("There isn't existed voted for OptionId " + obj.optionId + " by the UserId " + obj.userId)
        }

        let pollId = await db.pool.query('SELECT pollId FROM `option` WHERE id = ?', [obj.optionId])
        if (!await lockStatus(pollId[0][0].pollId))
            return res.status(400).json("Poll is locked!")
        
        next()
    }
    catch(err){
        console.log("Loi o middleware: ", err)
        return res.status(400).json("Error in middleware: ", err)
    }
}

const getVote = async(req, res, next) => {
    try{
        let poll = req.params.id
        if (!await isValidPollId(poll))
            return res.status(400).json("PollId is not valid")

        next()
    }
    catch(err){
        console.log("Loi o middleware: ", err)
        return res.status(400).json("Error in middleware: ", err)
    }
}

const isLock = async(req, res, next) => {
    try{
        let obj = req.body
        let poll = await db.pool.query(`SELECT * FROM polls WHERE userId = ? AND id = ?`, [obj.userId, obj.pollId])
        if (poll[0].length > 0)
            return next()
        else
            return res.status(400).json("Invalid userId or pollId")
    }
    catch(err){
        console.log("Loi o middleware: ", err)
        return res.status(400).json("Error in middleware: ", err)
    }
}

export default {createPoll, createOption, vote, getVote, deletePoll, unVote, isLock}