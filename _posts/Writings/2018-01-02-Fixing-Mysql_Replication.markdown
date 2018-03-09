---
layout: default_blog
title:  "Fixing Mysql Replication"
date:   2018-01-02 12:00:00 -0400
categories: Writing
tags: Development
reading_time: <1 Minute
card_image: /img/post_images/quick_tip.jpg
card_image_credit: Photo by James Pond on Unsplash
---

Quick one. If you have a master and slave MySQL setup, if the slaves are
reporting replication failures BUT have a status that is simply waiting for the
next command, simply restarting MySQl should fix the issue. Sometimes a simple
restart is the answer.
