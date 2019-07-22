var baseUrl= 'http://judiaowang.cn/platform';
var pageUrl= 'http://judiaowang.cn/app/view';
var test1= 'http://desom.mynatapp.cc/platform';

/* --------------获取分区----------------- */
function getArea(url,type,busModId,callback) {
    $.ajax({
        url: url,
        type: type,
        headers: {
            "X-Jdw-Token": JSON.parse(localStorage.getItem('loginData')).token
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
        var targetSrc = this.result;
        containerEle.find('.showImg').attr('src',targetSrc);        
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

/* --------------商品列表----------------- */
function getFormData(url,type,parameters,callback) {
    $.ajax({
        url: url,
        type: type,
        headers: {
            "X-Jdw-Token": JSON.parse(localStorage.getItem('loginData')).token
        },
        data: parameters,
        success: callback  

    })
}

/* --------------创建订单----------------- */
function createOrder(url,type,orderInfo,targetUrl) {
    $.ajax({
        url: url,
        type: type,
        headers: {
            "X-Jdw-Token": JSON.parse(localStorage.getItem('loginData')).token
        },
        data: orderInfo,
        contentType: 'application/json',
        success: function(res){
            if(res.code == 0) {
                var orderId= res.data.orderId;
                sessionStorage.setItem('orderId',orderId)
                window.location.href = targetUrl;
            }
        }
    })
}

/* --------------微信支付----------------- */
function weChatPay(orderId,targetUrl) {
    window.location.href=  baseUrl+'/api/pay/create?orderId='+orderId+'&returnUrl='+targetUrl+'&token='+JSON.parse(localStorage.getItem('loginData')).token
}



/* --------------办理区域----------------- */
$('.zoomList').on('touchend','li',function(e){
    $(this).addClass('checkedItem').siblings('li').removeClass('checkedItem');
})

