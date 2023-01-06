const express = require('express')
const router = express.Router()
const db = require('../models')


router.post('/', (req, res)=>{
    res.send(req.body)
    // findOrCreate name is in req.body

    // findOrCreate the party from req.body

    // associate the pokemon with the party

    // redirect to users profile
})







module.exports = router