create table user(id int primary key auto_increment , name varchar(20), password varchar(40));
create table blacklist(id int primary key auto_increment, name varchar(20), imsi varchar(20));
create table monitor(id int primary key auto_increment, name varchar(20));
create table blacklist_monitor(blacklist_id int, monitor_id int, PRIMARY KEY (blacklist_id, monitor_id));