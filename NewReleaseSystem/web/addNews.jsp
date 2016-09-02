<%--
  Created by IntelliJ IDEA.
  User: Evan
  Date: 2016/9/3
  Time: 0:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>添加新闻</title>
</head>
<body>

<form action="doAddNews.jsp" method="post">

  <label>标题</label><br/>
  <input type="text" id="news_title" name="news_title"/><br/>
  <label>内容</label><br/>
  <textarea rows="40" cols="40" id="news_content" name="news_content"></textarea><br/>
  <input type="submit">
</form>
</body>
</html>
