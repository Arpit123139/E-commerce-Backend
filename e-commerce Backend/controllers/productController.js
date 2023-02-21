const BigPromise=require('../middlewares/bigPromise')
const Product=require('../models/product')
const CustomError=require('../utils/customError')
const cookieToken = require('../utils/cookieToken')
const fileupload=require('express-fileupload')
const cloudinary=require('cloudinary')
const mailHelper = require('../utils/emailService')
const crypto=require('crypto')

exports.addProduct=BigPromise(async (req,res,next)=>{
    // const db=await something

    //images
    let imageArray=[]

    if(!req.files){

        return next(new CustomError('Images are required',401))
    }

    if(req.files){

        for(let imdex=0;index<req.files.photos.length;index++){
            const result=await cloudinary.v2.uploader.upload(req.files.photos[index].tempFilePath,{

                folder:"Products"
            })

            imageArray.push({
                id: result.public_id,
                secure_url:result.secure_url
            })
        }
    }

    req.body.photos=imageArray           // we are rewriting it whatever you are sending in the boody as photos 

    req.body.user=req.user.id        // As the user is already logged in to add a product

    const product=await Product.create(req.body)
     res.status(200).json({
         success:true,
         product
     })
 })
 