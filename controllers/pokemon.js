const { default: axios } =require('axios')
const express = require('express')
const router = express.Router()
const db = require('../models')



// router.post

// get api

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


module.exports = router


