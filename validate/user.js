const validate=require("../middleware/validate")
const {list}=require('../model/index')
const {body}=require("express-validator")
exports.register=validate( [
    // 1.配置验证规则
    body('username').notEmpty().withMessage("用户名不能为空").custom(async username => {
        const user = await list.findOne({
            username
        })
        if (user) {
            return Promise.reject("用户名已存在")
        }
    }),
    body('phone').notEmpty().withMessage("手机号不能为空").isMobilePhone().withMessage("手机格式不正确").custom(async phone => {
        const user = await list.findOne({
            phone
        })
        if (user) {
            return Promise.reject("该手机号已注册过")
        }
    }),
    body('emali').notEmpty().withMessage("邮箱不能为空").isEmail().withMessage("邮箱格式不正确"),
    body('code').notEmpty().withMessage("验证码不能为空"),
])

exports.login=[
    validate([
        body('username').notEmpty().withMessage("用户名不能为空"),
        body('password').notEmpty().withMessage("密码不能为空"),
        body('emali').notEmpty().withMessage("邮箱不能为空"),
        body('phone').notEmpty().withMessage("手机号不能为空")
    ]),
    validate([
        body('username').custom(async (username,{req})=>{
            //获取数据库集合                            select选择可返回数据
            const data=await list.findOne({username}).select(["password","emali","username","phone"])
            if(!data){
                return Promise.reject("用户不存在")
            }
            //数据库i集合挂载到req中,供后续使用
             req.list=data
        })
    ]),
    validate([
        body('emali').custom(async (emali,{req})=>{
            console.log(emali)
            console.log(req.list.emali)
            if(emali!==req.list.emali){
                return Promise.reject("邮箱错误")
            }
        })
    ]),
    validate([
        body('password').custom(async (password,{req})=>{
            if(password!==req.list.password){
                return Promise.reject("密码错误")
            }
        })
    ]),
    validate([
        body('phone').custom(async (phone,{req})=>{
            if(phone!==req.list.phone){
                return Promise.reject("手机号错误")
            }
        })
    ])
]