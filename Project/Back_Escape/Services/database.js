require('dotenv').config();
const mysql = require("mysql");
const login = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
})

login.connect((err) => {
    if (err) {
        console.log(err.stack)
        return
    }
    console.log(login.threadId)
})

module.exports = login