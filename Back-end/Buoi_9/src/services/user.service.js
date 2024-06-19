import conn from "../config/db.js";

const getAllUsers = async () => {
    var result = await conn.query("SELECT * FROM users");
    return result[0];   
}

const login = async (username, password) => {
    var result = await conn.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`);
    return result[0];
}

export default {login, getAllUsers};