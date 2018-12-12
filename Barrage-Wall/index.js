window.onload = function () {
    
    var config = {
        //syncURL:'https://wd7052882893qzskpl.wilddogio.com'
    }
    //wilddog.initializeApp(config)
    //var ref=wilddog.sync().ref()
    var arr=[]
    var offLeft=$('#screen').offset().left
    var topMin=$('#screen').offset().top
    var topMax=topMin+$('#screen').height()
    var _top=topMin
    
    $('#sub').click(function(){
        var text=$('#input').val()
        //ref.child('message').push(text)
        $('#input').val('')
        arr.push(text)
        $message=$('<div></div>')
        $message.text(text)
        $('#screen').append($message)
        moveObj($message)
        
    })
    
    $('#input').keypress(function(e){
        if(e.keyCode=='13'){
            $('#sub').trigger('click')
        }
    })
    
    $('#clear').click(function(){
        arr=[]
        $('#screen').empty()
    })
    
    var getRandomColor=function(){
        return '#'+Math.floor(Math.random()*16777215).toString(16)
    }
    
    var moveObj=function(obj){
        var _left=$('#screen').width()-obj.width()
        _top += 50
        if(_top>topMax-50){
            _top=topMin
        }
        obj.css({
            left:_left,
            top:_top,
            color:getRandomColor()
        })
        var time=20000+10000*Math.random()
        obj.animate({
            left:'-'+_left+'px'
        },time,function(){
            obj.remove()
        })
    }
    
//    ref.child('message').on('child_added',function(snapshot){
//        var text=snapshot.val()
//        arr.push(text)
//        var textObj=$('<div class="message"></div>')
//        textObj.text(text)
//        $('#screen').append(textObj)
//        moveObj(textObj)
//    })
    
    var getAndRun=function(){
        if(arr.length){
            var n=Math.floor(Math.random()*arr.length+1)-1
            var $message=$('<div>'+arr[n]+'<div>')
            $('#screen').append($message)
            moveObj($message)
        }
    }
    
    setInterval(function(){
        getAndRun()
    },3000)
    
    
    
}


















