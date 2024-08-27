import votesService from '../services/votes.service.js';
 
const createPoll = async (req, res) => {
    try{
        const pollInfo = req.body;
        const response = await votesService.createPoll(pollInfo)
        let {status, ...message} = response

        res.status(status).json(message)
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

const deletePoll = async(req, res) => {
    try{
        const id = req.params.id
        const response = await votesService.deletePoll(id)
        let {status, ...message} = response

        res.status(status).json(message)
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

const createOption = async(req, res) => {
    try{
        const optionInfo = req.body
        const response = await votesService.createOption(optionInfo)
        let {status, ...message} = response

        res.status(status).json(message)
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

const vote = async (req, res) => {
    try{
        const voteInfo = req.body
        console.log(voteInfo)
        const response = await votesService.vote(voteInfo)
        let {status, ...message} = response

        res.status(status).json(message)
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

const unVote = async(req, res) => {
    try{
        const unVoteInfo = req.body
        const response = await votesService.unVote(unVoteInfo)
        let {status, ...message} = response

        res.status(status).json(message)
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

const getVote = async(req, res) => {
    try{
        const id = req.params.id
        const response = await votesService.getVote(id)
        let {status, ...message} = response

        res.status(status).json(message)
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

const lockStatus = async(req, res) => {
    try{
        let lockStatusInfo = req.body
        const response = await votesService.lockStatus(lockStatusInfo)
        let {status, ...data} = response

        res.status(status).json(data)
    }
    catch(err){
        return {
            status: 500,
            message: "Internal server error"
        }
    }
}

export default {createPoll, createOption, vote, getVote, deletePoll, unVote, lockStatus}