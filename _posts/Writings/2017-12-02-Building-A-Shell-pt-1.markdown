---
layout: default_blog
title:  "Building a Shell, Part 1"
date:   2017-12-02 14:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/shell.jpg
card_image_credit: Photo by Clever Visuals on Unsplash
---

This series of posts will walk through the basics of building a shell, based on
bash, in the C programming language. This is the final project for a systems
programming class that I am taking at UAlbany, and I think tracking my progress here will
be beneficial for me to look back on later. This can also serve as a guide for
fellow albany students that have to do the same thing in the future.

To start out, the first major thing that a shell does is read in input from the
user, in order to parse it to make commands. So, the first thing that we're
going to do is write a function to read in a line from standard input, stopping
at the first newline encountered. An example of a function that does this could
be the following:

```
char *getLine(FILE* stream) {
    char *line;
    line = malloc(sizeof(char) * 256); // 256 being a decent size for an input string
    char *buff;
    buff = malloc(sizeof(char) * 1);
    int index = 0;

    while (fgets(buff, 2, stream) != NULL) {
        if (*buff == '\n') {
            line[index] = *buff;
            break;
        } else {
            line[index] = *buff;
            index++;
        }
    }

    return line;
}
```

Then continuing on with the rest of the shell, we need a basic function that
loops through, getting input and doing something with it. This could be a
function as follows:

```
int loop(void) {

    while (1) {
        // Prompt the user for input with your shell
        printf("[my_shell]$ ");

        char *line;
        line = malloc(sizeof(char) * 256); // 256 being the size we declared in the other function

        line = getLine(stdin);

        puts(line);
    }

    return 0;
}
```

The above function would currently loop forever, simply prompting for input and
printing that same input back to the user. Tomorrow during the next section of
this series, we'll cover the fact that all of the commands in a shell are run in
a background process, and how to actually do that.
