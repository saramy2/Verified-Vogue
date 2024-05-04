const asyncErrors = require('../middleware/asyncErrors')
const ProductModel = require('../modals/productModel')
const UserModel = require('../modals/userModel')


exports.CreateProduct = asyncErrors(async (req, res, next) => {

    const brand = await UserModel.findById(req.user.id)

    await ProductModel.create({
        ...req.body,
        brandId: brand._id,
    })

    res.status(200).json({
        success: true,
        message: 'Product Created Successfully'
    })

})

exports.getProductsOfBrand = asyncErrors(async (req, res, next) => {

    const brand = await UserModel.findById(req.user.id)
    const products = await ProductModel.find({ brandId: brand._id })

    res.status(200).json({
        success: true,
        products
    })

})

exports.getProducts = asyncErrors(async (req, res, next) => {

    const products = await ProductModel.find()

    res.status(200).json({
        success: true,
        products
    })

})

exports.getProductById = asyncErrors(async (req, res, next) => {

    const product = await ProductModel.findById(req.params.id).populate('brandId')

    const userPassword = await UserModel.findOne({ email: product.coustmer })

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    res.status(200).json({
        success: true,
        product: {
            ...product._doc,
            userPassword: userPassword.password || ''
        },
    })

})

exports.updateProduct = asyncErrors(async (req, res, next) => {

    const product = await ProductModel.findById(req.body.productId)

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    await ProductModel.findByIdAndUpdate(req.body.productId, {
        ...req.body,
        productId: product.productId,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: 'Product Updated Successfully'
    })

})
exports.deleteProduct = asyncErrors(async (req, res, next) => {

    await ProductModel.findByIdAndDelete(req.body.productId)

    res.status(200).json({
        success: true,
        message: 'Product Deleted Successfully'
    })

})

exports.getProductsOfCustomer = asyncErrors(async (req, res, next) => {

    const customer = await UserModel.findById(req.user.id)
    const products = await ProductModel.find({ coustmer: customer.email }).populate('brandId').sort({ createdAt: -1 })

    res.status(200).json({
        success: true,
        products
    })

})

exports.getProducts = asyncErrors(async (req, res, next) => {

    const { search } = req.query;

    // Define a regular expression pattern for case-insensitive search
    const searchPattern = new RegExp(search, 'i');

    // Perform the search query on the "name" field
    const products = await ProductModel.find({
        private: false,
        name: { $regex: searchPattern },
    });

    res.status(200).json({
        success: true,
        products,
    });


})

exports.sellProduct = asyncErrors(async (req, res, next) => {


    const user = await UserModel.findById(req.user.id);
    const product = await ProductModel.findOne({ productId: req.body.productId, coustmer: user.email });

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found with this id'
        });
    }


    const updateFields = {
        wallet: req.body.wallet,
        idNumber: req.body.idNumber,
        passport: req.body.passport,
        coustmer: req.body.email,
        contractLink: req.body.contractLink,
        private: false
    };

    try {
        let x = await ProductModel.findByIdAndUpdate(product._id.toString(), { $set: updateFields }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        console.log('Updated Product:', x);

        return res.status(200).json({
            success: true,
            message: 'Product Updated Successfully'
        });

    } catch (error) {
        console.error('Update failed:', error.message);
        return res.status(400).json({
            success: false,
            message: 'Update failed: ' + error.message
        });
    }
});
