const asyncErrors = require('../middleware/asyncErrors');
const productModel = require('../modals/productModel');
const User = require('../modals/userModel')
const ErrorHander = require('../utils/ErrorHander')
const sendToken = require('../utils/JwtToken');


//Creating a User
exports.resgisterUser = asyncErrors(async (req, res, next) => {

    const { email, role } = req.body;

    const userExists = await User.findOne({ email, role })
    if (userExists) {
        return next(new ErrorHander('User already exists with this email!', 400))
    }

    let brandId = ''

    if (role === 'brand') {
        const count = await User.countDocuments({ role: 'brand' })
        brandId = count + 1
    }

    const user = await User.create({
        ...req.body,
        brandId
    })

    sendToken(user, 200, res)

})


//Login a user
exports.loginUser = asyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;

    let user

    //Checking if user has given email and pass both 
    if (!email || !password) {
        return next(new ErrorHander('Please enter email and password', 400))
    }

    user = await User.findOne({ email, role }).select("+password")
    if (!user) {
        return next(new ErrorHander('Invalid email or password', 401))
    }

    const isPasswordMatched = password === user.password;

    if (!isPasswordMatched) {
        return next(new ErrorHander('Invalid email or password', 401))
    }

    sendToken(user, 200, res)

})


//Get user details

exports.getLoggedInUserDetails = asyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id)

    res.status(200).json({
        user
    })
})

exports.getAllUsers = asyncErrors(async (req, res, next) => {

    const user = await User.find()

    res.status(200).json({
        user
    })
})


exports.getBrandCount = asyncErrors(async (req, res, next) => {

    const brandCount = await User.countDocuments({ role: 'brand' })

    res.status(200).json({
        brandCount
    })
})

exports.getCustomerCount = asyncErrors(async (req, res, next) => {

    const customerCount = await User.countDocuments({ role: 'customer' })

    res.status(200).json({
        customerCount
    })
})


//Logout User
exports.logoutUser = asyncErrors(async (req, res, next) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})


//Update User
exports.updateUser = asyncErrors(async (req, res, next) => {

    const { email, role } = req.body

    const userExists = await User.findOne({ email, role })
    if (userExists && userExists._id.toString() !== req.user.id) {
        return next(new ErrorHander('User already exists with this email!', 400))
    }

    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });

    res.status(200).json({
        success: true,
        user
    })
})

exports.getUsers = asyncErrors(async (req, res, next) => {

    const user = await User.find()

    res.status(200).json({
        user
    })
})

exports.deleteUser = asyncErrors(async (req, res, next) => {

    await User.findByIdAndDelete(req.body.userId)
    await productModel.deleteMany({ brandId: req.body.userId })

    res.status(200).json({
        success: true,
    })
})


//Forgot password
exports.forgotPassword = asyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email, role: req.body.role })
    if (!user) {
        return next(new ErrorHander('User not found with email', 404))
    }

    //Get Reset Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `http://127.0.0.1:5173/password/reset/${resetToken}`

    const message = `Hello!\n\nYour reset password link is ${resetPasswordUrl} it will expire in 10 minutes. `

    try {

        await sendEmail({
            email: user.email,
            subject: 'Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent successfully to ${user.email} `
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        next(new ErrorHander(error.message, 500))
    }

})

//Reset Password
exports.resetPassword = asyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256')
        .update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHander('Reset password token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander('Password does not match', 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        message: 'Password has been changed'
    })

})








