<%@page language="java"
        import="java.util.*,zzvcom.util.*,vcom.sso.vo.*,vcom.sso.pdgrant.*,zzvcom.entity.TreeForm,net.sf.json.*"
        pageEncoding="utf-8" %>
<%@include file="screen_width.jsp" %>
<%
    response.setHeader("Pragma", "No-Cache");
    response.setHeader("Cache-Control", "No-Cache");
    response.setDateHeader("Expires", 0);
    String path = request.getContextPath();
    String basePath = path + "/";
    String ip = request.getHeader("x-forwarded-for");
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
        ip = request.getHeader("Proxy-Client-IP");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
        ip = request.getHeader("WL-Proxy-Client-IP");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
        ip = request.getRemoteAddr();
    }
    String date = new java.text.SimpleDateFormat("yyyy-MM-dd").format(new Date());
    String dayStamp = new java.text.SimpleDateFormat("yyMMdd").format(new Date());//日期戳
//4学生，0家长
    School school = null;
    VSysUser tuser = null;
    SchoolClass tclass = null;
    String mustudyStage = (String) session.getAttribute("studyStage");
    String eduAndGrade = (String) session.getAttribute("eduAndGrade");
    AuthResult aur = (AuthResult) session.getAttribute("authResult");
    tuser = aur.getUser();
    String regFlg = tuser.getRegFlg();
    String usertype = tuser.getUsertype();
    String username = tuser.getUsername();
    String truename = tuser.getTruename();
    String showname = truename;
    if (truename.length() > 6) {
        showname = truename.substring(0, 6) + "..";
    }
    school = tuser.getSchool();
    if (tuser.getSchoolClasses() != null && tuser.getSchoolClasses().length > 0) {
        tclass = tuser.getSchoolClasses()[0];
    }
    Student student = ((Student) session.getAttribute("student"));
    String spaceName = "";
    if ("0".equals(usertype)) {
        spaceName = "家长空间";
    } else if ("2".equals(usertype)) {
        spaceName = "教师空间";
    } else if ("3".equals(usertype)) {
        spaceName = "教师空间";
    } else if ("4".equals(usertype)) {
        spaceName = "学生空间";
    }
    String seokey = ((Map<String, String>) request.getAttribute("ConfigMap")).get("seokey");//搜索关键词
    String icoimg = ((Map<String, String>) request.getAttribute("ConfigMap")).get("icoimg");//当前域页面图标
    if (icoimg == null || icoimg.trim().length() == 0) {
        icoimg = "yjt.ico";
    }
    if (seokey == null || seokey.trim().length() == 0) {
        seokey = Common.DEFAULT_SEO_KEY;
    }
    String noalert = "false";
    String noalertCode = Common.noAlertCode(username, usertype);
    String requestAlertCode = request.getParameter("na");
    if (requestAlertCode != null && requestAlertCode.length() == (noalertCode.length() + 3) && requestAlertCode.startsWith(noalertCode)) {
        noalert = "true";
    }
    noalertCode = noalertCode + Math.round(Math.random() * 9);
    String login_data = request.getParameter("data");
//检查空
    if ("".equals(login_data)) {
        login_data = "\"\"";
    }

  	//检查非法
    try {
		if(null!=login_data){
			login_data=login_data.replaceAll("<","").replaceAll(">","").replaceAll("script","");
		    JSONObject.fromObject(login_data);
		}
    } catch (Exception e) {
    	login_data = "\"\"";
	}

    ProductGrantUtil pdGrantUtil = new ProductGrantUtil();
    ProductGrantRtn grantObj = pdGrantUtil.getProductGrant(request);
    String granttip = grantObj.getTip();
    String reasonUrl = grantObj.getReasonUrl();
    String appNoGrant = null;
    if (grantObj != null) {
        List<String> noGrantarr = grantObj.getAppNumbersNoGrant();
        appNoGrant = StringUtil.listToString(noGrantarr);
        if (appNoGrant != null) {
            appNoGrant = appNoGrant.replaceAll("\\r", "").replaceAll("\\n", "");
        }
    }
    String sendPhone = StringUtil.getStrFromNull(tuser.getLink());
//学生时获取家长手机号
    if ("4".equals(usertype)) {
        String parentTel = Interface.getParentTel(request.getServerName(), aur);
        sendPhone = sendPhone = StringUtil.getStrFromNull(parentTel);
    }
    if (tuser == null || tuser.getArea() == null || tuser.getArea().getAreaId() == null) {
        System.out.println("space/space.jsp  user or area or areaid IS NULL!! account: " + username);
        throw new Exception("UserData Exception:Account: '" + username + "'  user or area or areaid IS NULL!");
    } else if (school == null || school.getEduYears() == null) {
        System.out.println("space/space.jsp  school or eduYears IS NULL!! account: " + username);
        throw new Exception("UserData Exception:Account:  '" + username + "'  school or eduYears IS NULL!");
    }
%>
<!DOCTYPE html>
<html>
<head>
    <%
        String agent = request.getHeader("User-Agent");
