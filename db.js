const fs=require('fs')
const {promisify} =require('util')//express的promise
const path=require('path')
//read和write的promise
const readFile=promisify(fs.readFile)
const writeFile=promisify(fs.writeFile)
//动态路径
const dbPath=path.join(__dirname,"./todo.json")

exports.getDb=async ()=>{
    const data=await readFile(dbPath,'utf8')
    return JSON.parse(data)
}

exports.saveDb=async (db)=>{
    const data=JSON.stringify(db)
    await writeFile(dbPath,data)
}
