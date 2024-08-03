import votesService from '../services/votes.service.js';
 
const createPoll = async (req, res) => {
    try{
        const obj = req.body;
        const boolean = await votesService.createPoll(obj)
        if (boolean){
            console.log("Tao poll thanh cong")
            res.status(200).json("Create poll completed!")
        }
        else{
            console.log('Tao poll that bai');
            res.status(400).json("Failed to create poll")
        }
        return
    }
    catch(err){
        console.log("Loi o controller: ", err)
        res.status(400).json("Error in controller: ", err)
    }
}

const deletePoll = async(req, res) => {
    try{
        const id = req.params.id

        if (await votesService.deletePoll(id))
            res.status(200).json("Poll with ID " + id + " has been deleted!")
        else
            res.status(400).json("Cannot delete this poll")
        return
    }
    catch(err){
        console.log("Loi o controller: ", err)
        res.status(400).json("Error in controller: ", err)
    }
}

const createOption = async(req, res) => {
    try{
        const obj = req.body
        const boolean = await votesService.createOption(obj)

        if (boolean){
            console.log("Tao option thanh cong")
            res.status(200).json("Create option completed!")
        }
        else{
            console.log('Tao option that bai');
            res.status(400).json("Failed to create option")
        }
        return
    }
    catch(err){
        console.log("Loi o controller: ", err)
        res.status(400).json("Error in controller: ", err)
    }
}

const vote = async (req, res) => {
    try{
        const obj = req.body
        const boolean = await votesService.vote(obj)

        if (boolean){
            console.log("Vote thanh cong")
            res.status(200).json("Vote completed!")
        }
        else{
            console.log('Vote that bai');
            res.status(400).json("Failed to vote")
        }
        return
    }
    catch(err){
        console.log("Loi o controller: ", err)
        res.status(400).json("Error in controller: ", err)
    }
}

const unVote = async(req, res) => {
    try{
        const obj = req.body

        if (! await votesService.unVote(obj))
            return res.status(400).json("Error when unvoted")
        else
            return res.status(200).json("Unvoted Completed!")
    }
    catch(err){
        console.log("Loi o controller: ", err)
        res.status(400).json("Error in controller: ", err)
    }
}

const getVote = async(req, res) => {
    try{
        const id = req.params.id
        const output = await votesService.getVote(id)

        if (!output){
            res.status(400).json("Cannot get votes")
        }
        res.status(200).json(output)

        return
    }
    catch(err) {
        console.log("Loi o controller: ", err)
        res.status(400).json("Error in controller: ", err)
    }
}

const isLock = async(req, res) => {
    try{
        let obj = req.body

        await votesService.isLock(obj)
        res.status(200).json("Set " + obj.isLock + " for poll where pollId = " + obj.pollId)
    }
    catch(err) {
        console.log("Loi o controller: ", err)
        res.status(400).json("Error in controller: ", err)
    }
}

export default {createPoll, createOption, vote, getVote, deletePoll, unVote, isLock}