//对于ie9采用ie8兼容模式
        if (agent != null && (agent.toLowerCase().indexOf("msie 9") >= 0)) {
    %>
    <meta http-equiv="X-UA-Compatible" content="IE=8"/>
    <%
    } else {
    %>
    <meta http-equiv="X-UA-Compatible" content="edge"/>
    <% } %>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <% if (icoimg != null && icoimg.trim().length() > 0) { %>
    <link rel="shortcut" href="<%=path%>/ico/<%=icoimg %>" type="image/x-icon"/>
    <link rel="icon" href="<%=path%>/ico/<%=icoimg %>" type="image/x-icon"/>
    <link rel="bookmark" href="<%=path%>/ico/<%=icoimg %>" type="image/x-icon"/>
    <% } %>
    <title>
        <%=seokey %>-<%=spaceName %>-首页
    </title>
    <link rel="stylesheet" type="text/css" href="<%=path%>/login/default/style/jquery.autocomplete.css"/>
    <link href="<%=path %>/common/style/checkuser.css" rel="stylesheet" type="text/css" />
    <link href="<%=path %>/space/v6/css/global.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path %>/space/v6/css/top_foot_new.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path %>/space/v6/css/lrtk.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path %>/space/v6/style/beike-tb.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path %>/space/v6/style/page_dtree_tb.css" type="text/css" rel="stylesheet"/>
    <link href="<%=path %>/space/v6/css/font_quan.css" rel="stylesheet" type="text/css"/>
    <link href="<%=path %>/manage/layuiadmin/layui/css/layui.css" rel="stylesheet" type="text/css" />

    <script src="<%=path %>/script/jquery.js"></script>
    <script src="<%=path %>/script/jquery-migrate-ada.js"></script>

    <script src="<%=path %>/space/script/artDialog.js?skin=default"></script>
    <script charset="utf-8" src="<%=path %>/script/base64.js"></script>
    <script charset="utf-8" src="<%=path %>/script/js_md5.js"></script>
    <script type='text/javascript' charset="utf-8" src="<%=path %>/script/js_rsa.js"></script>
    <script charset="utf-8" src="<%=path %>/script/util.js?r=<%=dayStamp %>&p=i"></script>
    <script charset="utf-8" src="<%=path%>/common/config.jsp?r=<%=dayStamp %>&showip=1" type="text/javascript"></script>
    <script charset="utf-8" type="text/javascript" src="<%=path%>/script/ajax_common.js?r=<%=dayStamp %>"></script>
    <script charset="utf-8" src="<%=path%>/script/loginobj.js?r=<%=dayStamp %>"></script>
    <script charset="utf-8" src="<%=path %>/script/spaceindex.js?r=<%=dayStamp %>"></script>
    <script charset="utf-8" src="<%=path %>/script/channels_v6.js?r=<%=dayStamp %>"></script>
    <script charset="utf-8" src="<%=path %>/manage/layuiadmin/layui/layui.js?t=1"></script>
    <script charset="utf-8" src="<%=path %>/script/customerService.js?r=<%=dayStamp %>"></script>


    <script type="text/javascript">
        <%
            if((request.getServerName()+"").indexOf(Common.getDomain())>=0){
                out.print("document.domain = \""+Common.getDomain()+"\";");
            }
        %>

        if (top.location !== self.location) {
            top.location = self.location;
        }
        var SSO = "<%= Common.getInterfaceUrl(request.getServerName(),"SSO","SSO.LOGIN")%>"; //sso登陆地址
        var plsUrl = protocol + sysconfig.PLS;//资源应用地址
        var global_basePath = "<%=basePath%>";
        var ip = "<%=ip%>";
        var noalert = <%=noalert%>;
        var noalertCode = "<%=noalertCode%>";
        var loginUsertype = util.getCookie("loginUsertype"); //登录角色
        var defalutselect =<%=login_data%>;
        var inputname = util.unconfoundInputName(util.getCookie("inputname")); //登录号
        var localAreaCode = portal_config.areacode;
        var username = "<%=username%>";//用户名
        var usertype = "<%=usertype %>";
        var usercode = "<%=tuser.getAccount() %>";
        var studentId = "<%= student.getStudentNumber() %>";//学生id
        var eduYears = "<%=school.getEduYears()%>";//学制
        var gradeCode = "<%= (tuser.getGrade()!=null?tuser.getGrade().getGradeCode():"") %>";//年级
        var studentname = "<%=student.getStudentNumber()%>";//学生名
        var studyStageCode = "<%= ( (tuser.getStudyStage()!=null && tuser.getStudyStage().length>0 && tuser.getStudyStage()[0]!=null)?tuser.getStudyStage()[0].getStudyStageCode():"") %>";//学段
        var classid = "<%=student.getSchoolClassId()%>";//当前学生班级ID/家长学生班级ID
        var className = "<%= ((tclass!=null && tclass.getClassName()!=null)?tclass.getClassName():"" )%>";//当前用户班级名-仅学生有效
        var truename = "<%=tuser.getTruename() %>";
        var userAreaId = "<%=tuser.getArea().getAreaId() %>";//区域id
        var areaName = "<%= tuser.getArea().getFullname() %>";//全路径区域名
        var schoolId = "<%=school.getSchoolId() %>";//学校Id
        var schoolStage = "<%= mustudyStage %>";//学段
        var schoolName = "<%=school.getSchoolName() %>";
        var vcom3dsusername = "<%= tuser.getNickname() %>";
        var boundphone = "<%=Common.getBoundphone()%>";//是否需要下发验证码
        var phoneusertype = "<%=Common.getPhoneusertype()%>";//需要下方验证码角色
        var phoneActiveState = "<%=tuser.getPhoneActiveState()%>";//是否绑定
        var vsms_day = "<%=Common.getVsms_day()%>";//验证码多少天下发一次
        var __date = "<%=date%>";//当前系统日志
        var repeatCheckTime = "<%=Common.getRepeatCheckTime()%>";//检查重复登录时间
        var notcheckuser = "<%=Common.getNotcheckuser()%>";//不需要验证的用户
        var areaphonenumber = "<%=Common.getAreaphonenumber()%>";
        var alerttype =<%=Common.getAlerttype()%>;
        var repeatUsertype =<%=Common.getRepeatUsertype()%>;
        var cookieid = "<%=RCode.getRCode()%>";
        var regFlg = "<%=regFlg %>";//user.regFlg 180802add
        var channelid = "";//request获取id参数，替换_为.暂时移除此逻辑
        var ___icode = "<%=request.getSession().getAttribute("vicode")%>";
        var mychidrenjson = null;
        var codeType = "";//验证码获取类型："temp":临时,"phone":短信
        var noCheckCountUsed = 0;//已验证次数
        var tempCodeCount =<%=Common.getTempCodeCount()%>;//系统设置的每月获取临时验证码的次数
        var phoneNumber = "<%=sendPhone%>";//手机号码
        var paytype = <%=Common.getPaytype()%>;//1，在线支付，2订购支付，3，匹配运营商在线支付。
        //读取cookie中 phoneBuyAble=true 手机订购 =false支付订购
        var phoneBuyAble = util.getCookie("phoneBuyAble");
        var screen_width_id = util.getCookie("screen_width_id");//记录屏幕宽度cookie
        //由于门户登陆后ub会相应增加，但是门户页面下方中获取ub数量是测试发现执行在ub增加前，因此在门户首页初始初始化时就调下ub接口，确保ub是最新数据。
        //util.getRemoteJson("UB","UB.SHOWPOINT","param=1",function(result){});
        var appNoGrant = "<%= appNoGrant %>";//鉴权串
        var GrantTip = "<%=granttip %>";//鉴权原因
        var GrantReasonUrl = "<%=reasonUrl %>";//鉴权说明地址
        var otherConfig = decodeURIComponent(decodeURIComponent(portal_config.otherConfig));
        var indexlogo = (portal_config.indexlogo != "" && portal_config.indexlogo != undefined) ? portal_config.indexlogo : "logo.png";
        var mainpage = null;
        var expDate = null;//用户有效期
        var domain = "<%= Common.getDomain() %>";

        var getHost = function (url) {
            var host = "null";
            if (typeof url == "undefined"
                || null == url)
                url = window.location.href;
            var regex = /.*\:\/\/([^\/|:]*).*/;
            var match = url.match(regex);
            if (typeof match != "undefined" && null != match) {
                host = match[1];
            }
            if (typeof host != "undefined" && null != host) {
                var strAry = host.split(".");
                host = strAry[0];
            }
            return host;
        }
        //页面初始化事件
        $(function () {
            $("#gjpt").attr("value", getHost());
            var servename = "<%=request.getServerName()%>";

            //页面加载后根据宽度调整样式，支持部分不经过登录页进入的方式
            var clienW = ($(window).width());
            if (clienW >= 1280) {
                clienW = "w1200";
                $(".w980").each(function () {
                    $(this).attr("class", "w1200");
                });
            } else {
                clienW = "w980";
                $(".w1200").each(function () {
                    $(this).attr("class", "w980");
                });
            }
            util.saveCookie("screen_width_id", clienW, 1000, "", domain);

            //首页地址
            if ("4" == usertype) {
                mainpage = "studentindex.action?r=<%=new Date().getDate()%>";
            } else if ("2" == usertype || "3" == usertype) {
                mainpage = "teacherindex.action?r=<%=new Date().getDate()%>";
            } else if ("0" == usertype) {
                mainpage = protocol + sysconfig.ILEARN + "/p_home_view.action?r=<%=new Date().getDate()%>";
            }
            //新版需要改logo更换逻辑
            $("#indexlogo").attr("src", "<%=path%>/space/images/logo/" + indexlogo);
            $("#footiframe").attr("src", protocol + sysconfig.CMS + interface_config["CMS.PAGE.A01022"]);
            $("#loginForm").attr("action", protocol + sysconfig.SSO + interface_config["SSO.LOGIN"]);
            $("#helplink").attr("href", protocol + sysconfig.CMS + interface_config["CMS.PAGE.USEGUIDE"]);
            $("#vcode").click(function () {
                this.src = protocol + sysconfig.SSO + interface_config["SSO.CODE"] + '?r=' + new Date().getSeconds();
            });
            window.setTimeout('$("#vcode").click()', 200);


            //20180824 Logo分离
            if (util.isBlank(portal_config.seokey)) {
                $("#toptitle").html("优教&nbsp;为你的每一“课”");
            } else {
                $("#toptitle").html(portal_config.seokey);
            }

            <% if(tuser.getHeadPhoto()!=null && tuser.getHeadPhoto().trim().length()>0){ %>
            var user_photo_url = protocol + sysconfig.VFS + interface_config["VFS.PHOTO"] + "<%= tuser.getHeadPhoto()%>";
            if (user_photo_url.indexOf("?") > 0) {
                $("#userphoto").attr("src", user_photo_url + "&r=<%=Math.round(Math.random()*10000) %>");
            } else {
                $("#userphoto").attr("src", user_photo_url + "?r=<%=Math.round(Math.random()*10000) %>");
            }
            <% } %>

            //0、若传递进来的data有参数则优先处理iframe的链接及打开方式
            var changeDefaultPage = false;//是否改变默认主页

            //显示学校名班级名
            try {
                if (schoolName.length > 6) {
                    $("#showSchool").html("<i class='fa fa-home' style='font-size: 16px;'></i> " + schoolName.substring(0, 5) + "..");
                } else {
                    $("#showSchool").html("<i class='fa fa-home' style='font-size: 16px;'></i> " + schoolName);
                }
            } catch (e) {
            }

            //单校上云校门户入口
            schoolProtalLink();

            /*之前的逻辑
            if("2"==usertype || "3"==usertype){
                $("#logo_space").html(schoolName);
                $("#logo_space2").html(schoolName);
            }else if("4"==usertype){
                $("#logo_space1").html(" ● "+schoolName);
                $("#logo_space2").html(className);
            }else if("0"==usertype){
                $("#logo_space1").html(" ● "+schoolName);
                $("#logo_space2").html(className);
            }
            */
            //默认显示名
            if (util.isBlank(portal_config.seokey)) {
                $("#modeName").text(default_index_name);
            } else {
                $("#modeName").text(portal_config.seokey);
            }
            //默认选中栏目data={channel:"",icode:"",p:""}
            if (defalutselect && defalutselect != null && defalutselect != "" && portal_config.showindex != "0") {
                var channelid = defalutselect.channel;
                var icode = defalutselect.icode;
                var setmain = defalutselect.setmain;
                if (typeof (setmain) != "undefined" && setmain != null && setmain != "") {
                    var turl = util.makeUrl(setmain.substring(0, setmain.indexOf(".")), setmain);
                    if (typeof (turl) != "undefined" && turl != null && "" != turl && "#" != turl) {
                        mainpage = turl;
                    }
                }
                if (typeof (icode) != "undefined" && icode != null && icode != "") {
                    var turl = util.makeUrl(icode.substring(0, icode.indexOf(".")), icode);
                    if (typeof (turl) != "undefined" && turl != null && "" != turl && "#" != turl) {
                        var param = defalutselect.p;
                        if (typeof (param) != "undefined" && param != null && param != "") {
                            //参数是否base64加密编码
                            if (typeof (defalutselect.sencode) != "undefined" && defalutselect.sencode != null && defalutselect.sencode == "true") {
                                param = new Base64().decode(param);
                            }
                            //param=param.replaceAll('|||','&');//转义&以传递URL参数，不过作base64就没必要转义了
                            if (turl.indexOf("?") > -1) {
                                turl += "&" + param;
                            } else {
                                turl += "?" + param;
                            }
                        }
                        $("#iframe01").attr("src", turl);
                        changeDefaultPage = true;
                    }
                }
                if (channelid == "" || channelid == undefined) {
                    if (typeof (defalutselect) == "string") {
                        channelid = defalutselect.toString();
                    } else {
                        channelid = null;
                    }
                }
                if (channelid != null) {
                    var lmObj = $("[lmid=" + channelid.replace(/\./g, "_") + "]");
                    lmObj.click();
                    changeDefaultPage = true;
                    /*
                    var src = "";
                    if(channelid.split(".").length>2){
                        src = lmObj.find("a").attr("href");
                    }else{
                        src = lmObj.attr("src");
                    }
                    var opentype = lmObj.attr("opentype");
                    if(opentype!=2 && opentype!=4){
                        $("[lmid="+channelid.replace(/\./g,"_")+"]").click();
                        //$("#iframe01").attr("src",src);
                        //lmObj.attr("className","sel");
                        //changechannelstyle(channelid);
                        changeDefaultPage=true;
                    }else{
                        $("[lmid="+channelid.replace(/\./g,"_")+"]").click();
                    }
                    */
                }
            }

            if ((!changeDefaultPage) && portal_config.showindex != "0") {
                //进入主页
                goMain();
            }

            //1、初始化用户类型
            $("#loginUsertype").attr("value", loginUsertype);
            $(".tab_login a").each(function () {
                $(this).siblings().removeClass();
            });
            $("#" + loginUsertype).addClass("cur_5");

            //2、如果支付类型为1-在线支付，或支付类型为3-匹配运营商类型在线支付(phoneBuyAble=true 手机订购 =false支付订购)
            if (usertype == 0 || usertype == 4) {
                if (paytype == 1 || (paytype == 3 && !util.isBlank(phoneBuyAble) && phoneBuyAble == "false")) {
                    $("#zxzf a").attr("href", protocol + sysconfig['PORTAL'] + interface_config['PORTAL.PAY']);
                    $("#zxzf").show();
                }
            }

            //3、判断该账号是否绑定多个家长账号和管理员账号，若存在则显示家长账号和管理员账号以供选择切换
            var temp = "<a href=\"~url~\">~role~</a>";
            var param = "q=" + inputname + "&loginName=" + inputname;
            var str = "";
            var url = "";
            var strCount = 0;
            util.getRemoteJson("SSO", "SSO.203", param, function (result) {
                if (result) {
                    for (var i = 0; i < result.length; i++) {
                        if (usertype == 0) { //家长需要过滤当前家长的账号
                            if (result[i].userType == "parent" && result[i].username != username) {
                                url = SSO + "?changeUsername=" + result[i].username + "&gjpt=" + getHost();
                                str += temp.replaceAll("~url~", url).replaceAll("~role~", result[i].role);
                                strCount++;
                            }
                            if (result[i].userType == "teacher") {
                                url = SSO + "?changeUsername=" + result[i].username + "&gjpt=" + getHost();
                                str += temp.replaceAll("~url~", url).replaceAll("~role~", result[i].role + "老师");
                                strCount++;
                            }
                        } else {
                            if (result[i].userType == "parent") {
                                url = SSO + "?changeUsername=" + result[i].username + "&gjpt=" + getHost();
                                str += temp.replaceAll("~url~", url).replaceAll("~role~", result[i].role);
                                strCount++;
                            }
                        }
                    }
                }
                //在请选择其他前追加家长用户账号信息
                if (strCount > 3 && usertype == 0) {
                    var newHeight = parseInt($(".login_con_bg").css("min-height")) + 50 * (strCount - 4);
                    $(".login_con_bg").css("min-height", newHeight);
                }
                if (usertype == 3 || usertype == 5) { //加入管理员账户切换并且只有教师才能切换管理员
                    var manage_url = protocol + sysconfig.PORTAL + "/manage/webindex.action";
                    str += "<a href=\"" + manage_url + "\">管理员空间</a>";
                }
                $("#blo_2 > ul").prepend(str);
            });
            //4、兼容导航数量7个的情况
            var nav_num_kt = $("#nav_kt ul li").length;
            if (nav_num_kt >= 7) {
                $("#nav_kt").attr('class', 'nav_kt eight_menu');
            } else {
                $("#nav_kt").attr('class', 'nav_kt');
            }
        });
        //订购提醒信息
        var areamessage = {};
        try {
            areamessage =<%= (Common.getAreamessage()==null || Common.getAreamessage().trim().length()==0)?"{}":Common.getAreamessage() %>;
        } catch (e) {
        }
        //按回车键进行搜索
        /*
        $(function(){
           $('#researchKey').bind('keypress',function(event){
               if(event.keyCode == "13") {
                   researchKeyResource();
               }
           });
        });
        */
        <%
        //组装栏目树Json数据
        List<TreeForm> menauthority = (List)request.getAttribute("menauthority");
        //List<TreeForm> firstMenuList = new ArrayList<TreeForm>();
        StringBuilder menuListJson =new StringBuilder();
        for(int st=0;st<menauthority.size();st++){
            TreeForm tf = menauthority.get(st);
            if("22".equals(tf.getParentid())){
                List children =tf.getChildren();
                JSONObject jsonobj = JSONObject.fromObject(tf);
                if(children!=null && children.size()>0){
                    jsonobj.put("children",JSONArray.fromObject(children));
                }
                if(menuListJson.length()>0){
                    menuListJson.append(",");
                }
                menuListJson.append(jsonobj.toString());
            }
        }
        out.println("var menuList=["+menuListJson.toString()+"];");
        %>
        //eduAndGrade  IndexAction定义 组装匹配 -- “学制|年级” 栏目配置比对串
        var eduAndGrade = "<%=eduAndGrade%>";

    </script>

