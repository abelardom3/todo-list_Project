//set up dependencies
const express = require('express')
const app = express()
const port = 8000;



app.use(express.static('public'))



app.use(express.json())



app.get('/api', (req, res) => {
    res.send('Working with get')
})





app.get('/api/:id', (req, res) => {
    const { id } = req.params;
    res.send(`working with get ${id}`)
})



app.post('/api/post', (req, res) => {
    const { name } = req.body;
    res.send(`testing post ${name}`)
})



app.patch('/api/edit/:id', (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    res.send(`testing patch ${name} and ${id}`)
})



app.delete('/api/delete/:id', (req, res) => {
    const { id } = req.params;
    res.send(`testing delete ${id}`)

})














app.listen(port, () => {
    console.log('Listening on port 8000')
})






