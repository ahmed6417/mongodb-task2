// routes

const router = require('express').Router()
const authGuard = require('./guards/auth.guard')
const homeController = require('../controllers/home.controller')



router.get('/', homeController.getHome)
module.exports = router


// authGuard.isAuth,