</head>
<body>
<!-- 模拟alertDialog  -->
<div id='alertDiv' class=" aui_state_focus"
     style="left: 644px; top: 100px; width: 611px; display: block; position: absolute; z-index: 1988;display:none">
    <DIV class=aui_outer>
        <TABLE class=aui_border>
            <TBODY>
            <TR>
                <TD class=aui_nw></TD>
                <TD class=aui_n></TD>
                <TD class=aui_ne></TD>
            </TR>
            <TR>
                <TD class=aui_w></TD>
                <TD class=aui_c>
                    <DIV class=aui_inner>
                        <TABLE class=aui_dialog>
                            <TBODY>
                            <TR>
                                <TD class=aui_header colSpan=2>
                                    <DIV class=aui_titleBar>
                                        <DIV style="DISPLAY: block; CURSOR: move" class=aui_title>提示信息</DIV>
                                        <A style="DISPLAY: block" id="alertDiv_close" class=aui_close
                                           href="javascript:/*artDialog*/;">×</A></DIV>
                                </TD>
                            </TR>
                            <TR>
                                <TD class=aui_icon>
                                    <DIV style="BACKGROUND-IMAGE: url(<%=path%>/space/script/skins/icons/face-sad.png)"
                                         class=aui_iconBg></DIV>
                                </TD>
                                <TD style="WIDTH: 500px; HEIGHT: auto" class=aui_main>
                                    <DIV style="PADDING-BOTTOM: 5px; PADDING-LEFT: 5px; PADDING-RIGHT: 5px; PADDING-TOP: 5px"
                                         class=aui_content>
                                        <P id='alertDiv_content'>很遗憾，本业务您未订购或订购已过期！暂不能进行正常访问。</P></DIV>
                                </TD>
                            </TR>
                            <TR>
                                <TD class=aui_footer colSpan=2>
                                    <DIV class=aui_buttons>
                                        <BUTTON class=" aui_state_highlight" type=button id="alertDiv_ok">确定</BUTTON>
                                    </DIV>
                                </TD>
                            </TR>
                            </TBODY>
                        </TABLE>
                    </DIV>
                </TD>
                <TD class=aui_e></TD>
            </TR>
            <TR>
                <TD class=aui_sw></TD>
                <TD class=aui_s></TD>
                <TD style="CURSOR: se-resize" class=aui_se></TD>
            </TR>
            </TBODY>
        </TABLE>
    </DIV>
