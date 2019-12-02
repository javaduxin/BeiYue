package com.prj.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class LoginFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {


        HttpSession session=((HttpServletRequest)servletRequest).getSession();

        String url=((HttpServletRequest) servletRequest).getServletPath();

        //设立免检路径
        List<String> urlList=new ArrayList<String>();

        urlList.add("/page/login/login.html");
        urlList.add("/login");
        urlList.add(".jpg");
        urlList.add(".png");
        urlList.add(".gif");
        urlList.add(".css");
        urlList.add(".js");
        urlList.add("/code");

        for(String str:urlList){
            //endsWith判断字符串后缀
            if(url.endsWith(str)){
                filterChain.doFilter(servletRequest,servletResponse);
                return;
            }
        }

        if(session.getAttribute("loginUser")!=null){
            //用户登录成功
            filterChain.doFilter(servletRequest,servletResponse);
        }else{
            //用户没有登录
            ((HttpServletResponse)servletResponse).sendRedirect("/page/login/login.html");
        }
    }

    @Override
    public void destroy(){

    }
}
