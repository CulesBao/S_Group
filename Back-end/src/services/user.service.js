import database from '../database/connection.js '

const getAllUsers = async() => {
    try {
        let [users] = await database.query(`SELECT * FROM users`)
        if (users.length != 0) {
            return users
        } else {
            console.log("empty")
            return []
        }
    } catch (err) {
        console.log(err);
        return false
    }
}


const getUserByID = async(id) => {
    try{
        let [user] = await database.query(`SELECT * FROM users WHERE id = ?`, [id])
        if (user.length > 0) {
            return user[0];
        } else {
            return null; 
        }
    }
    catch(err){
        console.log(err)
        return
    }
}

const createUser = async(user) => {
    try{
        let [user] = await database.query(`SELECT * FROM users WHERE username = ? AND email = ?`, [user.username, user.email])
        if (user.length > 0){
            console.log("User already exists")
            res.status(400).send("User already exists")
        }
        database.query(`INSERT INTO users (id, username, email, password, fullname) VALUES (?, ?, ?, ?, ?)`, [user.id, user.username, user.email, user.password, user.fullname])
        return
    }
    catch(err){
        console.log(err)
        return
    }
}

const updateUser = async(id, user) => {
    try{
        let findUser = await getUserByID(id)
        if (findUser.length == 0){
            console.log(`Cannot found user with id ${id}`)
            return
        }
        database.query(`UPDATE users SET username = ?, email = ?, password = ?, fullname = ? WHERE id = ?`, [user.username, user.email, user.password, user.fullname, id])
    }
    catch(err){
        console.log(err)
    }
}

const deleteUser = async(id) => {
    try{
        let findUser = await getUserByID(id)
        if (findUser.length == 0){
            console.log(`Cannot found user with id ${id}`)
            return
        }
        database.query(`DELETE FROM users WHERE id = ?`, [id]) 
    }
    catch(err){
        console.log(err)
        return
    }
}

export default{getAllUsers, getUserByID, createUser, updateUser, deleteUser}