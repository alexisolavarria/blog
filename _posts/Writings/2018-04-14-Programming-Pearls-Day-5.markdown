---
layout: default_blog
title:  "Programming Pearls, Day Five"
date:   2018-04-14 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Okay, continuing on to day five, the text of the problem is: 

__The programmer said that he had about a megabyte of free storage, but the code
we sketched uses 1.25 megabytes. He was able to scrounge the extra space without
much trouble. If the megabyte had been a hard and fast boundary, what would you
have recommended? What is the run time of your algorithm?__

Since the book was originally designed for C programming, and written in the 90s
where space constraints were more realistic, this was a challenge back then.
Nowadays, my python implementations almost certainly take up more memory than
that just due to the language overhead. However, if I wanted to make it space
constrained, the easiest to do that is a two pass algorithm

My solution is below:

{% highlight python %}
import time

def space_constrain():
    fp_in = open('numbers.txt', 'r')
    fp_out = open('out_numbers.txt', 'w')

    #set working array
    working = []
    for i in range(0, 500000):
        working.append(0)

    #First we read in only the numbers 0-500,000
    x = int(fp_in.readline())
    while x != '':
        if x < 500000:
            working[x] = 1
        x_str = fp_in.readline()
        if x_str == '':
            x = x_str
        else:
            x = int(x_str)

    # numbers 0 - 500,000 have now been sorted, write to output file
    for i in range(len(working)):
        if i != 0:
            fp_out.write(str(i) + '\n')

    # reset the working array
    for i in range(len(working)):
        working[i] = 0

    # Next we read in only the numbers > 500,000
    fp_in.seek(0)
    x = int(fp_in.readline())
    while x != '':
        if x > 500000:
            working[x - 500000] = 1
        x_str = fp_in.readline()
        if x_str == '':
            x = x_str
        else:
            x = int(x_str)

    # numbers > 500,000 have now been sorted, write to output file
    for i in range(len(working)):
        if i != 0:
            fp_out.write(str(i + 500000) + '\n')

    fp_in.close()
    fp_out.close()

if __name__ == '__main__':
    print 'start: {}'.format(time.clock())
    space_constrain()
    print 'end: {}'.format(time.clock())

{% endhighlight %}