</DIV>
<!-- 模拟alertDialog  -->

<!--顶部下拉广告开始-->
<DIV id="top_ads"
     style="BORDER-RIGHT: #000 0px solid; BORDER-TOP: #000 0px solid; DISPLAY: none; MARGIN: auto; OVERFLOW: hidden; BORDER-LEFT: #000 0px solid; WIDTH: 950px; BORDER-BOTTOM: #000 0px solid; POSITION: absolute; z-index:999999; left:50%; margin-left:-475px;TOP: 0px; HEIGHT: 0px; BACKGROUND-COLOR: #ffffff; TEXT-ALIGN: center">
    <BUTTON
            id=header_ad
            style="BORDER-TOP-WIDTH: 0px; PADDING-RIGHT: 0px; PADDING-LEFT: 0px; BORDER-LEFT-WIDTH: 0px; BACKGROUND: none transparent scroll repeat 0% 0%; BORDER-BOTTOM-WIDTH: 0px; PADDING-BOTTOM: 0px; MARGIN: 0px; WIDTH: 950px; CURSOR: pointer; PADDING-TOP: 0px; HEIGHT: 500px; BORDER-RIGHT-WIDTH: 0px"
    ></BUTTON>
    <DIV id=close
         style="RIGHT: -420px; CURSOR: pointer; BOTTOM: 40px; POSITION: relative"><IMG
            style="FONT-SIZE: 14px; COLOR: #000000" onclick=closeAd(); src="<%=path%>/space/images/close.gif"></DIV>
