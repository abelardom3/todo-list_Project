const { Pool } = require('pg')

const pool = new Pool({
    user: "abela",
    password: "812315",
    host: "localhost",
    port: 5432,
    database: "todo_list_app"

})

module.exports = pool;
