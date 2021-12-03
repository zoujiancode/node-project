const {
    list
} = require('../model/index')
const jwt = require('../utils/token')
const tokenStr = require('../config/config.default')
exports.register = async (req, res, next) => {
    console.log(req.body)
    try {
        const user = new list(req.body)
        await user.save()
        res.status(200).json(req.body)
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        //获取数据库中得数据，转json格式，便于操作
        const user = req.list.toJSON()
        //获取token, 并设置过期时间
        const token = await jwt.sign({
            userId: user._id
        },tokenStr.tokenStr,{expiresIn:30})
        //删除password字段禁止返回
        delete user.password
        res.status(200).json({
            ...user,
            token
        })
    } catch (err) {
        next(err)
    }
}

exports.currentUse = async (req, res, next) => {
    console.log(req.headers)
    try {
        
        res.send(req.list)
    } catch (err) {
        next(err)
    }
}

exports.update = async (req, res, next) => {
    try {
        res.send("我要更新用户")
    } catch(err) {
        next(err)
    }
}