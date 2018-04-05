---
layout: default_blog
title:  "Adding Custom Search To Your Site"
date:   2018-04-05 12:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/cryptography.jpg
card_image_credit: Photo by Markus Spiske on Unsplash
---

So this week I decided to add a search form to my writings page, as I was getting pretty tired of scrolling through all of my posts to find certain things, and I thought that it would be interesting to share. To make the following work on your own site, it will be easiest if you are using the same technologies that I am Bootstrap, JQuery, and Jekyll. The instructions can be modified for other tech, but that's something that you'll have to figure out.

To start, we need to first add a search form. The code that does this, ripped straight from my site, is the following:

{% highlight html linenos %}
<div class="search">
  <form>
     <div class="row">
       <div class="col-9">
         <input id="search-box" type="text" class="form-control" placeholder="Search Term Here">
	    </div>
        <div class="col-3">
	    <button class="btn btn-outline-success" type="button">Search</button>
	    </div>
      </div>
    </form>
  </div>
{% endhighlight %}

Notice that the button has a type of button, which means that it does not work to submit the form. In all honesty, the button is useless but makes the search bar look better in my opinion. Next we have the css to just add some padding to our search bar:

{% highlight css %}
.search {
  padding-bottom: 1em;
  padding-right: 1em;
}
{% endhighlight %}

Very simple, but helps keep the search bar from touching either the edge of the browser on mobile or the top of the first post. The next bit is two parts inside your listing of all posts. The first is to add a class to each card, in my case ```.text-to-search```, and then having the following snippet somewhere in the card:

{% highlight html %}
<div hidden>
  {.{ post.content }} // Without the dot, but otherwise Jekyll eats it from my post
</div>
{% endhighlight %}

That puts all of the text inside the card so that we can grab it to search in our javascript. Speaking of which, here that is:

{% highlight javascript %}
$("#search-box").on('keyup', function(e) {
  var content = $(this).val();
	var text_to_search = document.getElementsByClassName('text-to-search');

	$(text_to_search).each(function(index, val) {
  	$(text_to_search[index]).show();
		if ($(text_to_search[index]).html().toLowerCase().indexOf(content.toLowerCase()) == -1) {
			$(text_to_search[index]).hide();
		}
	})
});
{% endhighlight %}

Basically this grabs all the divs with our class name and the text in the search box, shows all the posts with our ```.post``` tag. Then, looping through our list of posts it checks the contents of the post for the text in our search box, and hides the post if it is not found.

And there you have it, a nice simple search to implement for a jekyll based site.
