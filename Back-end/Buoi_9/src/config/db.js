import express from "express";
import mysql from "mysql2"

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Chibao1709@",
    database: "SGr"
}).promise();

con.connect((err) => {
    if (err)    throw err;
    console.log("Thanh ocng")
})

// con.query("SELECT * FROM users", (err, res) => {
//     if (err)
//         throw err;
//     console.log(res);
// })
/*
const newUser = {name: "Linhasdasd Ng", username: "meligdgcom1", password : "1234asdasd5678"};
con.query(`INSERT INTO users(name,username,password) VALUES('${newUser.name}','${newUser.username}','${newUser.password}')  ` , (err) => {
	if (err) 
        console.log(err);
	console.log("Ok3 !");
})
    */
export default con;