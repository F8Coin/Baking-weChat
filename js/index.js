var baseUrl= 'http://judiaowang.cn/platform';
var pageUrl= 'http://judiaowang.cn/app/weChat/view'
var test1= 'http://desom.mynatapp.cc/platform';

/* --------------获取分区----------------- */
function getArea(url,type,token,busModId,callback) {
    $.ajax({
        url: url,
        type: type,
        headers: {
            "X-Jdw-Token": token
        },
        data: {
            busModId: busModId
        },
        success: callback
    })   
}


/* --------------文件上传----------------- */
function uploadFile(inputEle,containerEle) {
    fs= inputEle[0].files[0];
    var reads= new FileReader();
    reads.readAsDataURL(fs);
    reads.onload=function (e) {
        var targetSrc = this.result;;
        containerEle.removeClass('uploadIcon');
    };
    var formData= new FormData();
    formData.append('file',fs);
    $.ajax({
        url: baseUrl+'/api/upload/upload',
        // url: test1+'/api/upload/upload',
        type: 'POST',
        cache: false, //上传文件不需要缓存
        data: formData,
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        success: function (res) {
            if(res.code == 0) {
                containerEle.find('.showImg').attr('src',res.data);
            }
        }
    })
}


/* --------------添加按钮----------------- */
$('#openSealList').on('touchend','.addBtn',function(e){
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
// $('.selectZoom').on('touchend','li',function(e){
//     $(this).addClass('checkedItem').siblings('li').removeClass('checkedItem');
// })

