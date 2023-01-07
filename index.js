// required packages
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const db = require('./models')
const crypto = require('crypto-js')

// app config
const app = express()
const PORT = process.env.PORT || 8000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(async (req, res, next) => {
    try {
        if (req.cookies.userId) {
            const decryptedId = crypto.AES.decrypt(req.cookies.userId, process.env.SECRET)
            const decryptedString = decryptedId.toString(crypto.enc.Utf8)
            const user = await db.user.findByPk(decryptedString)
            res.locals.user = user
        } else {
            res.locals.user = null
        }
        next()
    } catch (err) {
        console.log('🔥🔥🔥🔥', err)
        res.locals.user = null
        next() 
    }
})


app.use((req, res, next) => {
    console.log(`incoming request: ${req.method} - ${req.url}`)
    next()
})

// routes and controllers
app.get('/', (req, res) => {
    console.log(res.locals.user)
    res.render('home.ejs', {
        user: res.locals.user
    })
})
app.get('/pokemon', (req, res) =>{
    res.render('pokemon.ejs', {
    })
})

app.use('/users', require('./controllers/users'))
app.use('/parties', require('./controllers/parties'))
app.use('/pokemon', require('./controllers/pokemon'))




app.get('/search', (req, res)=> {
    console.log(req.query)
    let pokeName = `http://pokeapi.co/api/v2/pokemon/${req.query.pokemonName}`
    axios.get(pokeName).then(apiResponse => {
        let pokemonName = apiResponse.data.results
        console.log(apiResponse.data)
        // res.json(apiResponse.data)
        // get the currently logged in users parties and pass them to template to render
        res.render('pokemon', {pokemon: apiResponse.data })
        // user: res.locals.user add to render?

    })
})









// listen on a port
app.listen(PORT, () => {
    console.log(`authenticating users on PORT: ${PORT}`)
})