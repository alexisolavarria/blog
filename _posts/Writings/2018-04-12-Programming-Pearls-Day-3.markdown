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

Okay, continuing on to day three, the text of the problem is: 

__Run-time efficiency was an important part of the design goal,
and the resulting program was efficient enough. Implement the bitmap sort on
your system and measure its run time; how does it compare to the system sort and
to the sorts in Problem 1? Assume that n is 10,000,000, and that the input file
contains 1,000,000 integers.__

My solution is below, with thoughts below that:

{% highlight python %}
import time

def load_file():
    numbers = open('numbers.txt', 'w')

    for i in range(0, 1000000):
        numbers.write(str(i) + '\n')

    numbers.close()

def bitmap_sort():
    numbers = open('numbers.txt', 'r')
    lines = numbers.readlines()

    nums = []
    for i in range(0, 1000000):
        nums.append(0)
    
    for line in lines:
        nums[int(line)] = 1

    out = open('out_numbers.txt', 'w')

    for i in range(0, len(nums)):
        if nums[i] == 1:
            out.write(str(i) + '\n')

    numbers.close()
    out.close()

def systemsearch():
    numbers = open('numbers.txt', 'r')
    lines = numbers.readlines()

    nums = []
    for i in range(0, 1000000):
        nums.append(0)
    
    for line in lines:
        nums[int(line)] = int(line)

    output = sorted(nums)

    out = open('out_numbers.txt', 'w')

    for i in range(0, len(nums)):
        out.write(str(nums[i]) + '\n')

    numbers.close()
    out.close()

if __name__ == '__main__':
    print 'Start Load: {}'.format(time.clock())
    load_file()
    print 'End Load: {}'.format(time.clock())
    start = time.clock()
    print 'Start Bitmap: {}'.format(start)
    bitmap_sort()
    end = time.clock()
    print 'End Bitmap: {}'.format(end)
    print 'Total Bitmap: {}'.format(end-start)
    start = time.clock()
    print 'Start System: {}'.format(start)
    systemsearch()
    end = time.clock()
    print 'End System: {}'.format(end)
    print 'Total System: {}'.format(end-start)

{% endhighlight %}

And the total times when I ran it was:

{% highlight bash %}
Start Load: 0.03412
End Load: 0.532496
Start Bitmap: 0.532556
End Bitmap: 1.865156
Total Bitmap: 1.3326
Start System: 1.865202
End System: 3.826109
Total System: 1.960907
{% endhighlight %}

So, while it may not matter in the long run, the bitmap sort runs in 30% less time so it can be beneficial
