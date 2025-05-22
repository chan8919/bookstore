const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();


// const connection = async () => {
//     const conn = await mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         password: process.env.DB_PWD,
//         database: process.env.DB_DATABASE,
//         dateStrings: true
//     });
//     return conn;
// }

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
    dateStrings: true
});

module.exports = pool;