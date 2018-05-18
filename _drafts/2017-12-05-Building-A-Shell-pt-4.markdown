---
layout: default_blog
title:  "Building a Shell, Part 4"
date:   2017-12-05 14:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/shell.jpg
card_image_credit: Photo by Clever Visuals on Unsplash
---

Now, we're going to focus on how we would add more complex functions to the
shell. While you can simply keep declaring them as singular functions, when the
built in functionality gets more complex, think listing all files in a
directory, it becomes easier to break each piece of functionality out into it's
own .c file, compile it as part of the build process, and then execute it from
our shell.

Executing these functions is the perfect use of our child processes, as you
don't want to clog up the main process performing complex work. The way that you
can execute arbitrary commands from within our shell is through the [exec
family](http://www.geeksforgeeks.org/exec-family-of-functions-in-c/) of
functions. While that link goes into further detail about the various options,
the one that we'll be focusing on is the following:

```c
int execl(const char *path, const char *arg0, ... /*, (char *)0 */);

// An example of this command
execl("path to command", "command name", "arg1", "arg2", ... , NULL);

// And an actual example
execl("/bin/echo", "echo", "Hello World!", NULL);
```

If we actually ran the code above, our shell would launch the echo command in
the background, pass in the two command line args, in this case the name of the
program and what we want to be echoe'd, and then it would process. In this case
the output would be the string Hello World! While this may seem like a trivial
example, it is in fact very powerful as it allows us to add pretty much any
functions that we want. We'll dive into a few of those functions tomorrow, but
for now I'll just add the echo command to our shell. I'll also add an error
string if the entered command doesn't exist.

```c
int main(void) {
    int _continue = 0;
    char *buff = malloc(sizeof(char) * 512);

    do {
        printf("[Command prompt]$ ");
        buff = getLine(stdin); // uses the getLine from yesterdays post.

        char *token;
        token = strtok(buff, " \n");

        if (strcmp(token, "quit") == 0) {
            _continue = -1;
        } else if (strcmp(token, "wd") == 0) {
			wd();
		} else if (strcmp(token, "chwd") == 0) {
			char *new_path;
            new_path = strtok(NULL, " \n");
            chwd(new_path);
		} else {
            pid_t child, wait;
            int child_status;

            child = fork();

            if (child == 0) {
                if (strcmp(buff, "echo") == 0) {
                    execl("/bin/echo", "echo", "Hello World!", NULL);
                    return 1;
                } else {
                    printf("The command you entered does not exist.\n");
                    return 1;
                }
            } else {
                do {
                    wait = waitpid(child, &child_status, WUNTRACED);
                } while (!WIFEXITED(child_status) && !WIFSIGNALED(child_status));
            }
        }
        free(buff);
    } while (_continue >= 0);

    return 0;
}
```
