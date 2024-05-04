const express = require('express');
const router = express.Router();

const { resgisterUser, getLoggedInUserDetails, loginUser, logoutUser, resetPassword, forgotPassword, updateUser, getUsers, deleteUser, getBrandCount, getCustomerCount, getAllUsers } = require('../controllers/userController')
const { isAuthenticatedUser, verifyUser } = require('../middleware/auth')

router.route('/register').post(resgisterUser)

router.route('/login').post(loginUser)

router.route("/user/update").put(verifyUser, updateUser)

router.route('/user/me').get(isAuthenticatedUser, getLoggedInUserDetails)

router.route('/logout').post(isAuthenticatedUser, logoutUser)

router.route('/admin/users').get(getUsers).delete(deleteUser)

router.route('/brand/count').get(getBrandCount)

router.route('/customer/count').get(getCustomerCount)

router.route('/users').get(getAllUsers)

router.route("/password/reset/:token").put(resetPassword)

router.route('/forgot').post(forgotPassword)


module.exports = router