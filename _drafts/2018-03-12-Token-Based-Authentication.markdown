---
layout: default_blog
title:  "Token Based Authentication"
date:   2018-03-12 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/token.jpeg
card_image_credit: Photo by Markus Spiske from Pexels 
---

For the service that I'm writing, one of the main things that I'm focusing on is the user experience. I want the user to have a good time that's frustration free throughout using the app. One of those concerns that I've thought about is the login experience, and more importantly how to have someone remain logged in while still being secure.

The way that I went is to implement a token based authentication system. The user will log in and then their browser will be handed a token. With that token, the user has access to do all of their tasks within the application. Originally the token expiration date was a hard limit set at 24 hours after token creation. However I quickly noticed that this could be in issue. 

Say for instance that you normally log on to use my service after getting home from work for the day. And say this means that you normally log in around 6pm. So your token is then set to expire at 6pm tomorrow. Now say that you get home a little early the next day and log in at 5:50pm. Great, you think, because you're already logged in. However, while doing your tasks you then notice that on your first action after 6pm you are suddenly logged out and asked to log back in even though you were just using the service. That seems quite annoying and frustrating right? Well, the simple way to solve this that I saw was to create a soft expiration of 24 hours after last action. What this means is that I make a simple additional database call every time the user completes and action to update the creation date of the key. 

While this does mean that the token could theoretically never expire, that risk is worth it to provide a better experience to the users. And if you run your own service, I think that you would agree.