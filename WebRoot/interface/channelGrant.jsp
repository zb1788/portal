<%@ page language="java" import="java.util.*,zzvcom.util.*,vcom.sso.vo.AuthResult" pageEncoding="UTF-8"%><%
    /**
     * 获取栏目控制数据
     * 接口定义
	 http://127.0.0.1/tms/interface/querySchool.jsp?queryType=byUt&ut=d38184b735807fa1b79432cf568ba6029c4097418e0142af64e2247db12bc7394e62722190b7ea65
{"error":"","result":1,"rtnArray":[{"areaId":"34.01.01","cameraEndTime":"","cameraStartTime":"","collegeExaminationNew":"1","eduYears":"63","eleCardT0B":"0","headBranchFlg":"1","headSchoolId":"00","padTeachAble":"0","schoolId":"340101000001","schoolName":"威科姆测试学校","schoolType":"24","smartScreen":"0","smsSendWay":"0","smsService3p":"0"}],"seted":"1"}
返回rtnArray数组固定只有1个值 
collegeExaminationNew 新高考 0 未开启 1 开启
 smartScreen 智慧班牌 0 未开启 1 开启
 eleCardT0B 4g学生证 0 未开启 1 开启
     */
 String sut=null;
 Cookie[] cookies = request.getCookies();
 if(cookies != null && cookies.length > 0){
      for (Cookie cookie : cookies){
          if("ut".equals(cookie.getName())){
        	  sut=cookie.getValue();
          }
      }
  }
if( sut!=null && sut.trim().length()>0){
	String channelUrl=Common.getInterfaceUrl(request.getServerName(),"TMS_IP","TMS.CHANNELGRANT");
	channelUrl=channelUrl+"&ut="+sut;
	System.out.println("[CHANNEL GRANT URL] get TMS.CHANNELGRANT:"+channelUrl);
	String channelJson=HttpUtil.readURLByCharset(channelUrl,null,"utf-8",5000);
	if(channelJson==null || channelJson.trim().length()==0){
		channelJson="{\"error\":\"\",\"result\":\"-1\"}";
	}
	out.println("var channelGrantJson="+channelJson);
}else{
	out.println("var channelGrantJson={\"error\":\"\",\"result\":\"-1\"}");
}
%>