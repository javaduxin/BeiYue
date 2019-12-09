layui.use(['table', 'jquery', 'form','upload','laydate'], function(){
    var table = layui.table;
    var form = layui.form;
    var $ = layui.$;
    var upload = layui.upload;
    var laydate = layui.laydate;
    //展示已知数据
    table.render({
        elem: '#demo',
        page: true
        ,cols: [[ //标题栏
            {field: 'id', title: 'ID', width: 80, sort: true}
            ,{field: 'name', title: '店名', width: 120}
            ,{field: 'address', title: '地址', minWidth: 150}
            ,{field: 'total', title: '合计营业额', minWidth: 160}
            ,{field: 'unit', title: '单位', width: 80}
            ,{field: 'date', title: '时间', width: 100}
            ,{fixed: 'right', width: 165, align:'center', toolbar: '#barDemo'}
        ]]
        ,data: [{
            "id": "10001"
            ,"name": "四川人家"
            ,"address": "惠明路店"
            ,"unit": "元"
            ,"date": "2019年11月"
            ,"total": "3800"
        }, {
            "id": "10001"
            ,"name":"小四川"
            ,"address":"惠明路店"
            ,"unit": "元"
            ,"date": "2019年11月"
            ,"total": "4582"
        }, {
            "id": "10001"
            ,"name": "私家菜馆"
            ,"address": "惠明路店"
            ,"unit": "元"
            ,"date": "2019年11月"
            ,"total": "3212"
        },{
            "id": "10001"
            ,"name": "鸿运排骨"
            ,"address": "惠明路店"
            ,"unit": "元"
            ,"date": "2019年11月"
            ,"total": "8784"
        }, {
            "id": "10001"
            ,"name": "农家炒菜"
            ,"address": "惠明路店"
            ,"unit": "元"
            ,"date": "2019年11月"
            ,"total": "1235"
        },  {
            "id": "10001"
            ,"name": "四川人家"
            ,"address": "惠明路店"
            ,"unit": "元"
            ,"date": "2019年11月"
            ,"total": "6548"
        }, {
            "id": "10001"
            ,"name": "四川人家"
            ,"address": "惠明路店"
            ,"unit": "元"
            ,"date": "2019年11月"
            ,"total": "3800"
        }, {
            "id": "10001"
            ,"name": "四川人家"
            ,"address": "惠明路店"
            ,"unit": "元"
            ,"date": "2019年11月"
            ,"total": "3800"
        }]
        ,skin: 'line' //表格风格
        ,even: true
        //,page: true //是否显示分页
        //,limits: [5, 7, 10]
        //,limit: 5 //每页默认显示的数量
    });
    //日期范围
    laydate.render({
        elem: '#test6'
        ,range: true
        ,value: '2018-08-18 - 2018-08-30'
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
            $("#daddress").html(data.address);
            $("#dtotal").html(data.total);
            $("#ddate").html(data.date);
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