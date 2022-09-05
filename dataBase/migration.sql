DROP DATABASE IF EXISTS todo_list_app;

CREATE DATABASE todo_list_app;


DROP TABLE IF EXISTS mylist; 

CREATE TABLE mylist(
    list_id serial NOT NULL,
    task text
);