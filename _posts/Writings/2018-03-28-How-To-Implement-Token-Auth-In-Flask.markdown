---
layout: default_blog
title:  "How To Implement Token Based Auth In Flask"
date:   2018-03-28 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/token.jpeg
card_image_credit: Photo by Markus Spiske from Pexels
---

So the other day I talked about [why](/writing/2018/03/12/Token-Based-Authentication.html) I chose to used token based authentication for my new service. I thought it would be useful for others to see how I did this, in case you want to as well.

First, it's necessary to define the database structure that I've implemented for the structure. Some things that are specific for my service have been omitted for brevity, but the tables below can be used as a starting point for any other service. Side note, the database that I use is MySQL, and that is what I recommend that most beginners use as it is stable and tested by much larger companies than yours will ever be. The tables are as follows:

```
CREATE DATABASE service;
USE DATABASE service;

CREATE TABLE IF NOT EXISTS logins (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY(`id`),
  UNIQUE KEY (`username`)
);

CREATE TABLE IF NOT EXISTS authentication_tokens (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `token` varchar(64) NOT NULL,
  `last_updated_at` TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(`id`),
  UNIQUE KEY (`user_id`)
);
```

Now, the above code can actually be copied into a ```.sql``` file, and moved into a MySQL installation by running ```mysql -p < filename.sql``` To briefly describe the database structure, the logins table acts as the main table for the database and the authorized_tokens table only is used to store the tokens as you'll see shortly. Before we get to the tokens though, I'll briefly describe how a user gets to added to the logins table. 

I won't be covering any data validation as that would make the post about 100 times longer, but that can easily be added to this method. To avoid storing any plaintext passwords, the passwords are all salted and hashed before being stored, using [bcypt](https://pypi.python.org/pypi/bcrypt/2.0.0). And the package that I use to connect to the MySQL database is MySQLdb. Here's the user add method, and a simple database wrapper class:

```
class DB(object):
    def __init__(self):
        self.database = MySQLdb.connect(host="localhost", user="root", passwd=db_password, db="service", cursorclass = MySQLdb.cursors.DictCursor)
        self.cursor = self.database.cursor()

    def close(self):
        self.database.close()

    def read(self, query):
        self.cursor.execute(query)
        data = self.cursor.fetchall()
        return data

    def write(self, query):
        try:
            self.cursor.execute(query)
            self.database.commit()
            return True
        except Exception as e:
            print e
            return False

class User(object):

    def __init__(self):
        self.db_wrapper = DB()
        
    def add(self, username, unhashed_pass, unhashed_pass_conf):
 	hashed = bcrypt.hashpw(str(unhashed_pass), bcrypt.gensalt())
 	query = "INSERT INTO logins (username, password) VALUES ('{}', '{}')".format(username, hashed)
	rc = self.db_wrapper.write(query)
	return rc
```

Now that we have a simple way to add a user, we need to be able to create a token for them. First, to create the token we need to validate that the user has logged in correctly. To do so, we're going to create a validator class. First, I'll give the class in full, then walk through the couple of methods. It's a little long, but it'll be worth it.

```
class Authentication(object):

    def __init__(self):
        self.db_wrapper = DB()

    def close(self):
        self.db_wrapper.close()

    def generate_token(self, username):
        current_time = time.time()
        token = bcrypt.hashpw(str(username) + str(time.time()), bcrypt.gensalt())
        return token

    def is_authorized(self, username, token):
        user_id = self.get_user_id(username)
        stored_token = self.get_token(user_id)

        if stored_token is None:
            return False
        if stored_token != token:
            return False
        if stored_token == token:
            self.update_token(user_id)
            return True
        return False

    def login(self, username, password):
        user_id = self.get_user_id(username)
        if user_id is None:
            return False

        stored_pass = self.get_hashed_pass(user_id)
        if bcrypt.hashpw(str(password), stored_pass) == stored_pass:
            token = self.get_token(user_id)
            if token is None:
                token = self.generate_token(username)
                self.store_token(user_id, token)
            return True, {'token':token}
        else:
            return False, None

    def logout(self, username):
        user_id = self.get_user_id(username)
        if user_id is None:
            return False
        query = "DELETE FROM authentication_tokens WHERE user_id = {}".format(user_id)
        rc = self.db_wrapper.write(query)
        return rc

    def get_hashed_pass(self, user_id):
        query = "SELECT password FROM logins WHERE id = {}".format(user_id)
        results = self.db_wrapper.read(query)
        if results is None:
            return None
        return results[0]['password']

    def get_token(self, user_id):
        query = "SELECT token FROM authentication_tokens WHERE user_id = {}".format(user_id)
        results = self.db_wrapper.read(query)
        if results is None:
            return None
        try:
            return results[0]['token']
        except:
            return None

    def get_user_id(self, username):
        query = "SELECT id FROM logins WHERE username = '{}'".format(username)
        results = self.db_wrapper.read(query)
        if results is None:
            return None
        return results[0]['id']

    def store_token(self, user_id, token):
        query = "INSERT INTO authentication_tokens (user_id, token) VALUES ({}, '{}')".format(user_id, token)
        rc = self.db_wrapper.write(query)
        return rc

    def update_token(self, user_id):
        query = "UPDATE authentication_tokens SET last_updated_at = NOW() WHERE user_id = {}".format(user_id)
        rc = self.db_wrapper.write(query)
        return rc
```

Okay, like I said it's a lot, and there's a bunch of helper methods that are used to modularize the code, but basically it consists of the is_authorized, login, and logout methods.