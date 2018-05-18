---
layout: default_blog
title:  "Replacing Characters Within Smarty Templating"
date:   2018-01-18 12:00:00 -0400
categories: Writing
tags: Development
reading_time: <1 Minute
card_image: /img/post_images/quick_tip.jpg
card_image_credit: Photo by James Pond on Unsplash
---

Another quick one, while at work today needed to strip a few characters out of a
string, namely [ and ] as they were causing issues with some other string
manipulation further down the line. All I had to do was turn this:

```
<{variable}>
```

Into this:

```
<{variable|replace:"[":""|replace:"]":""}>
```

Easy enough, right?
