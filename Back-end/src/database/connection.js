import mysql from 'mysql2';

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chibao1709@',
    database: 'S_usermnmt'
})

//Tim loi ket noi
conn.connect( (err) =>{
    if (err)
        throw err;
    console.log("Connected to the database!")
})

export default conn