const mongoose=require("mongoose")
const baseUrl=require('./../config/config.default')
mongoose.connect(baseUrl.baseUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//实例连接
const db=mongoose.connection

db.on('error',err=>{
    console.log("连接成功")
})

db.once('open',function(){
    console.log("连接成功")
})
// //创建cat的集合
// const Cat=mongoose.model('Cat',{
//     name:String
// })
// //实例化cat并写入数据库
// const Kitty=new Cat({
//     name:"zoujian"
// })
// Kitty.save().then(()=>console.log("over"))

module.exports={
    list:mongoose.model("list",require("./user"))
}