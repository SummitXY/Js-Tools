const mongoose=require('mongoose')
const config=require('config-lite')(__dirname)
mongoose.connect(config.mongodb)

var db=mongoose.connection
db.on('error',function(){
    console.log('connection fail')
})

exports.User=mongoose.model('User',{
    name:String,
    gender:String,
    password:String,
    avatar:String,
    intro:String
})

exports.Post=mongoose.model('Post',{
    title:String,
    author:String,
    content:String,
    comments:[{author:String,content:String}]
})

