CREATE DATABASE IF NOT EXISTS db_template_api;

CREATE TABLE IF NOT EXISTS db_template_api.users(
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL UNIQUE,
    password VARCHAR(225) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME,
    PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS db_template_api.access(
    access_id INT NOT NULL AUTO_INCREMENT,
    module VARCHAR(45) NOT NULL,
    name VARCHAR(45) NOT NULL UNIQUE,
    display VARCHAR(45) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME,
    PRIMARY KEY(access_id)
);

CREATE TABLE  IF NOT EXISTS db_template_api.users_access(
    users_access_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    access_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME,
    PRIMARY KEY(users_access_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(access_id) REFERENCES access(access_id)
);

CREATE TABLE IF NOT EXISTS db_template_api.tb_1_master(
    tb_1_id INT NOT NULL AUTO_INCREMENT,
    c_date DATE NOT NULL,
    c_time TIME NOT NULL,
    c_datetime DATETIME NOT NULL,
    c_email VARCHAR(225) NOT NULL,
    c_file VARCHAR(225),
    c_number INT NOT NULL,
    c_password VARCHAR(225) NOT NULL,
    c_tel VARCHAR(15) NOT NULL,
    c_text TEXT NOT NULL,
    
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME,
    PRIMARY KEY(tb_1_id)
);

CREATE TABLE IF NOT EXISTS db_template_api.tb_2_trans(
    tb_2_id INT NOT NULL AUTO_INCREMENT,
    tb_1_id INT NOT NULL,
    c_name VARCHAR(45) NOT NULL,

    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    deleted_at DATETIME,
    PRIMARY KEY(tb_2_id),
    FOREIGN KEY(tb_1_id) REFERENCES tb_1_master(tb_1_id)
);