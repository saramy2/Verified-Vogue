const JWT = require('jsonwebtoken')
const ErrorHander = require('../utils/ErrorHander')
const asyncErrors = require('../middleware/asyncErrors')
const User = require('../modals/userModel');

exports.isAuthenticatedUser = asyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHander('Please login to access this resource', 401))
    }
    const decodedData = JWT.verify(token, process.env.JWT_SECRET)

    if (!decodedData) {
        return next(new ErrorHander('Token is not valid', 403))
    }

    req.user = await User.findById(decodedData.id)
    next();

})


exports.verifyUser = (req, res, next) => {
    this.isAuthenticatedUser(req, res, next, () => {
        if (req.user.id === req.params.id) {
            next()
        } else {
            return next(new ErrorHander('You are not authorized', 403))
        }
    })
}
