const products = require('../Models/productModel')

// getallproducts

exports.getAllProductController = async(req,res)=>{
    try{
     const result =  await products.find()
     res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}
// getaproduct Controller


exports.getAProductController = async(req,res)=>{
    const {id} = req.params
    try {
        const result = await products.findOne({id})
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error)
    }
}