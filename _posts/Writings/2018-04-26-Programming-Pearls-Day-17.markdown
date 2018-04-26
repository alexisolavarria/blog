---
layout: default_blog
title:  "Programming Pearls, Day Seventeen"
date:   2018-04-26 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Okay, continuing on to day seventeen, the text of the problem is: 

__Vector rotation functions change the vector ab to ba; how would you transform
the vector abc to cba?__

My solution is below:

{% highlight python %}
#!/usr/local/bin/python

def swap(vector, a, b):
    temp = vector[a]
    vector[a] = vector[b]
    vector[b] = temp
    return vector

start_vector = ['a', 'b', 'c']
print 'start vector: {}'.format(start_vector)

working_vector = swap(start_vector, 0, 1)
working_vector = swap(working_vector, 1, 2)
working_vector = swap(working_vector, 0, 1)

print 'end vector: {}'.format(working_vector)
{% endhighlight python %}
