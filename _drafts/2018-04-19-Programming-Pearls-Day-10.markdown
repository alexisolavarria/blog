---
layout: default_blog
title:  "Programming Pearls, Day Ten"
date:   2018-04-19 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/pearls.jpg
card_image_credit: Photo by Tim Mossholder on Pexels
---

Okay, continuing on to day ten, woo double digits, the text of the problem is: 

__Before the days of low-cost overnight deliveries, a store allowed customers to
order items over the telephone, which they picked up a few days later. The
store's database used the customer's telephone number as the primary key for
retrieval (customers know their phone numbers and the keys are close to unique).
How would you organize the store's database to allow orders to be inserted and
retrieved efficiently?__

My solution is below:

This problem seems to be motivating you to design a database, which really
doesn't require any python code at all, but it does make a nice thought
experiment. So, I would organize the data into customer, order, and product
tables. The customer table would have the phone number as the primary key, and
could store other customer information as desired. 

The order table would have an
order id, a secondary key called customerId that matches to a phone number that
exists in the customer table, another secondary key called itemId that matches
with an id in the items table, and then a field called quantity that would allow
the person to order more than one item. 

Finally, the item table would have an id for each item, a string that matches
the item's name, a number that matches the quantity of items that remain in
inventory, and finally a float column that contains the price of the item.

This way a customer can place as many orders as they want, that can be easily
retrieved, where each order consists of some quantity of one item. Multiple
orders in a day are possible, so a customer can order more than item.
