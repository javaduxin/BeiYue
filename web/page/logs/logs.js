layui.use(['table'],function(){
	var table = layui.table;
	//系统日志
    table.render({
        elem: '#logs',
        url : 'logs.json',
        cellMinWidth : 95,
        page : true,
        height : "full-20",
        limit : 20,
        limits : [10,15,20,25],
        id : "systemLog",
        cols : [[
            {type: "checkbox", fixed:"left", width:50},
            {field: 'logId', title: 'ID',  align:'center'},
            {field: 'operationTime', title: '时间',  align:"center"},
            {field: 'operation', title: '操作'}
        ]]
    });
 	
})
