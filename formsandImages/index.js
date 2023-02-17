const express=require('express')
const fileupload=require('express-fileupload')
const app=express();


app.set('view engine','ejs')
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))       // if we sending the data from the postman in a form of url encoded this middleware is use excepting data in the form of url encoded
app.get('/myget',(req,res)=>{

    console.log(req.body)                    // express always handle form such that all of our form comes into the body itself
    res.send(req.query)                      //There is a whole lot of issue in this when we are using the postman,react angular the form data is always present in the body even if we send it as a url in the form of query but when we are using ejs it is comming in req.query
})
app.post('/mypost',(req,res)=>{

    console.log(req.body)                   // Now as here we are using th epost form so the data always comes in body irrespective of the fact that it is url-encoded 
    console.log(req.files)
    res.send(req.body)                      
})

app.get('/mygetform',(req,res)=>{
    res.render("getform")
})

app.get('/mypostform',(req,res)=>{
    res.render("postform")
})
app.listen(4000,()=>{
    console.log("Server is running on port 4000")
})