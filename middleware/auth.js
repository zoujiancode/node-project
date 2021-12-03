
const jwt=require("../utils/token")
console.log(jwt.verify)
const tokenStr=require('../config/config.default')
const {list}=require('../model/index')
module.exports=async (req,res,next)=>{
    var token=req.headers['acctoken']
    token=token?token:null
    console.log(token)
    if(!token){
        return res.status(401).end()
    }
    try{
        // 验证token
        console.log(tokenStr.tokenStr)
        const decodeToken=await jwt.verify(token,tokenStr.tokenStr)
        
        const data=await list.findById(decodeToken.userId)
        console.log(data)
        req.list=data
        next()
    }catch(err){
        return res.status(408).end()
    
    }
}