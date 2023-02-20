const User=require('../models/user')
const BigPromise=require('../middlewares/bigPromise')
const CustomError=require('../utils/customError')
const jwt=require('jsonwebtoken')


exports.isLoggedIn=BigPromise(async (req,res,next)=>{

    const token= req.cookies.token  ||req.header('Authorization').replace('Bearer ','') 
    
    if(!token){
        return res.status(403).send("Token is Missing")
    }

    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode)             // here we get all the payload information in the form of json

        req.user=User.findById(decode.ID)               // INJECTING MY PROPERT AS REQ.COOKIE AND MANY OTHER`
        
        //bring in info from db


    } catch (error) {
        return res.status(401).send("Invalid Token")
    }

    return next();
})