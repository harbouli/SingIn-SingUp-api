const express = require('express')
const router = express.Router()
const {singup, singin , singout , requireSingin} = require('../controllers/authCntroller')
// Validator
const {runValidition} = require('../validators')
const {userSingupValidator} = require('../validators/authValidator')
const {userSinginValidator} = require('../validators/authValidator')




router.get('/singup' ,  userSingupValidator, runValidition, singup)
router.get('/singin' ,  userSinginValidator, runValidition, singin)
router.get('/singout' , singout)
module.exports = router