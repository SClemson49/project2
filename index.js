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

app.use('/users', require('./controllers/users'))

// listen on a port
app.listen(PORT, () => {
    console.log(`authenticating users on PORT ${PORT}`)
})


app.get((req, res)=> {
    let pokeName = 'http://pokeapi.co/api/v2/pokemon/'
    axios.get(pokeName).then(apiResponse => {
        let pokemonName = apiResponse.data.results
        console.log(pokeName)
    })
})