const express=require('express')
const app=express()
require('dotenv').config()
const morgan = require('morgan')
const cookieParser=require('cookie-parser')
const fileUpload=require('express-fileupload')

//Swagger Documentation
const swaggerUi=require("swagger-ui-express")
const YAML=require("yamljs")
const swaggerDocument=YAML.load("./swagger.yaml");
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument))


//reguglar miidelware
app.use(express.json())                             // To handle the json
app.use(express.urlencoded({extended:true}))        //to handle something comming in the body

//cookies and file Middleware
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));
//for ejs file
app.set('view engine','ejs')

//this is simply a morgan middleware
app.use(morgan('tiny'))

//import all routes her

const home =require('./routes/home')
const user=require('./routes/user')

//router middleware
app.use("/api/v1",home)
app.use("/api/v1",user)

//test route
app.get('/test',(req,res)=>{
    res.render('signuptest')
})


//export app.js
module.exports=app;