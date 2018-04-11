---
layout: default_blog
title:  "Programming Pearls, Day Two"
date:   2018-04-11 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---
Contuinuing my journey, here's the problem for the day: _How would you implement bit vectors using bitwise logical operations?_


So, here's my solution to the problem, which works wonderfully:

{% highlight python %}

def bitwise_shift_left(x):
    return x << 1

def bitwise_shift_right(x):
    return x >> 1

def bitwise_and(x, y):
    return x & y

def bitwise_or(x, y):
    return x | y

{% endhighlight %}
