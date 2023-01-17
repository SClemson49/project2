const { default: axios } =require('axios')
const express = require('express')
const router = express.Router()
const db = require('../models')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))



// router.post

// get api


router.get('/', (req, res) =>{
  res.render('pokemon.ejs', {
  })
})

router.get('/:name', async (req, res) => {
    try {
      res.send(req.params.name)
      const apiUrl = `http://pokeapi.co/api/v2/pokemon/`
      const foundData = await axios.get(apiUrl)
      }catch (err){
      console.error(err)
    }
  })

router.post('/', (req, res) =>{
  res.send(req.body)
})

router.put('/', async (req, res)=>{
  // find party
  const party = await db.party.update({name: req.body.name} ,{
    where: {name: req.body.party, userId: res.locals.user.id},        
  })
    res.redirect('/users/profile')
})

// router.delete
router.delete('/', async (req, res)=>{
  // find pokemon
  const pokemon = await db.pokemon.findOne({
      where: {name: req.body.name},               
  })

// find party
  const party = await db.party.findOne({
    where: {name: req.body.party, userId: res.locals.user.id},        
  })

    // party.removePokemon
      await party.removePokemon(pokemon)
        res.redirect('/users/profile')
})




module.exports = router


