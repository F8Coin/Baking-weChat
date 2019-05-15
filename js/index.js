
/* --------------添加按钮----------------- */
$('.addBtn').on('touchend',function(e){
    var flag;
    if($(this).text() != '已添加'){
        flag = true;
    }else {
        flag = false;
    }
    if(flag){
        $(this).html('已添加')
        $(this).css('backgroundColor','#836FFF');
        $(this).css('color','#fff');                                    
        flag = false;
        e.preventDefault();
    }else {
        $(this).html('<span>+</span>添加');
        $(this).css('backgroundColor','#fff');
        $(this).css('color','#836FFF');
        flag = true;
        e.preventDefault();
    }

})

/* --------------办理区域----------------- */
 $('.selectZoom>li').on('touchend',function(e){
    $(this).addClass('checkedItem').siblings('li').removeClass('checkedItem');
    e.preventDefault();
 })
