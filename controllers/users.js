// express routers
const express = require('express')
const db = require('../models')
const router = express.Router()

// mount routes on router

// get /users/new 
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

// post /users


// export router
module.exports = router