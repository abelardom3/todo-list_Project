//set up dependencies
const express = require('express')
const app = express()
const port = 8000;

const db = require('./dataBase/conn.js')





app.use(express.static('public'))



app.use(express.json())











//GET ALL 

app.get('/api/mylist', async (req, res) => {

    try {
        const { rows } = await db.query('SELECT * FROM mylist;')
        res.send(rows)
    } catch (error) {
        res.send(error.message
        )
    }
})








//GET ONE

app.get('/api/mylist/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { rows } = await db.query('SELECT * FROM mylist WHERE category_id = $1;', [id])
        res.send(rows)
    } catch (error) {
        res.send(error.message
        )
    }
})










// CREATE ONE

app.post('/api/mylist/post', async (req, res) => {
    const { name } = req.body;
    try {
        const { rows } = await db.query('INSERT INTO mylist(name) VALUES($1)RETURNING *;', [name])
        res.send(rows)
    } catch (error) {
        res.send(error.message
        )
    }
})





//EDIT ONE

app.patch('/api/mylist/:id/edit', async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    try {
        const { rows } = await db.query('UPDATE mylist SET name = $1 WHERE category_id = $2 RETURNING *;', [name, id])
        res.send(rows)

    } catch (error) {
        res.send(error.message
        )
    }
})






//DELETE ONE

app.delete('/api/mylist/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await db.query('DELETE FROM mylist WHERE category_id = $1 RETURNING *;', [id])
        await db.query('DELETE FROM todo_list WHERE category_id = $1;', [id])
        res.send(rows)
    } catch (error) {
        res.send(error.message
        )
    }
})





app.listen(port, () => {
    console.log('Listening on port 8000')
})





