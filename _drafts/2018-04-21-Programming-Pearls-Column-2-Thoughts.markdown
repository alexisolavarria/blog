---
layout: default_blog
title:  "Programming Pearls, Column Two Thoughts"
date:   2018-04-21 12:01:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

After reading through column two, I have learned a few things about applications
of binary search and also how sorting can be used. My original solution to the
third problem presented within the column, not the third problem set problem,
was roughly half right. I did want to sort a copy of each word by its letter,
like I said I was half right. Then, however I wanted to process in each sorted
word into a hashed array where the key was the sorted word and the value was an
array of each word that matched the key. 

This would have worked just fine, but did involve significantly more memory
overhead than sorting the words based on their hashes, so the author did beat me
there. His solution to that problem also pointed out something that I should
have considered while going through the first column's problemset. All of his
functions are stand alone programs that read in from standard in and output to
standard out. This allows him to chain together functions while also using the
functions in the future if he should ever need to. From now on, all of my
solutions will do the same thing. I should wind up with a nice varied toolset by
the time I'm done with the book.
