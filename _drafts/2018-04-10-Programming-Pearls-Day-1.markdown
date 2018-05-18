---
layout: default_blog
title:  "Programming Pearls, Day One"
date:   2018-04-10 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Today starts a journey, that if completed will take quite a long time. At the
end of it, I hope to be a better programmer through hours of thinking, reading,
and programming. The pathway of this journey is that of the book Programming
Pearls, with one small caveat. I will be doing all of the code in Python, to
help myself work towards becoming a better python programmer. 

Each day I will be doing one problem from the book. Some are easier than others,
but even the easiest will still take at least half an hour. So, to get on to it,
the text of the first problem is as follow:

_If memory were not scarce, how would you implement a sort in a language with
libraries for representing and sorting sets?_

For a bit of context, the original problem was that of sorting roughly a million
numbers in a space where memory was extremely limited, and execution time was
critical. The author eventually reached the conclusion that representing the
input numbers as a bitmap was the best way to do so, and these questions are
extensions of that problem.

So, here's my solution to the problem, which works wonderfully:

{% highlight python %}
import time

def sort_tel_numbers():
    numbers_file = open('numbers.txt', 'r')
    lines = numbers_file.readlines()
    in_nums = []
    output = []

    # each line only contains one seven digit number, per the column
    for line in lines:
        in_nums.append(int(line))

    output = sorted(in_nums)

    output_file = open('out_numbers.txt', 'w')

    for num in output:
        output_file.write(str(num) + '\n')

if __name__ == '__main__':
    print 'start time {}'.format(time.clock())
    sort_tel_numbers()
    print 'end time {}'.format(time.clock())
{% endhighlight %}
