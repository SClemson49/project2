// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')

// GET /users/new 
router.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        user: res.locals.user
    })
})

// POST /users 
router.post('/', async (req, res) => {
    try {
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            }
        }) 
        // if found, redirect user to login
        if (!created) {
            console.log('user exists!')
            res.redirect('/users/login?message=Please log in to continue.')
        } else {
            const hashedPassword = bcrypt.hashSync(req.body.password, 12)
            newUser.password = hashedPassword
            await newUser.save()
            const encryptedId = crypto.AES.encrypt(String(newUser.id), process.env.SECRET)
            const encryptedIdString = encryptedId.toString()
            res.cookie('userId', encryptedIdString)
            res.redirect('/users/profile')
        }

    } catch (err) {
        console.log(err)
        res.status(500).send('server error?????')
    }
})

// PUT change password
// const hashedPassword = bcrypt.hashSync(req.body.password, 12)

router.put('./', async (req, res) => {
    hashedPassword = bcrypt.hashSync(req.body.password, 12)

    }
)

    

// GET /users/login 
router.get('/login', (req, res) => {
    res.render('users/login.ejs', {
        message: req.query.message ? req.query.message : null,
        user: res.locals.user
    })
})

// POST /users/login 
router.post('/login', async (req, res) => {
    try {
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
         const badCredentialMessage = 'username or password incorrect'
        if (!user) {
            res.redirect('/users/login?message=' + badCredentialMessage)
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
               res.redirect('/users/login?message=' + badCredentialMessage)
        } else {
                 console.log('logeed in')
            const encryptedId = crypto.AES.encrypt(String(user.id), process.env.SECRET)
            const encryptedIdString = encryptedId.toString()
            res.cookie('userId', encryptedIdString)
            res.redirect('/users/profile')
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('server error!!!!!')
    }
})

// GET /users/logout 
router.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
})

router.get('/profile', async (req, res) => {
    if (!res.locals.user) {
        res.redirect('/users/login?message=You must log in!')
    } else {
        const parties = await res.locals.user.getParties({
            include: [db.pokemon]
        })
        console.log(parties)
        res.render('users/profile.ejs', {
            user: res.locals.user, parties: parties
        })
    }
})

// export the router
module.exports = router