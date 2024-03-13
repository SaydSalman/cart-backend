const { Error } = require('mongoose')
const cartItems = require('../Models/cartModel')

// add to cart

exports.addToCartController = async(req,res)=>{
    const {id,title,image,price,quantity} = req.body
    const userId = req.payload

    try {
        const existingProduct = await cartItems.findOne({id,userId})
        if(existingProduct){
            existingProduct.quantity+=1
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
            await existingProduct.save()
            res.status(200).json("items added successfully to your cart")
        }else{
            const newProduct = new cartItems({
                id,title,price,quantity,totalPrice:price,image,userId
            })
            await newProduct.save()
            res.status(200).json("item added successfully to your cart")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get cart

exports.getCartController = async(req,res)=>{
    const userId = req.payload
    try {
        const allProducts = await cartItems.find({userId})
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(401).json(Error)
    }
}
//  remove cart item

exports.removeCartItemController = async(req,res)=>{
    const {id} = req.params
    try {
        const removeProduct = await cartItems.findByIdAndDelete({_id:id})
        res.status(200).json(removeProduct)
    } catch (error) {
        res.status(401).json(error)
    }
}
// increment quantity

exports.incrementItemController = async(req,res)=>{
    const {id} = req.params
    try {
        const selectedProduct = await cartItems.findOne({_id:id})
        selectedProduct.quantity+=1
        selectedProduct.totalPrice = selectedProduct.price * selectedProduct.quantity;
        await selectedProduct.save()
        res.status(200).json(selectedProduct)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.decrementItemController = async(req,res)=>{
    const {id} = req.params
    try {
        const selectedProduct = await cartItems.findOne({_id:id})
        selectedProduct.quantity-=1
        if(selectedProduct.quantity == 0){
            await cartItems.deleteOne({_id:id})
            res.status(200).json("Quantity Updated")
        }else{
            selectedProduct.totalPrice = selectedProduct.price * selectedProduct.quantity;
        await selectedProduct.save()
        res.status(200).json(selectedProduct)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
}
//empty cart

exports.emptyCartController = async(req,res)=>{
    const userId = req.payload
    try {
        const result = await cartItems.deleteMany({userId})
        res.status(200).json("deleted successfully")
    } catch (error) {
        res.status(401).json(error)
    }
}