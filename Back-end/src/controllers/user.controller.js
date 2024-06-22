import userService from '../services/user.service.js'

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserByID = async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id)
        const user = await userService.getUserByID(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        let { username, email, password, fullname } = req.body;
        await userService.createUser({ username, email, password, fullname });
        res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let user = req.body;
        await userService.updateUser(id, user);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        await userService.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export default {getAllUsers, getUserByID, createUser, updateUser, deleteUser}