</DIV>
<!--顶部下拉广告结束-->
<!--顶部漂浮广告开始-->
<script type="text/javascript" src="<%=path%>/space/script/floatad.js"></script>
<DIV id=float_ad
     style="DISPLAY: none; RIGHT: 0px; WIDTH: 24px; CURSOR: pointer; TOP: 410px; POSITION: absolute;z-index:89">
    <DIV id="xbdw"><A class="xinban" id="xinban" target="_blank"></A></DIV>
    <DIV><a class="repeat" id="repeat" onClick="show()" ; href="#">重播</a></DIV>
</DIV>
<!--顶部漂浮广告结束-->
<div class="head_wrap">

    <div class="xy_top">
        <div class="<%=screenWidthId%>">
            <div class="xy_logo fl" id="toptitle" onclick='goMain()' style="cursor:pointer"></div>
            <div class="xy_nav fr" id="menu" style="text-align:right">
                <!-- 一级栏目位置 -->
                <div id="moreFirstChannel" class="xy_more" style="display:none">
                    <a id="lm_more" style="cursor:pointer" onclick="$('#moreFirstChannelContent').toggle()">更 多<i
                            class="fa fa-caret-down"></i>
                    </a>
                    <div class="xy_more_btn" style="display:none" id="moreFirstChannelContent">

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="<%=screenWidthId%>">
        <div class="yj_logo prepare_tb"><a id="mainpage" onclick='goMain()' style="cursor:pointer"><img
                src="images/logo/logo.png" id="indexlogo" alt="<%=spaceName %>"/></a>
            <h1 id="modeName"></h1></div>
        <div class="ssou_wrap tb">
            <div class="ssou">
                <div class="ssou_k">
                    <input id="researchKey" class="txt_ssou" type="text"/>
                    <!--   placeholder="搜索您感兴趣的内容"  onBlur="if (value ==''){value='搜索您感兴趣的内容'}"  onfocus="if (value =='搜索您感兴趣的内容'){value =''};"  -->
                    <input type="submit" class="souBtn_white" value="" onClick="researchKeyResource();"/>
                </div>
            </div>
        </div>
        <!-- 搜索end-->
        <div class="userInfo fr">
            <dl>
                <dt><!-- 头像及用户中心链接 -->
                    <a style='cursor:pointer' onClick="util.openIcode('ILEARN.TRENDS');">
                        <img id="userphoto" src="<%=path%>/space/images/default1.png"/>
                    </a>
                </dt>
                <dd class="posRe">
                    <a class="tit1" style='cursor:pointer' onClick="util.openIcode('ILEARN.TRENDS');"
                       title="<%=truename %>"><%=showname %>
                    </a><%= ("4".equals(usertype)?"同学":"") %>
                    <%= (("2".equals(usertype)||"3".equals(usertype))?"老师":"") %>
                    &nbsp;&nbsp;&nbsp;
                    <a href="javascript:;" class="user">切换用户<i class="bottomdirection"></i></a>
                    <!--弹出层-->
                    <div class="login_con" id="login_con">
                        <div class="login_content">
                            <!-- 登录开始 -->
                            <form id="loginForm" name="loginForm" action="" method="get" target="">
                                <input type="hidden" id="loginUsertype" name="loginUsertype"/>
                                <input id="pwd" name="pwd" type="hidden" value=""/>
                                <input type="hidden" id="gjpt" name="gjpt" value=""/>
                                <input type="hidden" id="sfp" name="sfp" value=""/>
                                <input type="hidden" name="username" id="username" value=""/>
                                <input id="isPortalisPortal" name="isPortal" type="hidden" value="1"/>
                                <input id="data" name="data" type="hidden" value=""/>
                                <div class="close_2"><a href="javascript:;">×</a></div>
                                <div id="blo_1" style="display:;">
                                    <div class="tab_login gl">
                                        <a href="javascript:;" class="cur_5" id="teacher">教师</a>
                                        <a href="javascript:;" id="parent">家长</a>
                                        <a href="javascript:;" id="student">学生</a>
                                        <a href="javascript:;" id="manager">管理员</a>
                                    </div>
                                    <ul>
                                        <li class="usr">
                                            <div class="posRe">
                                                <!-- 多账号选择层 -->
                                                <div id="roleDiv" phonenum="" class="ac_results"
                                                     style="left:50px;top:40px;width:130px;display:none;position:absolute">
                                                    <ul id="roleList" style="overflow:hidden ;width:130px;">
                                                    </ul>
                                                </div>
                                                <input id="inputname" name="inputname" type="text" class="login_input"
                                                       value="" />
                                            </div>
                                        </li>
                                        <li class="pwd">
                                            <input id="inpwd" name="inpwd" type="password" class="login_input"
                                                   value=""/>
                                        </li>
                                        <li>
                                            <input name="validateCode" id="validateCode" type="text" class="check fl"
                                                   maxlength="4" value=""/>
                                            <span class="yanzeng fr">
                          	<img id="vcode" src="" width="60" height="28"/>
                        </span>
                                        </li>
                                        <li>
                                            <input type="submit" class="logBtn" value="确定"
                                                   onClick="return login_check();" id="loginbuttion"/>
                                        </li>
                                    </ul>
                            </form>
                            <!-- 登录结束 -->
                        </div>
                        <div id="blo_2" style="display:none"><!-- 多角色选择 -->
                            <h2>请选择</h2>
                            <ul class="jiaz_list">
                                <a href="javascript:;" onClick="showLogin();">其他</a>
                            </ul>
                        </div>
                    </div>
                    <!--end login_content-->
                    <div class="login_con_bg"><span class="angle1"></span></div>
                    <!--end login_con_bg-->
        </div>
        <!--end login_con-->
        </dd>
        <dd class="grayFon youqi"><span class="fr">
		<a href="#" onClick="util.openInFrame('TMS.CENTER');return false;">个人中心</a> / 
		<span id="zxzf" style="display:none"><a style="cursor:pointer" href="#" target="_blank"> 支付</a> / </span>
		<a id="helplink" href="" target="_blank">帮助</a> /
		<a href="/ssoLoginFail.jsp">退出</a></span>
            <span id="showSchool"></span>
        </dd>
        </dl>
    </div>
    <!--end myInfo-->
    <div class="clearfix"></div>
