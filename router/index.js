const express=require('express')
const router=express.Router()

//用户登录
router.use(require('./user.js'))


// router.use(require('./profile'))
module.exports=router