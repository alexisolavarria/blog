---
layout: default_blog
title:  "Quick Tip - Remote Database Access in Apache"
date:   2018-02-23 12:00:00 -0400
categories: Writing
tags: Development
---

While working on my current project I ran into an issue where I was trying to access a database on a remote server within the API that I'm building. While I could access the database from the mysql command line tool, I could not access it within my web application. Finally after lots of searching it appears that the issue was actually a security setting within selinux. To turn this bit of security off just type the below and you'll be on your way.

```setsebool httpd_can_network_connect_db on && setsebool -P httpd_can_network_connect_db on```