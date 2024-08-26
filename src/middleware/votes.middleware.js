import votesUtils from '../utils/votes.utils.js'
import db from '../config/db.js'

const createPoll = async (req, res, next) => {
    try{
        const object = req.body;

        if (!object.title) {
            return res.status(400).send({
                message: 'Title is required'
            });
        }
        if (typeof object.isLock !== 'boolean') {
            return res.status(400).send({
                message: 'Lock must be a boolean'
            });
        }
        if (! await votesUtils.isValidId(object.userId))
            return res.status(400).send({
                message: 'UserId is not valid'
            })
        
        next();
    }
    catch(err){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const deletePoll = async(req, res, next) => {
    try{
        let pollId = req.params.id
        let boolean = await votesUtils.isValidPollId(pollId)
        if (!await votesUtils.lockStatus(pollId))
            return res.status(400).json({
                message: "Poll is locked!"
            })

        if (!boolean)
            return res.status(400).json({
                message: "PollId is not valid"
            })

        return next()
    }
    catch(err){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const createOption = async(req, res, next) => {
    try{
        const obj = req.body
        const boolean = await votesUtils.isValidPollId(obj.pollId)

        if (!await votesUtils.lockStatus(obj.pollId))
            return res.status(400).json({
                message: "Poll is locked!"
            })  
        if (!boolean)
            return res.status(400).json({
                message: "PollId is not valid"
            })
        if (!obj.title)
            return res.status(400).json({
                message: "Title is required"
            })

        next();
    }
    catch(err){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const vote = async(req, res, next) => {
    try{
        let obj = req.body
        
        if (! await votesUtils.isValidId(obj.userId))
            return res.status(400).json({
                message: "UserId is not valid"
            })
        if (! await votesUtils.isValidOptionId(obj.optionId))
            return res.status(400).json({
                message: "OptionId is not valid"
            })
        let pollId = await db.pool.query('SELECT pollId FROM `option` WHERE id = ?', [obj.optionId])
        if (!await votesUtils.lockStatus(pollId[0][0].pollId))
            return res.status(400).json({
                message: "Poll is locked!"
            })

        next()
    }
    catch(err){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const unVote = async(req, res, next) =>{
    try{
        const obj = req.body
        let vote = await db.pool.query(`SELECT * FROM user_options WHERE userId = ? AND optionId = ?`, [obj.userId, obj.optionId])
        
        if (vote[0].length == 0){
            return res.status(400).json({
                message: "There isn't existed voted for OptionId " + obj.optionId + " by the UserId " + obj.userId
            })
        }

        let pollId = await db.pool.query('SELECT pollId FROM `option` WHERE id = ?', [obj.optionId])
        if (!await votesUtils.lockStatus(pollId[0][0].pollId))
            return res.status(400).json({
                message: "Poll is locked!"
            })  
        
        next()
    }
    catch(err){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const getVote = async(req, res, next) => {
    try{
        let poll = req.params.id
        if (!await votesUtils.isValidPollId(poll))
            return res.status(400).json({
                message: "PollId is not valid"
            })

        next()
    }
    catch(err){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

const isLock = async(req, res, next) => {
    try{
        let obj = req.body
        let poll = await db.pool.query(`SELECT * FROM polls WHERE userId = ? AND id = ?`, [obj.userId, obj.pollId])
        if (poll[0].length > 0)
            return next()
        else
            return res.status(400).json({
                message: "You don't have permission to lock/unlock this poll"
            })
    }
    catch(err){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export default {createPoll, createOption, vote, getVote, deletePoll, unVote, isLock}