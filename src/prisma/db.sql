CREATE TABLE user (
  userNickname VARCHAR(25) PRIMARY KEY,
  userEmail VARCHAR UNIQUE,
  userPassword VARCHAR(8) NOT NULL,
  userName VARCHAR NOT NULL
);

CREATE TABLE note (
  noteId INT PRIMARY KEY,
  noteContent VARCHAR NOT NULL,
  noteType INT NOT NULL,
  userNickname 
);

ALTER TABLE note ADD CONSTRAINT 
  FOREIGN KEY (userNickname)
  REFERENCES user (userNickname)
  ON DELETE CASCADE;
