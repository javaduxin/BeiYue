layui.use(['table', 'jquery', 'form','upload','laydate'], function(){
    var table = layui.table;
    var form = layui.form;
    var $ = layui.$;
    var upload = layui.upload;
    var laydate = layui.laydate;
    //展示已知数据
    table.render({
        elem: '#demo'
        ,totalRow: true,
        page: true
        ,cols: [[ //标题栏
            {field: 'id', title: '订单号', width: 80, sort: true}
            ,{field: 'name', title: '菜名', width: 120}
            ,{field: 'price', title: '单价', minWidth: 150,totalRowText: '总计：'}
            ,{field: 'total', title: '合计', minWidth: 160,totalRow: true}
            ,{fixed: 'right', width: 165, align:'center', toolbar: '#barDemo'}
        ]]
        ,data: [{
            "id": "10001"
            ,"name": "尖椒肉丝"
            ,"price": "30元"
            ,"total": "30元"
        },{
            "id": "10001"
            ,"name": "鱼香肉丝"
            ,"price": "28元"
            ,"total": "28元"
        },
            {
                "id": "10001"
                ,"name": "剁椒鱼头"
                ,"price": "45元"
                ,"total": "45元"
            },
            {
                "id": "10001"
                ,"name": "水煮肉片  "
                ,"price": "32元"
                ,"total": "32元"
            },
            {
                "id": "10001"
                ,"name": "酸菜鱼"
                ,"price": "35元"
                ,"total": "35元"
            },
            {
                "id": "10001"
                ,"name": "毛血旺"
                ,"price": "48元"
                ,"total": "48元"
            },
            {
                "id": "10001"
                ,"name": "肚丝汤"
                ,"price": "28元"
                ,"total": "328元"
            },]
        ,skin: 'line' //表格风格
        ,even: true
        //,limits: [5, 7, 10]
        //,limit: 5 //每页默认显示的数量
    });

    //日期范围
    laydate.render({
        elem: '#test6'
        ,range: true
    });

    //监听行工具事件
    table.on('tool()', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data //获得当前行数据
            ,layEvent = obj.event; //获得 lay-event 对应的值
        if(layEvent === 'detail'){
            var index1 = layer.open({
                type: 1,
                content: $('#detailForm').html(),
                maxmin: true
            });
            layer.full(index1);
            $("#did").html(data.id);
            $("#dname").html(data.name);
            $("#dprice").html(data.price);
            $("#dtotal").html(data.total);
        } else if(layEvent === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del(); //删除对应行（tr）的DOM结构
                layer.close(index);
                //向服务端发送删除指令
            });
        } else if(layEvent === 'edit'){
            layer.open({ //打开页面
                title: "编辑用户",
                type: 1,
                content: $('#updatepage').html(),
                area: ['700px', '400px'],
                closeBtn: 2,
                skin: 'layui-layer-rim',
                //加上边框
            })
        }
    });
});