import votesUtils from '../utils/votes.utils.js'
import regexUtils from '../utils/regex.utils.js';
import database from '../config/db.js'

const createPoll = async (req, res, next) => {
    try{
        const pollInfo = req.body;

        if (!regexUtils.whiteSpace(pollInfo.title)) {
            return res.status(400).send({
                message: 'Title is required'
            });
        }
        if (typeof pollInfo.isLock !== 'boolean') {
            return res.status(400).send({
                message: 'Lock must be a boolean'
            });
        }
        if (! await votesUtils.isValidId(pollInfo.userId))
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
        if (!await votesUtils.lockStatus(pollId))
            return res.status(400).json({
                message: "Poll is locked!"
            })

        if (!await votesUtils.isValidPollId(pollId))
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
        const optionInfo = req.body

        if (!await votesUtils.isValidPollId(optionInfo.pollId))
            return res.status(400).json({
                message: "PollId is not valid"
            })
        if (!await votesUtils.lockStatus(optionInfo.pollId))
            return res.status(400).json({
                message: "Poll is locked!"
            })  
        if (!await regexUtils.whiteSpace(optionInfo.title))
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
        let voteInfo = req.body

        let pollId = await database.pool.query('SELECT pollId FROM `option` WHERE id = ?', [voteInfo.optionId])
        if (!pollId[0][0])
            return res.status(400).json({
                message: "OptionId is not valid"
            })
        if (!await votesUtils.lockStatus(pollId[0][0].pollId))
            return res.status(400).json({
                message: "Poll is locked!"
            })
        if (! await votesUtils.isValidId(voteInfo.userId))
            return res.status(400).json({
                message: "UserId is not valid"
            })
        if (! await votesUtils.isValidOptionId(voteInfo.optionId))
            return res.status(400).json({
                message: "OptionId is not valid"
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
        const unVoteInfo = req.body
        let pollId = await database.pool.query('SELECT pollId FROM `option` WHERE id = ?', [unVoteInfo.optionId])
        if (!pollId[0][0])
            return res.status(400).json({
                message: "OptionId is not valid"
            })
        if (!await votesUtils.lockStatus(pollId[0][0].pollId))
            return res.status(400).json({
                message: "Poll is locked!"
            })  

        let voted = await database.pool.query(`SELECT * FROM user_options WHERE userId = ? AND optionId = ?`, [unVoteInfo.userId, unVoteInfo.optionId])
        if (voted[0].length == 0){
            return res.status(400).json({
                message: "UserId is not valid"
            })
        }
        
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
        let pollId = req.params.id
        if (!await votesUtils.isValidPollId(pollId))
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

const lockStatus = async(req, res, next) => {
    try{
        let lockStatusInfo = req.body
        let [poll] = await database.pool.query(`SELECT * FROM polls WHERE userId = ? AND id = ?`, [lockStatusInfo.userId, lockStatusInfo.pollId]);
        console.log(poll[0] == undefined)
        console.log(poll[0])
        if (poll[0] == undefined)
            return res.status(400).json({
                message: "Wrong userId or pollId"
            })
        console.log("next11111111111")
        next()
        console.log("next")
    }
    catch(err){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export default {createPoll, createOption, vote, getVote, deletePoll, unVote, lockStatus}