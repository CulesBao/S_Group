import express from 'express'
import {v4 as uuidv4} from 'uuid' 
import users from './users.json' assert { type: "json" };
const routes = express.Router()

//Cap nhat nguoi dung
routes.put('/:id', (req, res) =>{
    const idGet = req.params.id
    const {name, phone, id} = req.body
    
    const index = users.findIndex((user) => user.id == idGet)

    if (index == -1)
        res.send(index)
    else{
        if (name)
            users[index].name = name;
        if (phone)
            users[index].phone = phone
        if (id)
            users[index].id = id

        res.send(`${users[index].name} has been update`)
    }
})

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

    var deleteUser = users[index]
    users.splice(index, 1)

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