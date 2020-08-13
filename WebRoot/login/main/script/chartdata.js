//获取数据VFS
//图表
//进入栏目,创建三级菜单栏
function statchart(data){
	if(typeof(data)=="undefined" || data==null){
		return;
	}
    var schoolRankListName = [];
    var schoolRankListCount = [];
    for(var i=0;i<data.SCHOOL_LOGIN_RANK_LIST.length;i++)
    {
        var item = data.SCHOOL_LOGIN_RANK_LIST[i];
        schoolRankListName.push(item.SCHOOL_NAME)
        schoolRankListCount.push(item.SCHOOL_LOGIN_RANK)
    }

    var schoolLoginTotal = data.LOGIN_TIMES[0].TOTAL;
    var schoolLoginCount = [];
    var schoolLoginName = [];
    if(typeof data.LOGIN_TIMES[0].PLS != "undefined")
    {
    	var num=data.LOGIN_TIMES[0].PLS;
    	//万单位保留小数2位
    	var milionnum=(num/10000).toFixed(2);
    	//百分比保留小数2位
    	var percentnum=Math.round((num/data.LOGIN_TIMES[0].TOTAL)*10000)/100+"%";
        var name = "授课端\r\n"+milionnum+"万次\r\n"+percentnum+"";
        //var name = "授课端\r\n"+percentnum+"";
        var obj = new Object();
        obj.name = name;
        obj.value = data.LOGIN_TIMES[0].PLS;
        schoolLoginName.push(name)
        schoolLoginCount.push(obj);
    }
    if(typeof data.LOGIN_TIMES[0].UXIN != "undefined")
    {
    	var num=data.LOGIN_TIMES[0].UXIN;
    	//万单位保留小数2位
    	var milionnum=(num/10000).toFixed(2);
    	//百分比保留小数2位
    	var percentnum=Math.round((num/data.LOGIN_TIMES[0].TOTAL)*10000)/100+"%";
        var name = "优教信使\r\n"+milionnum+"万次\r\n"+percentnum+"";
        //var name = "优教信使\r\n"+percentnum+"";
        var obj = new Object();
        obj.name = name;
        obj.value = data.LOGIN_TIMES[0].UXIN;
        obj.color = 'red',
        schoolLoginName.push(name)
        schoolLoginCount.push(obj);
    }
    if(typeof data.LOGIN_TIMES[0].PORTAL != "undefined")
    {
    	var num=data.LOGIN_TIMES[0].PORTAL;
    	//万单位保留小数2位
    	var milionnum=(num/10000).toFixed(2);
    	//百分比保留小数2位
    	var percentnum=Math.round((num/data.LOGIN_TIMES[0].TOTAL)*10000)/100+"%";
        var name = "门户\r\n"+milionnum+"万次\r\n"+percentnum+"";
        //var name = "门户\r\n"+percentnum+"";
        var obj = new Object();
        obj.name = name;
        obj.value = data.LOGIN_TIMES[0].PORTAL;
        obj.color = 'red',
        schoolLoginName.push(name)
        schoolLoginCount.push(obj);
    }
   

//教师备、授课应用前十名学校
var myChart = echarts.init(document.getElementById("schoolRankBar"));//schoolRankBar loginRecordBar
option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {


            type : 'category',
            //data : ['黄河路小学', '河南省郑州市外国语中学枫杨街校区', '外国语中学', '淮河路小学', '枫阳路小学', '实验初中', '郑州中学'],
            data : schoolRankListName,
            axisTick: {
                show : false,
                alignWithLabel: true
            },
            axisLabel: {
                formatter: function(value) {
                    var ret = ""; //拼接加\n返回的类目项
                    var maxLength = 1; //每项显示文字个数
                    var valLength = value.length; //X轴类目项的文字个数
                    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                    if (rowN > 1) //如果类目项的文字大于3,
                    {
                        for (var i = 0; i < rowN; i++) {
                            var temp = ""; //每次截取的字符串
                            var start = i * maxLength; //开始截取的位置
                            var end = start + maxLength; //结束截取的位置
                            //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                            temp = value.substring(start, end) + "\n";
                            ret += temp; //凭借最终的字符串
                        }
                        return ret;
                    } else {
                        return value;
                    }
                },
                interval: 0,
                fontSize: 14,
                fontWeight: 100,
                textStyle: {
                    color: '#333333',

                }
            },
        }
    ],
    yAxis : [
        {
            type : 'value',
        }
    ],
    series : [
        {
            name:'访问次数',
            type:'bar',
            barWidth: '60%',
            data:schoolRankListCount
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}

//用户登录次数
var myChart = echarts.init(document.getElementById("loginRecordBar"));
option = {
    title : {
        text: '总访问次数:'+schoolLoginTotal,
        subtext: '',
        x:'center',
        textStyle:{
            color:'#910000'
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        bottom: 'bottom',
        data: schoolLoginName
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '40%',
            center: ['50%', '40%'],
            data:schoolLoginCount,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            }
        }
    ],
    color:['#2929ED','#3388EB', '#C7271f']

};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}

}
/*
接口调度编号，参数，回调方法，超时时间，是否异步
*/
function ajaxJson(turl,tdata,charset,fun,timeout,ifasync){
    var myDate = new Date();

    if(!timeout || timeout==null ){
        timeout=30000;
    }
    var turl1;
    if(turl.indexOf("?")!==-1){
        turl1="&time="+myDate.getSeconds();
    }
    else{
        turl1="?time="+myDate.getSeconds();
    }
    if(typeof(charset)=="undefined" && charset==null){
        charset="gbk";
    }
    //alert("是否异步："+ifasync);
    if(ifasync!=undefined && ifasync!="undefined" && ifasync!=null){

    }else{
        ifasync=true;
    }
    if(null==tdata||undefined==tdata||tdata.length==0){
        turl+=turl1;
    }else{
        turl+=turl1+"&"+tdata;
    }
    //alert(ifasync);
    $.ajax({
        url:turl,
        type:"get",
        async:ifasync,
        dataType:"jsonp",
        jsonp:"jsoncallback",
        scriptCharset:charset,
        success:function(rdata){
            fun(rdata);

        },
        error:function(xmlHttpRequest,textStatus,errorThrown) {
            //alert("error"+textStatus + errorThrown);
            //异步跨域调用无法获得异常
            //alert('请求超时！');

        }
    });

}
