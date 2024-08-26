import votesService from '../services/votes.service.js';
 
const createPoll = async (req, res) => {
    try{
        const obj = req.body;
        const response = await votesService.createPoll(obj)
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
        const obj = req.body
        const response = await votesService.createOption(obj)
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
        const obj = req.body
        const response = await votesService.vote(obj)
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
        const obj = req.body
        const response = await votesService.unVote(obj)
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

const isLock = async(req, res) => {
    try{
        let obj = req.body
        const response = await votesService.isLock(obj)
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

export default {createPoll, createOption, vote, getVote, deletePoll, unVote, isLock}