---
layout: default_blog
title:  "Building a Shell, Part 5"
date:   2017-12-06 14:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/shell.jpg
card_image_credit: Photo by Clever Visuals on Unsplash
---
Today we're going to be adding the first of our more complex functions to our
shell, create. This command will be used to create files, directories, and both
hard and soft links. The file permissions will be 0640 for the files and 0750
for the directories. The code mostly relies upon using a few system calls that
makes this functionality easy to implement, and looks like this:

```
#include "error.h"
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "There needs to be at least three command line args. Run create --help for more\n");
        return -1;
    }

    if (strcmp("-f", argv[1]) == 0) {
        // Make sure the string is nul terminated
        argv[2][strlen(argv[2])-1] = 0;
        GUARD(creat(argv[2], 0640));
    }
    else if (strcmp("-d", argv[1]) == 0) {
        // Make sure the string is nul terminated
        argv[2][strlen(argv[2])-1] = 0;
        GUARD(mkdir(argv[2], 0750));
    }
    else if (strcmp("-h", argv[1]) == 0) {
        if (argc < 3) {
            fprintf(stderr, "There needs to be at least four command line args to create links");
        }
        // Make sure the string is nul terminated
        argv[2][strlen(argv[2])-1] = 0;
        argv[3][strlen(argv[3])-1] = 0;
        GUARD(link(argv[2], argv[3]));
    }
    else if (strcmp("-s", argv[1]) == 0) {
        if (argc < 3) {
            fprintf(stderr, "There needs to be at least four command line args to create links");
        }
        argv[2][strlen(argv[2])-1] = 0;
        argv[3][strlen(argv[3])-1] = 0;
        GUARD(symlink(argv[3], argv[3]));
    }
    else if (strcmp("--help", argv[1]) == 0) {
        puts("The options to call this command are as follows:");
        puts("\tcreate -f filename\t creates a new file");
        puts("\tcreate -d directory\t creates a new directory");
        puts("\tcreate -h old_file new_file\t create a hard link");
        puts("\tcreate -s old_file new_file\t create a soft link");
    }
    else {
        fprintf(stderr, "The flags entered were not valid\n");
        return -1;
    }

    return 0;
}

```
Adding this functionality is relatively simple following the example function
that we gave yesterday, and just consists of adding another string comparison to
see if if matches the `create` function. Then we just get the required
arguments, and pass it using `execl` again.

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
                if (strcmp(buff, "echo") == 0) {
                    execl("/bin/echo", "echo", "Hello World!", NULL);
                    return 1;
                } else if (strcmp(buff, "create") == 0) {
                      char *flag = strtok(NULL, " ");
                      char *op1 = strtok(NULL, " ");
                      char *op2  = strtok(NULL, " ");
                      execl("./create", "create", flag, op1, op2, NULL);
                      return -1;
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
