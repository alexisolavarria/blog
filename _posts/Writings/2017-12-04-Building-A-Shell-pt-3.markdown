---
layout: default_blog
title:  "Building a Shell, Part 3"
date:   2017-12-04 14:00:00 -0400
categories: Writing
tags: Development
---

Next, we'll add a few built in functions to the shell. Our shell will support
printing the current directory, changing the current directory, and quitting as
built in commands. We'll also be giving the shell the ability to run some
external commands in the next section of this series. The code for each of these
commands is simple, and the quit command was already included last time. So, the
code for printing the current directory:

```
int wd(void) {
    char *current_dir;
    allocateStr(&current_dir);
    GUARD_PTR(getcwd(current_dir, MAX_STR));
    puts(current_dir);
    return 0;
}
```

And the code for changing the directory:

```
int chwd(char *new_path) {
    if (new_path == NULL) {
        printf("The proper usage of %s is %s.\n", "chwd", "chwd pathname");
    } else {
        GUARD(chdir(new_path));
    }
    return 0;
}
```

The functions will then be added to the shell like so:

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

These functions give our shell the beginning of usefullness, and will be
expanded upon tomorrow.
