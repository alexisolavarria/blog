---
layout: default_blog
title:  "Programming Pearls, Day Three"
date:   2018-04-12 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

So, while attempting problem three, which involves timing my implementation
versus the system implementation to sort arrays and the bitmap sorting I
realized that doing this project in python may not be the best idea. The reason
for this is that because python is very high level, doing excessive operations
can be very slow.

The operation that I am doing is the following:

{% highlight python %}
for i in range(0, 1000000):
    # do the thing
{% endhighlight %}

Apparently, python does NOT optimize this very well. While the same operation in
C takes roughly a second, in python it takes multiple minutes to process. While
researching online, this is because of the optimizations that Python CANNOT make
due to being interpreted rather than being compiled. I still want to do this
entire project in python however, so I will continue doing this.

To make matters easier though, I will be utilizing the fact that Python can
import modules from C. So I will be writing any intensive looping code within C,
and simply calling the C modules from Python. I think this will be a valuable
excercise, and I'll update this whenever that gets done. Probably not tonight,
but most likely tomorrow.
