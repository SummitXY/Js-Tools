const express=require('express')
const app=express()
const config=require('config-lite')(__dirname)
const path=require('path')
const session=require('express-session')
const MongoStore=require('connect-mongo')(session)
const formidable=require('express-formidable')
const flash=require('connect-flash')
const routes=require('./routes/index')
const pkg=require('./package')
app.listen(config.port)
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.locals.blog={
   title:pkg.name,
   description:pkg.description
}


app.use(express.static(path.join(__dirname,'public')))
app.use(session({
    name:config.session.key,
    secret:config.session.secret,
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:config.session.maxAge
    },
    store:new MongoStore({
        url:config.mongodb
    })
}))
app.use(function(req,res,next){
    res.locals.user=req.session.user
    next()
})
app.use(formidable({
    uploadDir: path.join(__dirname, 'public/avatars'), // 上传文件目录
    keepExtensions: true// 保留后缀
}))
app.use(flash())
routes(app)

console.log('listen at '+config.port)

