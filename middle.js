const express=require("express")
const app=express()
const {json}=require('express')
app.use(function(req,res,next){
    console.log(123)
    next()
})

app.get('/m',(req,res)=>{
    console.log(1234)
    res.end()
})

app.listen(3001,()=>{
    console.log("running at 3000")
})