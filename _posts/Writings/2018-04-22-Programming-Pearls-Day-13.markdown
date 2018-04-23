---
layout: default_blog
title:  "Programming Pearls, Day Thirteen"
date:   2018-04-22 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Okay, continuing on to day thirteen, the text of the problem is: 

__Consider the problem of finding all anagrams of a given input word. How would you solve this problem given only the input workd and the dictionary? What if you could spend some time and space to process the dictionary before answering any queries?__

My solution is below:

{% highlight python %}
#!/usr/local/bin/python

word = raw_input()
sorted_word = sorted(word)

dictionary_lines = open('lowercase_dictionary.txt', 'r').readlines()

for line in dictionary_lines:
    sorted_line = sorted(str(line).replace('\n',''))
    if sorted_word == sorted_line:
        print str(line.replace('\n', ''))
{% endhighlight python %}
