---
layout: default_blog
title:  "Building a Shell, Part 2"
date:   2017-12-03 14:00:00 -0400
categories: Writing
tags: Development
---

This is the second section in a series of posts walking through the steps I took
to make a basic shell for a final project for a systems programming class. The
only thing that we'll be adding to the
shell today is probably the most important aspect of the shell, the fact that
all of the actions that it does are run in background processes, and the main or
parent process only is responsible for getting input, passing it to the process,
and then getting whatever the process returns. In C, processes are created
through the [fork](https://linux.die.net/man/2/fork) system call, and contain an exact
copy of the parent processes memory. This is unfortunately not the place to go
into in depth detail of processes, and that will occur a different day. For now,
an example that runs the printing of the input in a child process, and gets the
input in a parent process would look like so:

```
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
        } else {
            pid_t child, wait;
            int child_status;

            child = fork();

            if (child == 0) {
                puts(buff);
                return 1;
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