</div>
<!--end w1200-->

<!-- 二级栏目开始 -->
<%
    for (int st = 0; st < menauthority.size(); st++) {
        TreeForm tf1 = menauthority.get(st);
        if (tf1.getChildren() != null && tf1.getChildren().size() > 0) {
%>
<div class="tb-nav-wrap" id="<%= tf1.getId() %>" style="display:none">
    <div class="<%=screenWidthId%>">
        <div class="tb-nav">
            <ul><!-- 当角色为教师则不区分学制和年级 -->
                <%
                    int smcounter = 0;
                    for (TreeForm sttree : (List<TreeForm>) tf1.getChildren()) {
                        if ("2".equals(usertype) || "3".equals(usertype) || sttree.getC2() == null || sttree.getC2().trim().length() == 0 || sttree.getC2().indexOf(eduAndGrade) > -1) {
                            smcounter++;
                            String splitStr = "";//<span>|</span>新版无分割符
                            //if(smcounter==1){
                            splitStr = "";
                            //}
                            if ("4".equals(sttree.getOpentype()) || "3".equals(sttree.getOpentype()) || "6".equals(sttree.getOpentype())) {
                                //4 新开页打开moduleurl配置连接
                                //3 在框架内打开moduleurl配置连接
                                //6 查找下级首个1或3(在框架内打开栏目)执行
                                //框架内 或 新开 通过js判断opentype处理
                                out.println("<li id='menu_" + sttree.getId() + "' lmid='" + sttree.getId() + "' src='" + sttree.getHref() + "' opentype='" + sttree.getOpentype() + "' bg='" + sttree.getIcon() + "' >" + splitStr + "<a style='cursor:pointer' >" + sttree.getText() + "</a></li>");
                            } else if ("5".equals(sttree.getOpentype())) {
                                //以js方式调用moduleurl配置js方法,js执行src值
                                out.println("<li id='menu_" + sttree.getId() + "' lmid='" + sttree.getId() + "' src='" + sttree.getHref() + "' opentype='" + sttree.getOpentype() + "' bg='" + sttree.getIcon() + "' >" + splitStr + "<a style='cursor:pointer'>" + sttree.getText() + "</a></li>");
                            } else {
                                //1或2在打开c3系统moduleurl配置相对地址连接加入channelid,regflag,cookieid参数
                                //框架内 或 新开 通过js判断opentype处理
                                String thischannelid = sttree.getId().replaceAll("_", ".");
                                String url = sttree.getHref();
                                if (sttree.getHref().indexOf("?") > 0) {
                                    url = url + "&channelid=" + thischannelid + "&cookieid=" + RCode.getRCode() + "&regFlg=" + regFlg;
                                } else {
                                    url = url + "?channelid=" + thischannelid + "&cookieid=" + RCode.getRCode() + "&regFlg=" + regFlg;
                                }
                                out.println("<li id='menu_" + sttree.getId() + "' lmid='" + sttree.getId() + "' src='" + url + "' opentype='" + sttree.getOpentype() + "' bg='" + sttree.getIcon() + "' >" + splitStr + "<a style='cursor:pointer'>" + sttree.getText() + "</a></li>");
                            }
                        }
                    }
                %>
            </ul>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
<% }
}
%>
<!-- 二级栏目结束 -->
<!-- 三级栏目开始 -->
<%
    for (int st = 0; st < menauthority.size(); st++) {
        TreeForm tf1 = menauthority.get(st);
        if (tf1.getChildren() != null && tf1.getChildren().size() > 0) {
            tf1.getChildren();
            for (Object so : tf1.getChildren()) {
                TreeForm stf = (TreeForm) so;
                if (stf.getChildren() != null && stf.getChildren().size() > 0) {
%>
<div class="s1-nav new" id="<%= stf.getId() %>" style="display:none">
    <div class="<%=screenWidthId%>">
        <ul><!-- 当角色为教师则不区分学制和年级 -->
            <%
                int smcounter = 0;
                for (TreeForm sttree : (List<TreeForm>) stf.getChildren()) {
                    if ("2".equals(usertype) || "3".equals(usertype) || sttree.getC2() == null || sttree.getC2().trim().length() == 0 || sttree.getC2().indexOf(eduAndGrade) > -1) {
                        smcounter++;
                        String splitStr = "";//<span>|</span>新版无分割符
                        //if(smcounter==1){
                        splitStr = "";
                        //}
                        if ("4".equals(sttree.getOpentype()) || "3".equals(sttree.getOpentype()) || "6".equals(sttree.getOpentype())) {
                            //4 新开页打开moduleurl配置连接
                            //3 在框架内打开moduleurl配置连接
                            //6 查找下级首个1或3(在框架内打开栏目)执行
                            //框架内 或 新开 通过js判断opentype处理
                            out.println("<li id='menu_" + sttree.getId() + "' lmid='" + sttree.getId() + "' src='" + sttree.getHref() + "' opentype='" + sttree.getOpentype() + "' bg='" + sttree.getIcon() + "' >" + splitStr + "<a style='cursor:pointer' >" + sttree.getText() + "</a></li>");
                        } else if ("5".equals(sttree.getOpentype())) {
                            //以js方式调用moduleurl配置js方法,js执行src值
                            out.println("<li id='menu_" + sttree.getId() + "' lmid='" + sttree.getId() + "' src='" + sttree.getHref() + "' opentype='" + sttree.getOpentype() + "' bg='" + sttree.getIcon() + "' >" + splitStr + "<a style='cursor:pointer'>" + sttree.getText() + "</a></li>");
                        } else {
                            //1或2在打开c3系统moduleurl配置相对地址连接加入channelid,regflag,cookieid参数
                            //框架内 或 新开 通过js判断opentype处理
                            String thischannelid = sttree.getId().replaceAll("_", ".");
                            String url = sttree.getHref();
                            if (sttree.getHref().indexOf("?") > 0) {
                                url = url + "&channelid=" + thischannelid + "&cookieid=" + RCode.getRCode() + "&regFlg=" + regFlg;
                            } else {
                                url = url + "?channelid=" + thischannelid + "&cookieid=" + RCode.getRCode() + "&regFlg=" + regFlg;
                            }
                            out.println("<li id='menu_" + sttree.getId() + "' lmid='" + sttree.getId() + "' src='" + url + "' opentype='" + sttree.getOpentype() + "' bg='" + sttree.getIcon() + "' >" + splitStr + "<a style='cursor:pointer'>" + sttree.getText() + "</a></li>");
                        }
                    }
                }
            %>
        </ul>
    </div>
</div>
<%
                }//if stf has children
            }//stf for
        }//tf for
    }
