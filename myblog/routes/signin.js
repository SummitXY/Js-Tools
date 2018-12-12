const express=require('express')
const router=express.Router()
const model=require('../lib/mongo')
router.get('/',function(req,res,next){
    res.render('signin')
})

router.post('/',function(req,res,next){
    var name = req.fields.name
    var password=req.fields.password
    var where={
        name:name,
        password:password
    }

    model.User.find(where,function(err,users){
        if(users.length>0){
            //res.send('signin success')
            req.session.user=users[0]
            res.redirect('/posts')

        } else {
            res.send('signin fail')
        }
    })

})

module.exports=router