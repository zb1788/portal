<%
String screenWidthId = "w980";
Cookie[] cookies = request.getCookies();

if(null != cookies)
{
	for(Cookie tempCookie : cookies)
	{
		if("screen_width_id".equalsIgnoreCase(tempCookie.getName()))
		{
			screenWidthId = tempCookie.getValue();
		}
     }
 }
%>
