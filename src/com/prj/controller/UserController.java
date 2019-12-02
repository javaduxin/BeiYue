package com.prj.controller;

import com.prj.entity.User;
import com.prj.server.user.UserServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;

@Controller
public class UserController  {
    @Autowired
    @Qualifier("UserServerImpl")
    private UserServer userServer;

    public UserServer getUserServer() {
        return userServer;
    }
    public void setUserServer(UserServer userServer) {
        this.userServer = userServer;
    }

    //登录
    @ResponseBody
    @RequestMapping("/login")
    public String login(User user, HttpSession session){
        User login= userServer.login(user);
        if (login!=null){
            session.setAttribute("loginUser",login);
            return "ok";
        }
        return "loginError";
    }
}
