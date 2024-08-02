CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE otp(
	email varchar(100) not null,
    otp varchar(10) not null unique,
    EXP datetime
);

CREATE table polls (
	id INT auto_increment,
    title varchar(100),
    userId INT,
    createdAt varchar(100),	
    isLock boolean,
    primary key( id ),
    Foreign key( userId ) references users( id ) 
);

CREATE TABLE `option` (
    id INT auto_increment primary key,
    title VARCHAR(100),
    createdAt VARCHAR(100),
    pollId INT,
    FOREIGN KEY (pollId) REFERENCES polls(id)
);
CREATE TABLE user_options (
	id int not null primary key auto_increment,
    userId INT,
    optionId INT,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (optionId) REFERENCES `option`(id)
);



