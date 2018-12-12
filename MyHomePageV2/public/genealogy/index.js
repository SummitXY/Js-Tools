$(document).ready(function () {
    
    var canvas=document.getElementById('myCanvas')
    var ctx=canvas.getContext('2d')
    ctx.fillStyle='#ff0000'
    //ctx.fillRect(150,0,1,80)
    
    
    var level=0
    
    $('body').delegate('.submit','click',function(){
        var fatherName=$(this).parent().next().find('.outName').text()
        if(fatherName!=''){
            fatherName='/'+fatherName
        }
        var textName = $(this).parent().find('.inName').val()+fatherName
        if(textName==''){
            textName='none'
        }
        $(this).parent().next().find('.outName').text(textName)
        
        var textBirthday = $(this).parent().find('.inBirthday').val()
        if(textBirthday==''){
            textBirthday='none'
        }
        $(this).parent().next().find('.outBirthday').text(textBirthday)

        $('.input').hide()
        $('.output').show()
    })
    
    
    $('body').delegate('.addBro','click',function(){
        $(this).attr('disabled','disabled')
        var _left = $(this).parent().offset().left
        var _top = $(this).parent().offset().top
        var $newBro = $('<div class="person"><div class="input"><input type="text"           class="inName" placeholder="name" required><br><input type="text" class="inBirthday" placeholder="birthday"><br><button class="submit">确定</button></div><div class="output"><p class="outName"></p><p class="outBirthday"></p><button class="addBro">添加兄弟</button><button class="addChild">添加孩子</button></div></div>')
        
        $('body').append($newBro)
        $newBro.css({
            'left':_left+250+'px',
            'top':_top+'px'
        })
        
        ctx.fillRect(_left+100,_top+50,250,1)
    })
    
    $('body').delegate('.addChild','click',function(){
        $(this).attr('disabled','disabled')
        level++
        var _left = $(this).parent().offset().left
        var lastTop=$(this).parent().offset().top
        var _top = level*120
        var $newChild = $('<div class="person"><div class="input"><input type="text"           class="inName" placeholder="name" required><br><input type="text" class="inBirthday" placeholder="birthday"><br><button class="submit">确定</button></div><div class="output"><p class="outName"></p><p class="outBirthday"></p><button class="addBro">添加兄弟</button><button class="addChild">添加孩子</button></div></div>')
        $('body').append($newChild)
        $newChild.css({
            'left':_left+'px',
            'top':_top+'px'
        })
        var fatherName=$(this).parent().find('.outName').text()
        var pos=fatherName.indexOf('/')
        var temp
        if(pos!==-1){
            temp=fatherName.substring(0,pos)
        }
        temp=fatherName
        $newChild.find('.outName').text(temp)
        ctx.fillRect(_left+100,lastTop+50,1,_top-lastTop)
    })

})










