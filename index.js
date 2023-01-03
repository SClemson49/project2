// require modules
const express = require('express')
const PORT = 8000
// remember to invoke!
const app = express()

// routes
app.get('/', (req,res) => {
    // console.log('hello')
    res.send("PokéFans")
})

app.get('/pokemon', (req, res) => {
    res.send('pokemon')
})



// listeners AT BOTTOM
app.listen(PORT, (req,res) => {
    // console.log(`listening on : ${PORT}`)
})