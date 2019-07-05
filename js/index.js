var baseUrl= 'https://judiaowang.cn/platform';

/* --------------获取分区----------------- */
function getArea(url,type,token,busModId,busRegionId,callback) {
    $.ajax({
        url: url,
        type: type,
        // busRegionId:busRegionId,
        headers: {
            "X-Jdw-Token": token
        },
        data: {
            busModId: busModId
        },
        success: callback(data)
    })   
}


/* --------------文件上传----------------- */
function uploadFile(inputEle,containerEle) {
    let formData = new FormData(),
    fs =inputEle[0].files[0];
    var reads= new FileReader();
    reads.readAsDataURL(fs);
    reads.onload=function (e) {
        var targetSrc = this.result;
        containerEle.removeClass('uploadIcon')
        containerEle.find('.showImg').attr('src',targetSrc);
    };
}


/* --------------添加按钮----------------- */
$('.addBtn').on('touchend',function(e){
    console.log(11)
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

/* --------------注销业务----------------- */
// $('.companyFormContainer .content label>input').on('touchend',function(e){
//     var selectFlag= true;
//     if($(this).attr('checked')){
//         selectFlag = true;
//     }else {
//         selectFlag = false;
//     }
//     if(selectFlag) {
//         $(this).attr('checked',false);
//         selectFlag = false;
//     }else {
//         $(this).attr('checked',true);
//         selectFlag = true;
//     }
// })


/* --------------办理区域----------------- */
$('.selectZoom').on('touchend','li',function(e){
    $(this).addClass('checkedItem').siblings('li').removeClass('checkedItem');
})

