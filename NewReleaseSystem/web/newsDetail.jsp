<%@ page import="nrs.dao.NewsDao" %>
<%@ page import="nrs.dao.impl.NewsDaoLightImpl" %>
<%@ page import="nrs.entity.News" %>
<%--
  Created by IntelliJ IDEA.
  User: Evan
  Date: 2016/9/2
  Time: 23:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%

    String idStr = request.getParameter("id");

    int id = 1;

    if(idStr != null && !idStr.equals(""))
    {
        id = Integer.parseInt(idStr);
    }

    NewsDao newsDao = new NewsDaoLightImpl();

    News news = newsDao.getNewsById(id);
%>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Bootstrap 3, from LayoutIt!</title>

    <meta name="description" content="Source code generated using layoutit.com">
    <meta name="author" content="LayoutIt!">

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

</head>
<body>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <h1 class="text-center">
                <%=news.getTitle()%>
            </h1>

            <p>
                <%=news.getContent()%>
            </p>
        </div>
    </div>
</div>

<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>
