//格式化插件
const util=require('util')

module.exports=()=>{
    return (err,req,res,next)=>{
        res.status(500).json({
            //格式化
            error:util.format(err)
        })
    }
}