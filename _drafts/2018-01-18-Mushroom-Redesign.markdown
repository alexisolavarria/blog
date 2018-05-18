---
layout: default_blog
title:  "Mushroom Redesign"
date:   2018-01-19 12:01:00 -0400
categories: Writing
tags: Design
reading_time: 15 Minutes
card_image: /img/post_images/mushroom_final_phone.png
card_image_credit: Photo by Me
---

While browsing reddit the other day I came upon a [link](https://www.reddit.com/r/learnpython/comments/7q8qka/i_made_a_rough_draft_of_a_flask_app_that_accepts/) to a newer Github repo that someone was working on. That repo was [Mushroom Map Maker](https://github.com/brettvanderwerff/Mushroom-Map-Maker) and now, mushrooms aren't normally my thing, however I always like seeing what others are working on so I thought I would take a look. And functionality was great, the search worked perfectly, and even properly gave errors if the input was missing. The aesthetics of the page however left a little to be desired so I thought I would download it and take a look at what I could do.

The original landing page looked like this:

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_starting_image.png">

So it was obvious that the creater, [brettvanderwerff](https://github.com/brettvanderwerff), was using bootstrap 3 based on the basic jumbotron and navbar. Now, bootstrap 3 is the older version and using bootstrap 4 would be easier, but it shouldn't be too hard. Before I begin, I should point at that the changes to the actual repo were all done inline to not include another file in the repository, but will be represented below as if there were an actual custom css file.

The first change that I made was to indicate the actual page the user was using on the navbar, as to begin with it only ever had the active class on the "Home" link. This was as simple as adding a page variable to the flask routing that returned the name of the page, and did an if statement for each link to add the class if necessary. No other visual changes yet.

The next thing that I did was to actually remove the standard active class, and implement my own version at first just changing the color of the link text. I also opted to make the background color of the navbar white instead of the default grey-ish. Our custom css file would look like so:

```

.active-link {
  color: blue;
}

.navbar-bg {
  background-color: white;
}

```

And the landing page now looked like so:

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_new_navbar.png">

Next, do deal with the actual content of the index page. The content was already within a container, which was good. First I pulled the instructions "Select "Search for a Mushroom" on the navigation bar to begin." onto the main jumbotron. Then, to stop the page from seeming like it was shouting at you, I lowered the title "The Mushroom Map" to be an h2 instead of an h1. I also used the ```<small>``` tag for the version number within that h2 to apply some built in boot-strappy styling. Separating the heading of that content from the body with an ```<hr />``` also gives some breathing room.

Finally, taking after the cards that became popular with Google's Material Design guidelines, I opted to fashion the jumbotron holding the content as a card with a white background with a slight shadow. Our css file now contains:

```

.active-link {
  color: blue;
}

.navbar-bg {
  background-color: white;
}

.card {
  background-color: white;
  box-shadow: 1px 3px 5px 3px rgba(204, 204, 204, 0.3);
}

```

And the landing page now appears like so:

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_card_index.png">

Then to soften up the appearance of the links I opted to change the color to a softer shade of blue. Changing the color of the links to be less in your face may seem like a small change, but I've repeatedly found that by doings so it makes the page appear more friendly and welcoming.

Our custom file is now:

```

.active-link {
  color: blue;
}

.navbar-bg {
  background-color: white;
}

.card {
  background-color: white;
  box-shadow: 1px 3px 5px 3px rgba(204, 204, 204, 0.3);
}

a {
  color: #17a2b8;
}

```

And the landing page now appears like so:

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_link_color.png">

Now switching gears to the actual functionality of the site, the original search page looked like the following:

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_original_search.png">

With the navbar changes that were made before that carried over, and by moving the content into a jumbotron just like before the content now mostly matches the homepage. It's just a matter of cleaning it up. By making those changes, which doesn't require a change to the css file, the page looks like so:

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_card_search.png">

While that form is functional, it would appear better to use the form-groups that bootstrap provides to shape the label and the input. The code to do that is:

```

<div class="form-group">
  <label for="example">Example</label>
  <input class="form-control" name="example" type="text">
</div>

```

And now the page looks like:

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_form_groups.png">


Then, to take advantage of larger screens I moved the examples over to a second column. Once the screen got below the bootstrap's defined medium screen size it then converts to being stacked like how it was. It now appears like so on larger screens:

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_two_column.png">

The original search page did alert the user if they had errors entering when submitting the form, however to make the look of the match the original, I modified them to both be alerts with the danger class. The danger class is a built in Bootstrap element that can be added to most text tags that makes the font color red, and in the case of the alerts also makes the background a lighter shade of red to really emphasize the text. A screenshot of the new change is below:

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_alerts.png">

Next, The example list was modified to be a dictionary list. Like changing the sizes of the card titles, this was done to make the page seem less in your face, while still providing the information. See below for the difference:

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_d_list.png">


And the last major change was to make the search look better by just adding some padding for mobile. While a minor change, the extra space makes the applications interface flow better.

Our custom file is now:

```

.active-link {
  color: blue;
}

.navbar-bg {
  background-color: white;
}

.card {
  background-color: white;
  box-shadow: 1px 3px 5px 3px rgba(204, 204, 204, 0.3);
}

a {
  color: #17a2b8;
}

mobile_padding {
  padding-bottom: 1em;
}

```

And that padding class is applied to the column containing the search form. The final product looks like below, shown in desktop and phone sized screens.

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_final_desk.png">

<img class="rounded img-fluid shadow" src="/img/post_images/mushroom_final_phone.png">

Thanks for reading the whole way through, I hoped it helped anyone that made it this far. As always, feel free to send me an email to the address below with any questions or comments.
