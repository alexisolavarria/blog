---
layout: default_blog
title:  "# of Users Logged In"
date:   2017-09-15 12:00:00 -0400
categories: Writing
tags: Development
reading_time: <1 Minute
card_image: /img/post_images/quick_tip.jpg
card_image_credit: Photo by James Pond on Unsplash
---

While going through the Unix Systems Programming book, one of the preface
questions asked to devise a one line command to list the number of users
currently logged in to my system. Here's how to do that.

My first instict was to go to the man pages, and then quickly found out that
the man pages don't really help if you don't know the name of the program you're
looking at. So I then looked in my /bin/ directory, which contained about 25
various system utilities.

However nothing in there looked useful. I then checked in the /usr/bin directory,
which contained something called `users`. Now, we might be getting somewhere.
Looking at the [man page](https://linux.die.net/man/1/users) for the command, it
looks like this is exactly what we want. So we simply need to run a command like
so: `users | wc -w` which counts the number of words that are output by the
users command, where each word is the name of a logged in user. Problem solved.
