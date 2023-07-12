const express = require('express')
const router = express.Router()
const fs = require('fs')
const {db, genId} = require('../db/DbUtils')

router.get('/test', async(req, res) => {
   
})

module.exports = router