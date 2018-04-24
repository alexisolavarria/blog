---
layout: default_blog
title:  "Programming Pearls, Day Fifteen"
date:   2018-04-24 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Okay, continuing on to day fifteen, the text of the problem is: 

__We skimmed two vector rotation algorithms that require subtle code;
implement each as a program. How does the greatest common divisor of
i and n appear in each program?__

My solution is below:

{% highlight python %}
#The first algorithm, simplified with python syntax
#!/usr/local/bin/python

#in_word = raw_input()
in_word = 'abcdefgh'
word = []

for j in in_word:
    word.append(j)

i = 3 # for example purposes
step = i

while i > 0:
    word = word[1:] + word[:1]
    i -= 1

print word

# For the second algorithm
#!/usr/local/bin/python

def swap(word, index):
    # base case
    if len(word) < index:
        return word

    a = word[:index]
    b = word[index:]
    bl = []
    br = []
    
    for i in range(len(b)-1, -1, -1):
        if i < len(a):
            br.insert(0, b[i])
        else:
            bl.insert(0, b[i])

    return br + swap(bl, index) + a

in_word = raw_input()
word = []

for letter in in_word:
    word.append(letter)

print swap(word, 3)

{% endhighlight python %}
