const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check

const authGuard = require("./guards/auth.guard")
const cartController = require("../controllers/cart.controller");

router.get('/', authGuard.isAuth, cartController.getCart)

router.post(
    '/', 
    authGuard.isAuth, 
    bodyParser.urlencoded({extended: true}), 
    check('amount')
    .not()
    .isEmpty()
    .withMessage('amount reqiured')
    .isInt({min: 1})
    .withMessage('amount must be greater than 0'),
    cartController.postCart
    );

router.post(
    '/save', 
    authGuard.isAuth, 
    bodyParser.urlencoded({extended: true}), 
    check('amount')
    .not()
    .isEmpty()
    .withMessage('amount reqiured')
    .isInt({min: 1})
    .withMessage('amount must be greater than 0'),
    cartController.postSave
);


router.post(
    '/delete', 
    authGuard.isAuth, 
    bodyParser.urlencoded({extended: true}), 
    cartController.postDelete
);

module.exports = router;