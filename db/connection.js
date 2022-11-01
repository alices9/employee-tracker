const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "sqlpassword",
        database: "music_api_db"
    }
)

module.exports = db;