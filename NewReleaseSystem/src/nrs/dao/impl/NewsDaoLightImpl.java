package nrs.dao.impl;

import nrs.dao.NewsDao;
import nrs.entity.News;
import nrs.util.ConnectionManager;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by Evan on 2016/9/2.
 */
public class NewsDaoLightImpl implements NewsDao {

    private Connection connection;

    public NewsDaoLightImpl() {

        connection = ConnectionManager.getConnection();

    }

    @Override
    public void add(News news) {

        Statement statement = null;

        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        String query = "insert into nrs_news(news_title, news_content) values ('" + news.getTitle() + "', ' " + news.getContent() + " ');";

        try {
            statement.execute(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public News getNewsById(int id) {

        News news = null;

        Statement statement = null;

        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        String query = "select * from nrs_news where news_id=" + id + ";";

        try {

            ResultSet resultSet = statement.executeQuery(query);

            if(resultSet.next())
            {
                news = new News();

                news.setId(resultSet.getInt(1));

                news.setTitle(resultSet.getString(2));

                news.setContent(resultSet.getString(3));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return news;
    }

    @Override
    public void deleteNewsById(int id) {

        Statement statement = null;

        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        String query = "delete from nrs_news where news_id=" + id + ";";

        try {
            statement.execute(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public List<News> getNews(int startIndex, int quantity) {

        List<News> newsList = new LinkedList<>();

        News news = null;

        Statement statement = null;

        try {
            statement = connection.createStatement();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        String query = "select * from nrs_news limit " + startIndex + "," + quantity + ";";

        try {

            ResultSet resultSet = statement.executeQuery(query);

            while(resultSet.next())
            {
                news = new News();

                news.setId(resultSet.getInt(1));

                news.setTitle(resultSet.getString(2));

                news.setContent(resultSet.getString(3));

                newsList.add(news);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return newsList;
    }
}