%>
<!-- 三级栏目结束 -->

<div class="clearfix"></div>
<div style="position: relative;background-color:rgb(239,239,239)"><!-- 权限限制遮罩 -->
    <div id="grantAltdiv"
         style="display:none;position:absolute;z-index:699; top:130px;width:480px;height:142px;background-color:#FFF;background-image:url('<%=path%>/space/images/dialogImg.jpg');">
        <div style="height:30px;margin-top:5px;padding-right:10px;text-align:right;">
            <!-- <img src="<%=path%>/space/images/close.jpg" > -->
        </div>
        <div id="grantAltContent" style="height:70px;padding-left:125px;padding-right:20px;padding-top:5px">
        </div>
    </div>
    <div id="belowdiv"
         style="display:none;position:absolute; top:0px; left: 0%; bottom: 0; width: 100%; height: 100%;z-index: 888; background-color: #000;opacity:.3;filter:alpha(opacity=30);-moz-opacity:0.3;">
    </div>
    <div class="<%=screenWidthId%>"><!-- 主界面 -->
        <iframe id="iframe01" name="iframe01" src="" width="100%" height="1565" scrolling="no" frameborder="0"
                style="min-width:1000px;"></iframe>
        <div class="clearfix"></div>
    </div>

</div><!-- 权限限制遮罩end -->
<!--页脚-->

<!--页脚开始-->
<iframe style="min-width: 1000px;" id="footiframe" name="footiframe" src="" width="100%" height="190" scrolling="no"
        frameborder="0"></iframe>
<!--页脚结束-->
<iframe id="mask" style="display: none;"></iframe>
<!-- 升级提示弹出层 -->
<div class="maskmessage" id="messagediv"></div>
<div id="maskAllall" style="display: none;"></div>
<div id="waithtml" style="display: none;">
    <img src="<%=path%>/space/images/extanim32.gif"/>
    <span id="messagebox">正在加载页面，请稍后....</span>
</div>
<!--end w980--></div>
<!--end footer-->
<!--客服QQ http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODE2MzM1Ml80NTg2MDdfNDAwNjM3MTMxOV8yXw-->

