layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element', 'slider','jquery','form'],function(){
    var laydate = layui.laydate //日期
        , laypage = layui.laypage //分页
        , layer = layui.layer //弹层
        , table = layui.table //表格
        , carousel = layui.carousel //轮播
        , upload = layui.upload //上传
        , element = layui.element //元素操作
        , slider = layui.slider //滑块
        ,$=layui.$
        ,form=layui.form;
    //商家
    var tableIns = table.render({
        elem: '#newsList',
        url : 'bussiness.json',
        cellMinWidth : 95,
        toolbar: '#toolbarDemo',
        page : true,
        height : "full-125",
        limit : 10,
        limits : [10,15,20,25],
        id : "newsListTable",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'bussinessId', title: '商家编号',  align:"center"},
            {field: 'bussinessName', title: '店名'},
            {field: 'bussinessAddress', title: '地址', align:'center'},
            {field: 'shopkeeper', title: '店主',  align:'center'},
            {field: 'phoneNumber', title: '电话', align:'center'},
            {title: '操作', templet:'#newsListBar',fixed:"right",align:"center"}
        ]]
    });
    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click",function(){
        console.log("搜索")
                if($(".searchVal").val() != ''){
                    table.reload("newsListTable",{
                        page: {
                            curr: 1 //重新从第 1 页开始
                        },
                        where: {
                            key: $(".searchVal").val()  //搜索的关键字
                        }
                    })
        }else{
            layer.msg("请输入搜索的内容");
        }
    });
    //头工具
    table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'add':
                var index2=layer.open({
                    resize: true,
                    title: '添加商家',
                    shadeClose: true,
                    area: ['1000px','1000px'],
                    type:2,
                    content:'addBussiness.html',
                });
                break;
            case 'delete':

                var data = checkStatus.data,
                    userids = "";
                if (data.length > 0) {
                    for (var i in data) {
                        userids += data[i].userid + ","
                        layer.msg(userids);
                    }
                    console.log(userids);
                    layer.confirm('真的删除行么', function (index) {
                        $.ajax({
                            url:"delete2.action",
                            data: {"userids": userids},
                            success: function (flag) {
                                if (flag > 0) {
                                    layer.msg("删除成功", {icon: 6});
                                    layer.closeAll();
                                    table.reload('testReload', {});
                                } else {
                                    layer.msg("删除 失败", {icon: 6});
                                }

                            }
                        })

                    })
                }
                break;
            case 'update':
                layer.msg('编辑');
                break;
        }

    })

    function addNews(edit){
        var index1 = layer.open({
            resize: true,
            type : 2,
            title:"修改商家",
            shadeClose: true,
            content : "updateBussiness.html",
            area: ['45%','1000px'],
            success : function(layero, index1){
                var body = layer.getChildFrame('body', index1);
                if(edit){
                    body.find("#title").html(edit.bussinessName);
                    body.find("#bussinessName").val(edit.bussinessName);
                    body.find("#shopkeeper").val(edit.shopkeeper);
                    body.find("#bussinessAddress").val(edit.bussinessAddress);
                    body.find("#phoneNumber").val(edit.phoneNumber);
                    // form.render();
                }
            }
        })
    }
    //操作
    table.on('tool(test)', function(obj){
        var layEvent = obj.event,
            data = obj.data;
        if(layEvent === 'edit'){ //编辑
            addNews(data);
        } else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此商家？',{icon:3, title:'提示信息'},function(index){
                tableIns.reload();
                layer.close(index);
            });
        }
    });
})