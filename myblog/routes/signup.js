const express=require('express')
const path=require('path')
const router=express.Router()
var model=require('../lib/mongo')
router.get('/',function(req,res,next){
    res.render('signup')
})

router.post('/',function(req,res,next){
    const name=req.fields.name
    const gender=req.fields.gender
    const intro=req.fields.intro
    const password=req.fields.password
    const avator=req.files.avatar.path.split(path.sep).pop()

    new model.User({
        name:name,
        gender:gender,
        password:password,
        intro:intro,
        avatar:avator
    }).save(function(){
        res.redirect('/signin')
    })
    
})
module.exports=router