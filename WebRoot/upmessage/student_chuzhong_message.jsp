<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<script type="text/javascript">
var __showmessagetype=0;
function next_sj(num){
	switch (num) { 
    case 1:
    jQuery('#pop_1').fadeOut(300);
	jQuery('#pop_2').fadeIn(300);   
    break
	
	case 2:
    jQuery('#pop_2').fadeOut(300);
	jQuery('#pop_3').fadeIn(300);   
    break
	
	case 3:
    jQuery('#pop_3').fadeOut(300);
	jQuery('#pop_4').fadeIn(300);
    break
	
}
	}
</script>
<style>
/*2013.1.6 添加升级说明*/
/*2013.1.6 添加升级说明*/
.con1012 {width:1112px;margin:0 auto;position:relative;z-index:200;display:none;}
.con1012 .tips_sj {background:url(<%=path%>/upmessage/images/student_cz_tips.png) no-repeat;width:1112px;position:absolute;top:80px;left:35px;}
.con1012.xiao .tips_sj {background-image:url(<%=path%>/upmessage/images/student_xx_tips.png);}
.con1012 .tips_sj.step1 {height:255px;overflow:hidden;}
.con1012 .tips_sj.step2 {height:766px;overflow:hidden;background-position:0 -255px;top:335px;left:21px;display:none;}
.con1012.xiao .tips_sj.step2 {height:755px;background-position:0 -255px;top:325px;left:26px;}
.con1012 .tips_sj.step3 {height:720px;overflow:hidden;background-position:0 -1080px;top:150px;left:-15px;display:none;}
.con1012 .tips_sj.step4 {height:830px;overflow:hidden;background-position:0 -1900px;top:80px;left:-15px;display:none;}
span.guan {position:absolute;left:717px;top:70px;}
span.next {position:absolute;left:647px;top:200px;}
span.guan a,span.guan a:visited {display:block;width:40px;height:40px;color:#fff;}
span.next a,span.next a:visited {display:block;width:60px;height:28px;color:#fff;}
</style>
<!--2013.1.6 添加升级提示弹出层-->
    <div class="con1012">
        <!--frame1-->
        <div class="tips_sj step1" id="pop_1">
        	<span class="guan"><a href="javascript:void(0);" onclick="clos_sj();" title="关闭"></a></span>
            <span class="next"><a href="javascript:void(0);" onclick="next_sj(1);" title="下一步"></a></span>
        </div>
        <!--frame2-->
        <div class="tips_sj step2" id="pop_2">
        	<span class="guan" style="left:1060px;top:20px;"><a href="javascript:void(0);" onclick="clos_sj();" title="关闭"></a></span>
            <span class="next" style="left:990px;top:150px;"><a href="javascript:void(0);" onclick="next_sj(2);" title="下一步"></a></span>
        </div>
        <!--frame3-->
        <div class="tips_sj step3" id="pop_3">
        	<span class="guan" style="left:526px;top:48px;"><a href="javascript:void(0);" onclick="clos_sj();" title="关闭"></a></span>
            <span class="next" style="left:455px;top:178px;"><a href="javascript:void(0);" onclick="next_sj(3);" title="下一步"></a></span>
        </div>
        <!--frame4-->
        <div class="tips_sj step4" id="pop_4">
            <span class="guan" style="left:527px;top:55px;"><a href="javascript:void(0);" onclick="clos_sj();" title="关闭"></a></span>
            <span class="next" style="left:455px;top:185px;"><a href="javascript:void(0);" onclick="clos_sj();" title="关闭"></a></span>
        </div>
    </div>
<!--结束-->