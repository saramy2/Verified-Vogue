const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({


    name: {
        type: String,
    },
    password: {
        type: String,
    },
    brandType: {
        type: String,
    },
    walletUrl: {
        type: String,
    },
    email: {
        type: String,
    },
    passport: {
        type: String,
    },
    idNumber: {
        type: Number,
    },
    role: {
        type: String,
    },
    brandName: {
        type: String,
    },
    brandId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

})

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     this.password = await bcrypt.hash(this.password, 10)
// })

//JWT Token
userSchema.methods.getJwtToken = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetPasswordToken = function () {

    //Generating token
    const resetToken = crypto.randomBytes(20).toString('hex')

    //Hashing and saving resetToken in userSchema

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
}


module.exports = mongoose.model('User', userSchema)