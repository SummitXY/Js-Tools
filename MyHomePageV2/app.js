var express=require('express')
var app=express()
var port=3000
app.listen(port)

app.use(express.static('public/main'))
app.use('/application/calculator',express.static('public/clientCalc'))
app.use('/application/maze',express.static('public/Mouse_Maze'))
app.use('/application/whacamole',express.static('public/WhacAMole'))
app.use('/application/barragewall',express.static('public/myBarrageWall'))
app.use('/application/genealogy',express.static('public/genealogy'))
app.use('/whacamoleimg',express.static('public/WhacAMole/img'))
app.use('/mainimg',express.static('public/main/img'))