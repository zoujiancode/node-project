var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbase = db.db("runoob");
    var obj={
        name:"哦那个132",
        title:'哈哈哈'
    }
    dbase.collection('site12').insertOne(obj, function (err, res) {
        if (err) throw err;
        console.log("数据插入成功!");
        db.close();
    });
});