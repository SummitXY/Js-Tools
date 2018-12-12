var http=require('http')
var cheerio=require('cheerio')
var fs=require('fs')

var url="http://jwc.sysu.edu.cn/"

function filter(html){
    var $=cheerio.load(html)
    var $li=$('div.region-col-left section li')
    var content=""


    $li.each(function(i,ele){
        var timeDay=parseInt($(this).children('span.block-time').text().slice(3))
        var nowDay=(new Date()).getDate()
        if(timeDay>=nowDay-7){
            var outStr=$(this).children('a').attr('title')+" "+$(this).children('span.block-time').text()+"\n"
            var outStr2=url+$(this).children('a').attr('href')+"\n"
            content+=outStr
            content+=outStr2
        }
        

        
    })

    //var content=$('#block-views-jwnews-block-1 a').first().text()
    return content;
}

http.get(url,function(res){
    var html=""
    res.on('data',function(chunk){
        html+=chunk
    })

    res.on('end',function(){
        

        fs.writeFile('./data.txt',filter(html),function(err){
            if(err){
                console.log('write file wrong.')
            }

        })
    })
})




