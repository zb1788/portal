package zzvcom.util.filter;


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Iterator;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Desc:
 * User: Administrator
 * Date: 2008-10-7
 * Time: 14:24:05
 */
public class AuthFilter implements Filter {
    protected FilterConfig config;

    //protected String loginPage = "";
    public void destroy() {
        // TODO Auto-generated method stub
        //this.loginPage = null;

    }

    public void doFilter(ServletRequest req, ServletResponse res,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        response.setCharacterEncoding("utf8");
        request.setCharacterEncoding("utf8");


        if (request.getMethod().equalsIgnoreCase("post")) {
//            System.out.println("is post=" + request.getMethod());
//            try {
//                request.setCharacterEncoding("utf8");
//                Iterator iter = request.getParameterMap().values().iterator();
//                while (iter.hasNext()) {
//                    String[] parames = (String[]) iter.next();
//
//                    for (int i = 0; i < parames.length; i++) {
//                        System.out.println("post value=" + parames[i]);
//                    }
//                }
//            } catch (UnsupportedEncodingException e) {
//                // TODO Auto-generated catch block
//                e.printStackTrace();
//            }
        } else {
            Iterator iter = request.getParameterMap().values().iterator();
            while (iter.hasNext()) {
                String[] parames = (String[]) iter.next();
                for (int i = 0; i < parames.length; i++) {
                    try {
                        parames[i] = new String(parames[i].getBytes("iso8859-1"), "utf-8");
                    } catch (UnsupportedEncodingException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        chain.doFilter(request, response);
    }

    public void init(FilterConfig filterConfig) throws ServletException {
        this.config = filterConfig;
    }

}
