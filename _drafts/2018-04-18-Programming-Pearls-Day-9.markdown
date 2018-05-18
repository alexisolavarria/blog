---
layout: default_blog
title:  "Programming Pearls, Day Nine"
date:   2018-04-17 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Okay, continuing on to day nine, the text of the problem is: 

__One problem with trading more space to use less time is that initializing the
space can itself take a great deal of
time. Show how to circumvent this problem by designing a technique to initialize
an entry of a vector to zero the first time it is accessed. Your scheme should
use constant time for initialization and for each vector access, and use extra
space proportional to the size of the vector. Because this method reduces
initialization time by using even more space, it should be considered only when
space is cheap, time is dear and the vector is sparse.__

So, while trying to keep in the spirit of a bitmap, I came up with the
following. Basically, I converted the bitmap list into an empty dictionary. 
Then I can store the numbers as I access them. This is nowhere near as elegent
as the solution that was posted in the book, however it is my own.

{% highlight python %}
import time

def bitmap_sort():
    numbers = open('numbers.txt', 'r')
    lines = numbers.readlines()

    nums = {}
    for line in lines:
        num = int(line)
        nums[str(num)] = 0

    out = open('out_numbers.txt', 'w')

    for i in range(0, len(nums)):
        if nums[i] == 1:
            out.write(str(i) + '\n')

    numbers.close()
    out.close()

if __name__ == '__main__':
    start = time.clock()
    print 'Start Bitmap: {}'.format(start)
    bitmap_sort()
    end = time.clock()
    print 'End Bitmap: {}'.format(end)
    print 'Total Bitmap: {}'.format(end-start)

{% endhighlight %}
