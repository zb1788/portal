<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<script type="text/javascript">
var __showmessagetype=0;
function next_sj(){
	//alert('aaa');
	$('#pop_1').fadeOut(300);
	$('#pop_2').fadeIn(300);
	}
</script>
<style>
/*2013.1.6 添加升级说明*/
.con1012 {width:1012px;margin:0 auto;position:relative;z-index:200; display: none;}
.tips_sj {background:url(<%=path%>/upmessage/images/teacher_tips.png) no-repeat;width:1012px;position:absolute;top:80px;left:-5px;}
.tips_sj.step1 {height:300px;overflow:hidden;}
.tips_sj.step2 {height:766px;overflow:hidden;background-position:0 -325px;top:406px;display:none;}
span.guan {position:absolute;left:710px;top:70px;}
span.next {position:absolute;left:640px;top:200px;}
span.guan a,span.guan a:visited {display:block;width:40px;height:40px;color:#fff;}
span.next a,span.next a:visited {display:block;width:60px;height:28px;color:#fff;}
</style>
	<!--2013.1.6 添加升级提示弹出层-->
    <div class="con1012">
        <div class="tips_sj step1" id="pop_1">
        	<span class="guan"><a href="javascript:void(0);" onclick="clos_sj();" title="关闭"></a></span>
            <span class="next"><a href="javascript:void(0);" onclick="next_sj();" title="下一步"></a></span>
        </div>
        
        <div class="tips_sj step2" id="pop_2">
        	<span class="guan" style="left:960px;top:50px;"><a href="javascript:void(0);" onclick="clos_sj();" title="关闭"></a></span>
            <span class="next" style="left:890px;top:185px;"><a href="javascript:void(0);" onclick="clos_sj();" title="关闭"></a></span>
        </div>
    </div>
<!--结束-->