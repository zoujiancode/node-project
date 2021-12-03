const express = require('express')
const router = express.Router()
//引入请求控制器处理方法
const userCtrl = require("../controller/use.js")
const validate=require("../validate/user")
const auth=require('../middleware/auth')



//路由  url,验证中间件,请求处理
router.post('/user/login',validate.login, userCtrl.login)

router.post('/user/register',validate.register,userCtrl.register)
router.get('/user',auth, userCtrl.currentUse)

router.post('/user/update', userCtrl.update)
module.exports = router