layui.use(['form','layer','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer
        $ = layui.jquery;

    //表单提交之前
    form.on("submit",function(datalayui){
        $(this).text("登录中...").attr("disabled","disabled").addClass("layui-disabled");
        setTimeout(function(){
            $.ajax({
                type: 'post',//提交请求的类型
                url: '/login', // ajax请求路径

                data:datalayui.field,//数据
                success: function(data){
                    if(data=='ok'){
                        layer.msg('登录成功');
                        window.location.href = "../../index.jsp";
                    }else if(data=='loginError'){

                        datalayui.elem.innerText="登录";
                        datalayui.elem.removeAttribute("disabled");
                        datalayui.elem.classList.remove("layui-disabled");


                        layer.msg('登录失败,账号或者密码错误');
                    }
                }
            });

        },1000);
    })


    /*//更新验证码
    $("img").click(function (){
        //第二张图片是验证码更换图片
        $("img").get(1).setAttribute("src","/code?timestamp=" + (new Date()).valueOf());
    })
*/
    //表单输入效果
    $(".loginBody .input-item").click(function(e){
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function(){
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function(){
        $(this).parent().removeClass("layui-input-focus");
        if($(this).val() != ''){
            $(this).parent().addClass("layui-input-active");
        }else{
            $(this).parent().removeClass("layui-input-active");
        }
    })
})
