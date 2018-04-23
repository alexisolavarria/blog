---
layout: default_blog
title:  "Programming Pearls, Day Fourteen"
date:   2018-04-23 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Okay, continuing on to day thirteen, the text of the problem is: 

__Given a sequential file containing 4,300,000,000 integers, how can you find
one that appears at least twice?__

My solution, a simple binary search, is below:

{% highlight python %}
#!/usr/local/bin/python

def find_larger_half(nums):
    if len(nums) == 1:
        return nums[0]

    low = nums[0]
    high = nums[len(nums)-1]
    avg = int((high+low)/2)
    if nums[(len(nums)-1)/2] > avg:
        return nums[(len(nums)-1)/2:]
    else:
        return nums[:(len(nums)-1)/2]

nums = []

x = raw_input()
while x != '':
    nums.append(int(x))
    try:
        x = raw_input()
    except:
        break

while type(nums) == list:
    nums = find_larger_half(nums)

print nums
{% endhighlight python %}
