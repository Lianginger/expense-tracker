const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('statistic')
})

module.exports = router