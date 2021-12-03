const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    emali:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false,
        default:null
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updataAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=userSchema