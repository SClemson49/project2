const { default: axios } =require('axios')
const express = require('express')
const router = express.Router()
const db = require('../models')


router.get('/', async (req, res) =>{
    try {
        // to do : get pokemon in parties and render to views
    }
})

// router.post

// get api

router.get('/:name', async (req, res) => {
    try {
      res.send(req.params.name)
      const apiUrl = `http://pokeapi.co/api/v2/pokemon/`
      const foundData = await axios.get(apiUrl)
      // render shows?
    }catch (err){
      console.error(err)
    }
  })



module.exports = router