</body>
</html>
<script src="<%=path %>/script/common.js"></script>
<!-- SCRIPT src="../public/script/kefu.js"></SCRIPT -->
<script>
    <!--
    //可配置js代码段
    var _type4OtherConfig = "index";

    /*切换角色弹出层*/
    $("a.user").bind("click", function () {
        if ($(".login_con").css("display") == "none") {
            $(".login_con").fadeIn(500);
            if (usertype == 4) { //学生则直接显示输入框
                $("#blo_1").show();
                $("#blo_2").hide();
                //loginutil.getPhoneRoles();
            } else { //若没有绑定多个家长账号，则直接显示输入框
                if ($("#blo_2 a").size() != 1) { //判断blo_2中存在账号可选择
                    $(".login_con_bg").css("min-height", 280 + (parseInt($("#blo_2 a").size()) - 4) * 50);
                    $("#blo_2").show();
                    $("#blo_1").hide();
                } else {
                    $("#blo_1").show();
                    $("#blo_2").hide();
                    //loginutil.getPhoneRoles();
                }
            }
            $("#vcode").click();
        } else {
            $(".login_con").hide(300);
            $("#roleDiv").hide();
        }
    });

    //显示其他
    function showLogin() {
        $("#blo_2").hide();
        $(".login_con_bg").css("min-height", 280);
        $("#blo_1").fadeIn(500);
        //loginutil.getPhoneRoles();
    }

    //选择角色点击事件
    $(".tab_login a").click(function () {
        $(this).addClass("cur_5");
        $(this).siblings().removeClass();
        //登录角色
        $("#loginUsertype").attr("value", $(this).attr("id"));
        //调用选择账号接口
        $("#roleDiv").attr("phonenum", "");
        //loginutil.getPhoneRoles();
    });

    //登录框检测js
    function login_check() {
        if ($("#inputname").val() == '' || $("#inpwd").val() == '' || $("#validateCode").val() == '') {
            $(".usr").addClass("err");
            $(".pwd").addClass("err");
            $(".check").addClass("err");
            shock();
            return false;
        } else {
            $(".usr").removeClass("err");
            $(".pwd").removeClass("err");
            $(".check").removeClass("err");
            $("#pwd").val($("#inpwd").val());

            //调用是否有多账号接口，判断用户名密码是否正确
            var modulus="10001";
            var publicExponent="ca56aa9d90e438b659c4d8da8d586687eabe1ba7bd90463981ea5397aab90020387e0a541020eddaa746f982a30115c54b04d5d1f823345f8d16ebffe647c986be3692158fc08413854ab3123b48c9ff486b12905ab21dd2dcfbbab9a2afac89953d86582bd13392c8fbbba0795fb00ebfffe3b0eb6a9cc372ee84635984807f";
            var pubkey = new RSAUtils.getKeyPair(modulus,"",publicExponent);
            RSAUtils.setMaxDigits(130);
            var phoneNumRSA = RSAUtils.encryptedString(pubkey,$("#inputname").val());
            var pwdRSA = RSAUtils.encryptedString(pubkey,$("#inpwd").val());
            var validateCode = $("#validateCode").val();
            util.getCharsetRemoteJson("SSO","SSO.203","q="+phoneNumRSA+"&pwdRsa="+pwdRSA+"&validateCode="+validateCode+"&timestamp="+Math.floor(Math.random()*10000)+"&loginUsertype="+$('#loginUsertype').val(),"gbk",function(result){
                if(result){
                    //如果密码错误，弹窗提示,密码正确且有多账号就展示
                    if(result.code != '200'){
                        $('#vcode').click();
                        $('#validateCode').val('');
                        art.dialog({
                            //设置内容与边界距离
                            top:'50%',
                            icon:'warning',
                            padding:5,
                            title:'提示信息',
                            width:500,
                            left:'50%',
                            //提示内容
                            content: result.msg,
                            //开启锁屏
                            lock:true,
                            //锁屏遮罩透明度
                            opacity: 0.1,
                            ok: function () {
                                return true;
                            },
                            okVal:'确定',
                            close:function(){
                                return true;
                            }
                        });
                    }else{
                        if(result.data && result.data.length > 1){
                            var html = "<div style='margin:0 20%;'>";
                            for(var num=0;num<result.data.length;num++){
                                if(num == 0){
                                    html += '<div class="checkuserradio"><input type="radio" id="cradio'+num+'" checked value="'+result.data[num].username+'" name="usercheckradio"><label class="radio-label" for="cradio'+num+'">'+result.data[num].role+'</label></div>';
                                }else{
                                    html += '<div class="checkuserradio"><input type="radio" id="cradio'+num+'" value="'+result.data[num].username+'" name="usercheckradio"><label class="radio-label" for="cradio'+num+'">'+result.data[num].role+'</label></div>';
                                }
                            }
                            html += '</div>';

                            art.dialog({
                                //设置内容与边界距离
                                top:'50%',
                                padding:5,
                                title:'选择用户',
                                width:387,
                                left:'50%',
                                //提示内容
                                content: html,
                                //开启锁屏
                                lock:true,
                                //锁屏遮罩透明度
                                opacity: 0.1,
                                cancel: false,
                                ok: function () {
                                    var checked = $("input[name='usercheckradio']:checked").val();
                                    var checkedName = $("input[type='radio']:checked")[0].nextSibling.data;
                                    if(typeof checked == 'undefined'){
                                        return false;
                                    }else{
                                        $("#username").attr("value",checked);
                                        $("#changename").html(checkedName);
                                        tologin();
                                        return true;
                                    }
                                },
                                okVal:'确定'
                            });
                        }else{
                            //没有多账号，直接登录
                            $("#username").attr("value",result.data[0].username);
                            $("#changename").html(result.data[0].role);
                            tologin();
                        }
                    }
                }
            });


            // if ($("#username").val() == "") {
            //     //若用户输入的是手机号，但是没有多个账号选择，则调用接口获取用户的账号，以供下方使用
            //     util.getCharsetRemoteJson("SSO", "SSO.203", "q=" + $("#inputname").val().replace(/\s+/g, "") + "&timestamp=" + Math.floor(Math.random() * 10000), "gbk", function (result) {
            //         var j = 0;
            //         if (result) {
            //             for (var i = 0; i < result.length; i++) {
            //                 if (result[i].userType == $("#loginUsertype").val()) {
            //                     j++;
            //                     $("#username").attr("value", result[i].username);
            //                 }
            //             }
            //         }
            //         if (j > 1) { //表明该用户没有选择账号
            //             art.dialog({
            //                 //设置内容与边界距离
            //                 top: '50%',
            //                 icon: 'face-sad',
            //                 padding: 5,
            //                 title: '提示信息',
            //                 width: 500,
            //                 left: '60%',
            //                 //提示内容
            //                 content: "请选择您需要切换的账号信息，再确认！",
            //                 //开启锁屏
            //                 lock: true,
            //                 //锁屏遮罩透明度
            //                 opacity: 0.1,
            //                 ok: function () {
            //                     $("#username").attr("value", "");
            //                     return true;
            //                 },
            //                 okVal: '确定',
            //                 close: function () {
            //                     $("#username").attr("value", "");
            //                     return true;
            //                 }
            //             });
            //             return false;
            //         }
            //         if ($("#username").val() == "") $("#username").attr("value", $("#inputname").val().replace(/\s+/g, ""));
            //         loginYz();
            //     });
            // } else {
            //     loginYz();
            // }
            return false;
        }
    }

    //登录验证
    function loginYz() {
        var username = $("#username").val().replace(/\s+/g, "");
        var pwd = $("#inpwd").val().replace(/\s+/g, "");
        $.get("<%=basePath%>changeCode.action?username=" + username + "&pwd=" + pwd, "", function (data) {
            var strs = data.split(",");
            var userN = strs[0];
            var pwD = strs[1];
            var param = "pwd=" + pwD + "&username=" + userN + "&loginUsertype=" + $("#loginUsertype").val() + "&rand=" + $("#validateCode").val() + "&authType=onlyCheck&validateCodeEn=1";
            if ($("#loginUsertype").val() == "manager") { //管理员切换
                param += "&appFlg=managerPortal";
            } else {
                param += "&appFlg=portal";
            }
            //调用用户中心认证接口，判断用户输入信息是否正确，若不正确则给出返回的认证提示，否则进行登录
            util.getRemoteJson("SSO", "SSO.202", param, function (result) {
                if (result.authFlg != 0) { //认证失败
                    art.dialog({
                        //设置内容与边界距离
                        top: '50%',
                        icon: 'face-sad',
                        padding: 5,
                        title: '提示信息',
                        width: 500,
                        left: '60%',
                        //提示内容
                        content: result.authInfo,
                        //开启锁屏
                        lock: true,
                        //锁屏遮罩透明度
                        opacity: 0.1,
                        ok: function () {
                            //刷新验证码
                            $(".yanzeng").find("img").eq(0).click();
                            return true;
                        },
                        okVal: '确定',
                        close: function () {
                            //刷新验证码
                            $(".yanzeng").find("img").eq(0).click();
                            return true;
                        }
                    });
                } else { //认证成功进行登录
                    //登录
                    tologin();
                }
            });
        });
    }

    $(".close_2 > a").click(function () {
        $(".login_con").hide();
    })

    //登录层晃动js
    function shock() {
        for (i = 1; i < 7; i++) {
            $('.login_con').animate({
                'right': '-=15'
            }, 3, function () {
                $(this).animate({
                    'right': '+=30'
                }, 3, function () {
                    $(this).animate({
                        'right': '-=15'
                    }, 3, function () {
                        $(this).animate({
                            'right': 0
                        }, 3, function () {

                        });
                    });
                });
            });
        }
    }

    //鉴权提示
    function grantAlert(content) {
        if (util.isBlank(content)) {
            if (util.isBlank(GrantTip)) {
                content = "很遗憾，本业务您未订购或订购已过期！暂不能进行正常访问。";
            } else {
                content = GrantTip;
                if (!util.isBlank(GrantReasonUrl)) {
                    content = content + "<p align=\"right\" style='padding-right:50px'><a style='text-decoration:underline' target='_blank' href='" + GrantReasonUrl + "'>查看详情</a></p>";
                }
            }
        }
        $('#alertDiv_content').html(content);
        $('#alertDiv_close').click(function () {
            $('#alertDiv').hide();
        });
        $('#alertDiv_ok').click(function () {
            $('#alertDiv').hide();
        });
        $('#alertDiv').css("left", (document.body.clientWidth - 611) / 2);
        $('#alertDiv').show();
    }

    //-->
</script>
<script src="<%=path%>/common/otherConfig.jsp?r=<%=dayStamp %>" type="text/javascript"></script>