const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, verifyUser } = require('../middleware/auth');
const { CreateProduct, getProductsOfBrand, updateProduct, getProductsOfCustomer, sellProduct, getProducts, getProductById, deleteProduct } = require('../controllers/productController');

router.route('/product/create').post(isAuthenticatedUser, CreateProduct)

router.route('/product/brand').get(isAuthenticatedUser, getProductsOfBrand)
router.route('/product/customer').get(isAuthenticatedUser, getProductsOfCustomer)
router.route('/products').get(getProducts)

router.route('/product/update').put(updateProduct)

router.route('/product/sell').put(isAuthenticatedUser, sellProduct)

router.route('/product/detail/:id').get(getProductById)

router.route('/admin/products').get(getProducts).delete(deleteProduct)


module.exports = router