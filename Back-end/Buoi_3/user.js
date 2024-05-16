import express from 'express'
import {v4 as uuidv4} from 'uuid' 

const routes = express.Router()

const users = [
    {
        name: 'AB',
        phone: '109132',
        id: '12312'
    },
    {
        name: 'err',
        phone: '1390123',
        id: '1221'
    },
    {
        name: 'err',
        phone: '1390123',
        id: '1211'
    }
]

//Tim nguoi dung dua tren id
routes.get('/:id', function(req, res){
    const {id} = req.params
    var foundUser = users.find((user) => user.id === id)

    res.send(foundUser)
})

// Xoa nguoi dung dua tren id
routes.delete('/:id', (req, res) =>{
    var {id} = req.params
    var index = users.findIndex((user) => user.id === id)

    var deleteUser = users.splice(index, 1)

    res.send(`${deleteUser.name} has been delete!`)
})

//Them nguoi dung vao database
routes.post('/', (req, res) =>{
    var user = req.body

    if (!user.name || !user.phone) {
        return res.status(400).send('Name and phone are required')
    }

    users.push({...user, id: uuidv4()})

    res.send(`${user.name} has been add to the database`)
})


//Get database
routes.get('/', function(req, res){
    res.send(users)
})

export default routes