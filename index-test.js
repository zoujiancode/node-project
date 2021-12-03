const app = require('express')()
const fs = require('fs')
const express=require('express')
const {
    json
} = require('express')
const {
    getDb,saveDb
} = require('./db')
app.use(express.json())
app.use(express.urlencoded())
app.use(function(err,req,res,next){
    res.status(500).json({
        error: err.message
    })
})
app.get("/todos", async (req, res,next) => {
    //异步读取,(路径，解码，function（错误优先）)
    // fs.readFile('./todo.json','utf8',(err,data)=>{
    //     if(err) return
    //     //读取的是字符串
    //     const db=JSON.parse(data)
    //     res.status(200).json(db.todo)

    // })

    try {
        let db = await getDb()
        console.log(db)
        res.status(200).json(db.todo)
    } catch (err) {
        // res.status(500).json({
        //     error: err.message
        // })
        next(err)
    }

})

app.get("/todos/:id",async (req, res) => {
    // fs.readFile('./todo.json', 'utf8', (err, data) => {
    //     if (err) return
    //     const db = JSON.parse(data)
    //     const list = db.todo.filter(v => v.id == req.params.id)

    //     if (!list) {
    //         return res.status(404).end()
    //     }
    //     res.status(200).json(list)
    // })

    try {
        const db = await getDb()
        const list = db.todo.filter(v => v.id == req.params.id)

        if (!list) {
            return res.status(404).end()
        }
        res.status(200).json(list)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})
app.post("/post",async (req, res) => {
    console.log("哈哈哈我是post请求")
    const str=req.body
    try {
        let db = await getDb()
        console.log(db)
        var index=db.todo.length
        db.todo.push(
            {
                id:index?index+1:1,
                title:str.title
            }
        )
        console.log(db)
        await saveDb(db)
        res.status(200).json(db)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})
app.patch('/todos/:id',async (req,res)=>{
    const list=req.body
    list.id=req.params.id
    try {
        let db = await getDb()
        console.log(req.params.id)//获取指定参数
        const index=db.todo.findIndex(v=>v.id===Number.parseInt(req.params.id))
        db.todo[index]=list
        // Object.assign(arr,list)
        await saveDb(db)
        res.status(200).json(db)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})


app.delete('/todos/:id',async (req,res)=>{
    console.log(req.params.id)
    try {
        let db = await getDb()
        var index=db.todo.findIndex(v=>v.id===Number.parseInt(req.params.id))
        console.log(index)
        db.todo.splice(index,1)
        if(index===-1){
            return res.status(404).end()
        }
        await saveDb(db)
        res.status(200).json(db)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})
app.listen(3000, () => {
    console.log("running at 3000")
})