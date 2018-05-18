---
layout: default_blog
title:  "Programming Pearls, Day Eight"
date:   2018-04-17 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Okay, continuing on to day eight, the text of the problem is: 

__When the programmer faced the problem, all toll-free phone numbers in the
United States had the 800 area code. Toll-free codes now include 800, 877 and
888, and the list is growing. How would you sort all of the toll-free numbers
using only a megabyte? How can you store a set of toll-free numbers to allow
very rapid lookup to determine whether a given toll-free number is available or
already taken?__

So, the easiest way that I can think of to do this is to use a hash table where
the last seven didits of the phone number are used as the key for the table.
But, instead of simply storing a 1 or 0 based on whether the number exists, a
secondary hash, easy to do in python, where the key for the second hash table is
the area code of the number.

My solution is below:

{% highlight python %}
import time

def bitmap_sort():
    numbers = open('numbers.txt', 'r')
    lines = numbers.readlines()

    nums = []
    for i in range(0, 1000000):
        temp = {'800' : 0, '877' : 0, '888' : 0}
        nums.append(temp)
    
    for line in lines:
        num = str(int(line))
        area = num[:3]
        number = num[3:]
        nums[number][area] = 1

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
