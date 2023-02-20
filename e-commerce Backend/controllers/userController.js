const User=require('../models/user')
const BigPromise=require('../middlewares/bigPromise')
const CustomError=require('../utils/customError')
const cookieToken = require('../utils/cookieToken')
const fileupload=require('express-fileupload')
const cloudinary=require('cloudinary')

exports.signup=BigPromise(async(req,res,next)=>{

    let result;
    console.log(req.body.email)
    if(req.files){
        let file=req.files.photo
        console.log("fbhbfhbb")
        console.log(file)
        result=await cloudinary.uploader.upload(file.tempFilePath,{
            folder:"user1"
        })

        console.log(result)
    }

    
    const {name,email,password}=req.body

    if(!email || !name || !password){
        // return next(new CustomError('Plz Send Email',400))
        return next(new Error("Name ,email and password are required"))
    }

    const user=await User.create({
        name,
        email,
        password,
        photo:{
            id:result.public_id,
            secure_url:result.secure_url
        }
    })

    //method to generte a cookie with the token generated with the expiry date ...........................

    cookieToken(user,res)
    
})