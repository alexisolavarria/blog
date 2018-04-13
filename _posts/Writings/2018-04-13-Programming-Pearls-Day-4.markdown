---
layout: default_blog
title:  "Programming Pearls, Day Four"
date:   2018-04-13 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Okay, continuing on to day four, the text of the problem is: 

__If you take Problem 3 seriously, you will face the problem of generating k
integers less than n without duplicates. The simplest approach uses the first c
positive integers. This extreme data set won't alter the run time of the bitmap
method by much, but it might skew the run time of a system sort. How could you
generate a file of k unique random integers between 0 and n-1 in random order?
Strive for a short program that is also efficient.__

My solution is below, and it generates the 1,000,000 numbers in roughly a second:

{% highlight python %}
import random
import time

def generate_random_nums():
    nums = []
    _max = 1000000
    nums = random.sample(range(0, _max*10), _max)

    return nums

if __name__ == '__main__':
    print 'start: {}'.format(time.clock())
    generate_random_nums()
    print 'end: {}'.format(time.clock())
{% endhighlight %}
