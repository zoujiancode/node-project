const express=require('express')
const app=express()
const cors=require('cors')
const morgan=require('morgan')
//错误中间件
const errHandle=require('./middleware/err-handle')
//引用路由
const router=require('./router/index')
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
//挂载路由
app.use('/',router)
//挂载错误处理中间件
app.use(errHandle())
require('./model/index')
app.listen(3000,()=>{
    console.log("running at 3000")
})
