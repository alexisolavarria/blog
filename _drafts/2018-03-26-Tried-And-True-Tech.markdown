---
layout: default_blog
title:  "Tried And True Technologies"
date:   2018-03-26 12:00:00 -0400
categories: Writing
tags: Thoughts
reading_time: 5 Minutes
card_image: /img/post_images/simple.jpg
card_image_credit: Photo by Grovemade on Unsplash
---

Among the many things I've learned through watching and listening to others in the software development industry, one major thing is the concept of using tried and true technologies. You may be asking yourself what that means. It means specifically using technologies that plenty of other companies use. [Marco Arment](https://marco.org) has said it well many times that you never want to be the biggest user of a technology. The two major reasons for this are related. 

First, if you are the largest user of a technology you're going to run into issues when trying to scale the software past a certain point. Along with that, if you're the only company on that scale of use for a technology then it is most likely up to you to fix it. Instead of working on improving your product, suddenly you're spending most of your time just ensuring that your newer technology stack doesn't fall over.

Now, that doesn't mean that you have to only write programs for COBAL mainframes, but if you go to start a new project that will most likely get successful and none of the technologies that you plan on using have been around for over a year at minimum, well... Good luck. This post may come along as old fashioned, but I really do believe that you want the big issues to be someone else's problem. 

Basically, most projects involve some type of frontend, some sort of backend with baked in business logic, and some sort of datastore. The frontend could be either a website, mobile app, or desktop software. Since I normally work with websites, I'll focus on that. With websites, you normally want to use a a javascript framework that has been around for a while to avoid lots of issues that can crop up. You'll also want to avoid using any newer CSS features to ensure cross-browser compatibility.

Getting to the backend, you probably want to ensure that the language and web framework you're using has been used before. Common bases are Flask and Django in Python, Ruby on Rails, and Laravel in PHP. Again, nothing exciting, however you don't always want exciting. I don't know about you, but I would much rather have a stable technology than a buggy or changing technology.

Finally, on the datastore. In my opinion, if you are using anything other than MySQL you better have a reason that you can back up with facts not blog posts. MySQL has been around practically forever, and is mostly scalable. It has Master-Slave replication built in, which allows scaling up to a point rather easily. Honestly, I recommend starting with MySQL in such a setup. Once your company gets to the point where that is no longer viable, you can simply higher someone to solve the problem for you. So don't make it a problem when there shouldn't be one.