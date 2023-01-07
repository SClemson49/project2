const express = require('express')
const router = express.Router()
const db = require('../models')


router.post('/', async (req, res)=>{
    res.send(req.body)
    // findOrCreate name is in req.body
        const [users, created] = await users.findOrCreate({
            where: {name: req.query.pokemonName},

        })
        if (created){
            // console.log(req.query.pokemonName)
        }
    // findOrCreate the party from req.body

    // associate the pokemon with the party

    // redirect to users profile
})







module.exports = router