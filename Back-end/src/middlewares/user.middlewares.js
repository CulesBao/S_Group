import userService from "../services/user.service";

const getAllUsers = async (req, res, next) => {
    try{
        let users = await userService.getAllUsers();
        if (users.length != 0) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "No user found" });
        }
    }
    catch(err){
        res.status(500).json({message: "Internal Server Error"})
    }
}

const getUserByID = async (req, res, next) => {
    try{
        let id = req.params.id
        if (id) {
            const user = await userService.getUserByID(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } else {
            res.status(400).json({ message: "Invalid ID" });
        }
    } catch(err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const createUser = async (req, res, next) => {
    try{
        const user = req.body;
        if (user) {
            await userService.createUser(user);
            res.status(201).json({ message: "User created" });
        } else {
            res.status(400).json({ message: "Invalid user" });
        }
    } catch(err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateUser = async (req, res, next) => {
    try{
        let id = req.params.id
        const user = req.body;
        if (id && user) {
            await userService.updateUser(id, user);
            res.status(200).json({ message: "User updated" });
        } else {
            res.status(400).json({ message: "Invalid user" });
        }
    } catch(err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteUser = async (req, res, next) => {
    try{
        let id = req.params.id
        if (id) {
            await userService.deleteUser(id);
            res.status(200).json({ message: "User deleted" });
        } else {
            res.status(400).json({ message: "Invalid ID" });
        }
    } catch(err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default { getAllUsers, getUserByID, createUser, updateUser, deleteUser }