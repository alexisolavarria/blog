---
layout: default_blog
title:  "Programming Pearls, Day Six"
date:   2018-04-15 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Okay, continuing on to day six, the text of the problem is: 

__What would you recommend to the programmer if, instead of saying that each
integer could appear at most once, he told you that each integer could appear at
most ten times? How would your solution change as a function of the amount of
available storage?__

So, working with numbers that can show up multiple times, the easiest solution
is a hash table. To store the working numbers in under a Mb, the algorithm will
turn into a 20 pass algo, working in increments of fifty thousand, and with each
element of the original working bit array being converted into a 10 bit array
itself.

My solution is below: 

{% highlight python %}
import time

def generate_empty_array():
    working = []
    for i in range(0, 50000):
        temp = []
        working.append(temp)
    return working

def read_in_specific(start, stop, working):
    fp_in = open('numbers.txt', 'r')

    x = int(fp_in.readline())
    while x != '':
        if x >= start and x < stop:
            working[x - start].append(1)
        x_str = fp_in.readline()
        if x_str == '':
            x = x_str
        else:
            x = int(x_str)
    
    fp_in.close()
    return working

def write_out(offset, working, fp_out):
    for i in range(len(working)):
        for j in range(len(working[i])):
            fp_out.write(str(offset + i) + '\n')


def space_constrain_with_mult():
    fp_out = open('out_numbers.txt', 'w')
    pass_list = [0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000]

    for i in range(len(pass_list) - 1):
        working = generate_empty_array()
        working = read_in_specific(pass_list[i], pass_list[i+1], working)
        write_out(pass_list[i], working, fp_out)

    fp_out.close()

if __name__ == '__main__':
    print 'start: {}'.format(time.clock())
    space_constrain_with_mult()
    print 'end: {}'.format(time.clock())

{% endhighlight %}

