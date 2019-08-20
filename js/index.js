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

/* --------------获取短信验证码----------------- */
function getCode() {
    var codeNum= false;
    var time= 60;
    var clearId; 
    var mobile= $('.formItem .mobile').val();
    if(mobile == ''){ //验证手机号码
        layer.msg('请输入手机号码');
        return;
    }else if(!(/^(13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8|9])\d{8}$/.test(mobile))) {
        layer.msg('请填写正确的手机号码');
        return;
    }else {
        $('.formItem .getCodeBtn').attr('disabled',"true");
        clearId= setInterval(timeDown,1000);
        $.ajax({
            type: 'post',
            url: baseUrl+'/api/sms/getCode',
            data: {"phone":mobile},
            success: function(res) {
                if(res.code == '500') {
                    layer.msg(res.msg);
                    codeNum= true;
                }else if(res.code == '200') {
                    $('.formItem .getCodeBtn').text(time+'s再获取');
                }
            }
        })
        // 倒计时函数
        function timeDown() {
            if(codeNum == false) {
                if(time == 0) {
                    $('.formItem>.getCodeBtn').removeAttr('disabled');
                    $('.formItem>.getCodeBtn').text('获取验证码');
                    clearInterval(clearId);
                    time= 60
               }else {
                    time--
                    $('.formItem>.getCodeBtn').text(time+'s再获取');
               }
            }else {
                $('.formItem>.getCodeBtn').removeAttr('disabled');
                $('.formItem>.getCodeBtn').text('获取验证码');
                clearInterval(clearId);
            }
        }
    }
    
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
            }else {
                layer.msg(res.msg);
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
            }else if(res.code == 666){
                layer.msg(res.msg,function(){
                    window.location.href= 'http://judiaowang.cn/app/view/partnerLogin.html';
                    return false;
                })
            }else {
                layer.msg(res.msg)
            }
        }
    })
}

/* --------------微信支付----------------- */
function weChatPay(orderId,targetUrl) {
    window.location.href=  baseUrl+'/api/pay/create?orderId='+orderId+'&returnUrl='+targetUrl+'&token='+JSON.parse(localStorage.getItem('loginData')).token
}

/* --------------根据token判断是否登录----------------- */
function isLogin(token,callBack) {
    $.ajax({
        url: baseUrl+'/api/token/check',
        type: 'post',
        data: token,
        success: function(res){
            if(res.code == 0) {
                callBack();
            }else  if(res.code == 666){
                layer.msg('请重新登录',function(){
                    window.location.href= 'http://judiaowang.cn/app/view/partnerLogin.html'
                    return false;
                });
            }else {
                layer.msg(res.msg);
            }
        }
    })
}

/* --------------办理区域----------------- */
$('.zoomList').on('touchend','li',function(e){
    $(this).addClass('checkedItem').siblings('li').removeClass('checkedItem');
})

