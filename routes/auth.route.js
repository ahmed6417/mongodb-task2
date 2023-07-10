const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check
const authGuard = require('./guards/auth.guard')
const authController = require("../controllers/auth.controller")

router.get("/signup", authGuard.notAuth, authController.getSignup);

router.post(
    "/signup", authGuard.notAuth,
    bodyParser.urlencoded({ extended: true}),

    check('username').not().isEmpty().withMessage('UserName is required'),
    check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Invalid Format'),
    check('password').isLength({min: 6}).withMessage('Passwod must be > 6 char'),
    check('confirmpassword').custom((value, {req})=>{
        if(value===req.body.password) return true
        else throw 'password not equal'
    }),
    authController.postSignup
);

router.post(
    "/login", authGuard.notAuth,
    bodyParser.urlencoded({ extended: true}),
    authController.postLogin
);



router.get(
    "/login", authGuard.notAuth, 
    authController.getLogin
);


router.all('/logout', authGuard.isAuth, authController.logout)

module.exports = router