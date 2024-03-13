const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(" ")[1]//here we will get the token in the first index
        if(token){
            // verify
            const jwtResponse = jwt.verify(token,process.env.JWT_SECRET)
            req.payload = jwtResponse.userId
            next()
        }else{
            res.status(406).json('Token is not available')
        }
    } catch (error) {
        res.status(401).json("Authorization failed !!!..please login...")
    }
}

module.exports = jwtMiddleware