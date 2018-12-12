window.onload=function(){
    
    var 
        name='',
        subject='',
        message=''
        
    $('#name').change(function(){
        name+=$(this).val()
    })
    
    $('#subject').change(function(){
        subject+=$(this).val()
    })
    
    $('#msg').change(function(){
        message+=$(this).val()
    })
    

}
    
    
