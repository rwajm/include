const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.host,
    port: '3306',
    user: process.env.user,
    password: process.env.password,
    database: 'include',
})

module.exports = db;