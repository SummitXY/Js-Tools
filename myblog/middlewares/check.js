exports.checkLoginIn=function(req,res,next){
    if(!req.session.user){
        req.flash('error','未登录')
        return res.redirect('/signin') 
    }
    next()
}

exports.checkNotLogIn=function(req,res,next){
    if(req.session.user){
        req.flash('error','已登陆')
        return res.redirect('back')
    }
    next()
}