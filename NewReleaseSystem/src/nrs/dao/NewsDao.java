package nrs.dao;

import nrs.entity.News;

import java.util.List;

/**
 * Created by Evan on 2016/9/2.
 */
public interface NewsDao {

    void add(News news);

    News getNewsById(int id);

    void deleteNewsById(int id);

    List<News> getNews(int startIndex, int quantity);

}
