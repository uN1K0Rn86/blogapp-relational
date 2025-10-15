CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Quick Ben', 'https://bridgeburners.com/blogs/', 'Warrens and Their Uses', 20054);
INSERT INTO blogs (author, url, title, likes) VALUES ('Kalam', 'https://bridgeburners.com/blogs/kalam/', 'Assasinations', 174572);
