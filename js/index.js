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
function saveUpload(imgFile) {
    var isLogin= localStorage.getItem('token');
    $.ajax({
        url: baseUrl+'/api/upload/upload',
        // url:'https://desom.mynatapp.cc/api/upload/upload',
        type: 'post',
        data: {
            'file': imgFile
        },
        dataType: 'json',
        success: function(res){
            console.log(res.code);
        }
    })
}

function uploadFile(inputEle,containerEle) {
    let formData = new FormData(),
    fs =inputEle[0].files[0];
    var reads= new FileReader();
    reads.readAsDataURL(fs);
    reads.onload=function (e) {
        var targetSrc = this.result;
        saveUpload(targetSrc);
        containerEle.removeClass('uploadIcon');
        containerEle.find('.showImg').attr('src',targetSrc);
    };
}


/* --------------添加按钮----------------- */
$('#openSealList').on('touchend','.addBtn',function(e){
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


/* --------------办理区域----------------- */
// $('.selectZoom').on('touchend','li',function(e){
//     $(this).addClass('checkedItem').siblings('li').removeClass('checkedItem');
// })

