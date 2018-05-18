---
layout: default_blog
title:  "Programming Pearls, Day Seven"
date:   2018-04-16 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Okay, continuing on to day seven, the text of the problem is: 

__The program as sketched has several flaws. The first is that it assumes that
no integer appears twice in the input. What happens if one does show up more
than once? How could the program be modified to call an error function in that
case? What happens when an input integer is less than zero or greater than or
equal to n? What if an input is not numeric? What should a program do under
those circumstances? What other sanity checks could the program incorporate?
Describe small data sets that test the program, including its proper handling of
these and other ill-behaved cases.__

So, in these cases the best possible option for the continuation of the program
is for it to log, in this case to standard output, that an improper input was
given and what the input was. As this is simply one piece in a large and complex
structure, outright failing would be devestating to the business processes that
follow the sort.

My solution is below:

{% highlight python %}
import time

error_string = 'Found an invalid input'

def bitmap_sort():
    numbers = open('numbers.txt', 'r')
    lines = numbers.readlines()

    nums = []
    for i in range(0, 1000000):
        nums.append(0)
    
    for line in lines:
        try:
            num = int(line)
        except:
            print '{} (Conversion error) {}'.format(error_string, line)
            pass
        if num < 0:
            print '{} (Less than zero) {}'.format(error_string, num)
            pass
        if num >= 1000000:
            print '{} (Greater than 1000000) {}'.format(error_string, num)
            pass
        if nums[num] == 1:
            print '{} (Duplicate number) {}'.format(error_string, num)
            pass

        nums[int(line)] = 1

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
