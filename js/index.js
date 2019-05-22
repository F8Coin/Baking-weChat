/* --------------textarea在ios打开点击放大问题----------------- */
window.onload = function () {
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
    document.addEventListener('dblclick', function (e) {
        e.preventDefault();
    });
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    });
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
};

/* --------------文件上传----------------- */
var upLoadSrc;
function uploadFile() {
    let formData = new FormData(),
    fs = $(".uploadInput")[0].files[0];
    var reads= new FileReader();
    reads.readAsDataURL(fs);
    reads.onload=function (e) {
        upLoadSrc = this.result;
        $('.uploadBox').removeClass('uploadIcon')
        $('.uploadBox .showImg').attr('src',upLoadSrc);
    };
}


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
 