import pollService from '../services/poll.service.js'
import regexUtils from '../utils/regex.utils.js';

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
        if (! await pollService.isValidId(pollInfo.userId))
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
        if (!await pollService.lockStatus(pollId))
            return res.status(400).json({
                message: "Poll is locked!"
            })

        if (!await pollService.isValidPollId(pollId))
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

        if (!await pollService.isValidPollId(optionInfo.pollId))
            return res.status(400).json({
                message: "PollId is not valid"
            })
        if (!await pollService.lockStatus(optionInfo.pollId))
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

        let [pollId] = await pollService.pollId(voteInfo.optionId)
        if (!pollId[0])
            return res.status(400).json({
                message: "OptionId is not valid"
            })
        if (!await pollService.lockStatus(pollId[0].pollId))
            return res.status(400).json({
                message: "Poll is locked!"
            })
        if (! await pollService.isValidId(voteInfo.userId))
            return res.status(400).json({
                message: "UserId is not valid"
            })
        if (! await pollService.isValidOptionId(voteInfo.optionId))
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
        let [pollId] = await pollService.pollId(unVoteInfo.optionId)
        if (!pollId[0])
            return res.status(400).json({
                message: "OptionId is not valid"
            })
        if (!await pollService.lockStatus(pollId[0].pollId))
            return res.status(400).json({
                message: "Poll is locked!"
            })  

        let [voted] = await pollService.voted(unVoteInfo.userId, unVoteInfo.optionId)
        if (voted.length == 0){
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
        if (!await pollService.isValidPollId(pollId))
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
        let [poll] = await pollService.poll(lockStatusInfo.userId, lockStatusInfo.pollId)
        if (poll[0] == undefined)
            return res.status(400).json({
                message: "Wrong userId or pollId"
            })
        next()
    }
    catch(err){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export default {createPoll, createOption, vote, getVote, deletePoll, unVote, lockStatus}