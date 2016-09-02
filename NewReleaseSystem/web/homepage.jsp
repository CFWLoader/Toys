<%@ page import="nrs.entity.News" %>
<%@ page import="java.util.List" %>
<%@ page import="nrs.dao.NewsDao" %>
<%@ page import="nrs.dao.impl.NewsDaoLightImpl" %>
<%--
  Created by IntelliJ IDEA.
  User: Evan
  Date: 2016/9/2
  Time: 15:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>学院新闻发布系统</title>

    <meta name="description" content="Source code generated using layoutit.com">
    <meta name="author" content="LayoutIt!">

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

</head>
<body>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-9">
            <h1 class="text-center">
                学院新闻发布系统
            </h1>
        </div>
        <div class="col-md-3">

            <a href="adminLogin.jsp">
                <button type="button" class="btn btn-primary btn-lg btn-block">
                    管理员登录
                </button>
            </a>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <ul>
                <%
                    NewsDao newsDao = new NewsDaoLightImpl();

                    List<News> newsList = newsDao.getNews(1, 30);

                    for(News news : newsList)
                    {
                %>
                <li>
                    <%=news.getTitle()%>
                </li>
                <%
                    }
                %>
            </ul>
        </div>
    </div>
</div>

<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>
