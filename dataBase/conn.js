const { Pool } = require('pg')

// const pool = new Pool({
//     user: "abela",
//     password: "812315",
//     host: "localhost",
//     port: 5432,
//     database: "todo_list_app"

// })



const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});







module.exports = pool;
