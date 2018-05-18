---
layout: default_project
title:  "Rest Assured"
date:   2018-01-22 12:00:00 -0500
categories: Projects
tags: Projects
picture: /img/projects/rest_assured.png
public_url: https://www.restassuredhillc.com
public_message: View Site
---

The website for Rest Assured Home Inspections LLC was redesigned to make it more
attractive for users, allowing it's content to be more easily understood, and
flow better among various screen sizes. The previous website had the content,
however it was laid out in lack luster way, and was optimized for desktop while
being almost unusable on mobile.

Straying from my usual design patterns, which closely blend standard bootstrap
elements with the flatter aspects of the material design guidelines by Google, I
chose to keep the site almost entirely native bootstrap, using a darker theme to
align with the original site. The site consists of three main pages: a basic
landing page utilizing rows and columns to layout content, an about page that
contains a manifesto from the company owner, and a page that contains reviews of
the company.

The page was created using the Jekyll static site generating framework, is
hosted on a Centos 7 server being served by the Apache webserver, and is located
behind an Nginx load-balancer also running on a Centos 7 server. The TLS
ertificate for the site is provided by Let's Encrypt, and is also being served
by the Nginx load-balancer. The repo for the site can be found my personal
Gitlab, [here](http://gitlab.doug-skinner.com/root/restassured).
