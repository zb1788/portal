package zzvcom.util;

import net.sf.json.JSONObject;
import vcom.sso.util.HttpClientUtil;
import vcom.sso.vo.AuthResult;

/**
 * 管理员空间工具处理
 * @author CHL
 *
 */
public class ManageUtil {
	/**
	 * 
	 * 摘自 SpaceFailFilter
	 * @param ut
	 * @return
	 */
	public static AuthResult getManageAuthResult(String ut){
		if(ut==null) {
			return null;
		}
		String authUrl=Common.PROTOCOL_IP+Common.getSysUrl("","SSO_IP")+"/sso/ssoGrant?ut="+ut+"&isPortal=1&appFlg=managerPortal";
 		HttpClientUtil hcu=new HttpClientUtil();
		String authResultJson=null;
		//logger.info("authUrl："+authUrl);

		try{
			authResultJson=hcu.get(authUrl);
		}catch(Exception e){
			e.printStackTrace();
		}
		AuthResult authResult = null;
		try {
		//logger.info("业务系统得到校验信息："+authResultJson);
		JSONObject js = JSONObject.fromObject(authResultJson);
		
		authResult=(AuthResult) js.toBean(js, AuthResult.class);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return authResult;
	}
}
