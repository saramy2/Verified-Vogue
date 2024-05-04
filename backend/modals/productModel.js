const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    productId: {
        type: String,
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
    },
 
    cost: {
        type: String,
    },
    coustmer: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    branch: {
        type: String,
    },
    MDate: {
        type: Date,
    },
    SDate: {
        type: Date,
    },
    wallet: {
        type: String,
    },
    contractLink: {
        type: String,
    },
    passport: {
        type: Number,
    },
    idNumber: {
        type: Number,
    },
    private: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },


})


module.exports = mongoose.model('Product', productSchema)