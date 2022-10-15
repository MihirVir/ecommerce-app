//importing libraries and code
const router = require('express').Router();
const { createProduct } = require('../controllers/product_controller');
const { verifyTokenAndAdmin } = require('./verifyToken');

//creating route
router.post('/', verifyTokenAndAdmin, createProduct);


//exporting routes
module.exports = router;