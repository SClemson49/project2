const express = require('express')
const router = express.Router()
const db = require('../models')


router.post('/', async (req, res)=>{
    // res.send(req.body)
    // findOrCreate name is in req.body
        const [pokemon] = await db.pokemon.findOrCreate({
            where: {name: req.body.name},               
        })
                // console.log(pokemon)
        const [party] = await db.party.findOrCreate({
            where: {name: req.body.party, userId: res.locals.user.id},        
        })
    // findOrCreate the party from req.body

    // associate the pokemon with the party
    await party.addPokemon(pokemon)
    
    // redirect to users profile
    res.redirect('/users/profile')
}) 







    








module.exports = router