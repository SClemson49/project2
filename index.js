// require packages
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./models')
const cryptoJS = require('crypto-js')

const app = express()
const PORT = process.env.PORT || 8000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
// MIDDLEWARE

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.use('/users', require('./controllers/users'))




// app.use(cookieParser())
// app.use(express.urlencoded({extended: false}))

// // AUTHENTICATION MIDDLEWARE
// app.use(async (req, res, next)=>{
//     if(req.cookies.userId) {
//         const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
//         const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
//         const user = await db.user.findByPk(decryptedIdString)
//         res.locals.user = user
//     } else res.locals.user = null
//     next()
// })

// // CONTROLLERS
// app.use('/users', require('./controllers/users'))

// // ROUTES
// app.get('/', (req, res) => {
// 	res.render('home', { user: res.locals.user })
// })

// app.get('/', (req,res) => {
//     // console.log('hello')
//     res.send("PokéFans")
//     const baseUrl = 'https://pokeapi.co/api/v2/pokemon'
    
// })


// app.get('/pokemon', (req, res) => {
//     res.send('pokemon')
// })
// app.get('/parties_pokemon', (req, res) => {
//     res.send('parties_pokemon')
// })



// listeners AT BOTTOM
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})