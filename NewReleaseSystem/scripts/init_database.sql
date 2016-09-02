create database nrs;

use nrs;

create table nrs_admin(admin_id int primary key auto_increment, admin_username varchar(64) not null unique, admin_password varchar(64));

create table nrs_news(news_id int primary key auto_increment, news_title varchar(256) not null unique, new_content varchar(2048));