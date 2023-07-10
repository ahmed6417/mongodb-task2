// middlewares

const { validationResult } = require('express-validator');
const productsModel = require('../models/products.model')

// exports.getHome = (req, res, next) => {
//     productsModel.getAllProducts().then(products => {
//         res.render('index', {
//             products: products
//         })
//     })

exports.getHome = (req, res, next) => {
    let category = req.query.category;
    if(category && category !== 'all'){
        productsModel.getProductsByCategory(category).then(products => {
            res.render('index', {
                products: products
            })
        })
    }else{
            productsModel.getAllProducts().then(products => {
                res.render('index', {
                    products: products,
                    isUser: req.session.userId,
                    validationError: req.flash('validationErrors')[0]
                });
            });
    }
}