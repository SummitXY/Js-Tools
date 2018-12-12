
const express=require('express')
const router=express.Router()
const model=require('../lib/mongo')
const check=require('../middlewares/check')
router.get('/',function(req,res,next){
    var name=req.query.name
    var id=req.query.id
    if(name){
        var where={
            author:name
        }
        model.Post.find(where,function(err,posts){
            res.render('posts',{
                posts:posts
            })
         })
    } else if(id){
        var where={
            _id:id
        }
        model.Post.find(where,function(err,posts){
            res.render('post',{
                post:posts[0]
            })
         })
    } else{
        model.Post.find(function(err,posts){
            res.render('posts',{
                posts:posts
            })
            // res.send('???')
         })
    }
})

router.get('/create',check.checkLoginIn,function(req,res,next){
    res.render('create')
})

router.post('/create',check.checkLoginIn,function(req,res,next){
    var name=req.session.user.name
    new model.Post({
        title:req.fields.title,
        content:req.fields.content,
        author:name,
        comments:[{author:'',content:''}]
    }).save(function(){
        res.redirect('/posts?name='+name)
    })
})

router.get('/edit',check.checkLoginIn,function(req,res,next){
    var id=req.query.id
    var where={
        _id:id
    }
    model.Post.find(where,function(err,posts){
        res.render('edit',{
            post:posts[0]
        })
     })
})

router.post('/edit',check.checkLoginIn,function(req,res,next){
    var id=req.fields.id
    var update={
        title:req.fields.title,
        content:req.fields.content
    }

    model.Post.findByIdAndUpdate(id,update,function(err,newpost){
        if(err){
            console.error(err)
        }
        res.redirect('/posts?id='+id)
    })
})

router.post('/comment',check.checkLoginIn,function(req,res,next){
    var comments
    model.Post.findById(req.fields.id,function(err,post){
        if(err){
            console.error(err)
        }
        comments=post.comments?post.comments:[]

        comments.push({
            author:req.fields.author,
            content:req.fields.content
        })
    
        var update={
            comments:comments
        }
        model.Post.findByIdAndUpdate(req.fields.id,update,function(err,newpost){
            if(err){
                console.error(err)
            }
            res.redirect('/posts?id='+req.fields.id)
        })
    })

    
})

module.exports=router