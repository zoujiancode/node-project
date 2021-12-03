const jwt=require('jsonwebtoken')
var data
jwt.sign({
    foo:'bar'},
    "dfsgbdfedfsewdff",
    (err,token)=>{
        if(err) return console.log("生成token失败")

        console.log(token)
        data=token
    }
)

jwt.verify(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2Mzg0MzMwMjl9.olV83XIeYBT0sWSGTSPaDp6hppDoYbK3_PXBy0Jfz08','dfsgbdfedfsewdff',(err,ret)=>{
        if(err){
            return console.log("token 认证失败")
        }
        console.log(ret)
    }
)

