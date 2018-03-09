---
layout: default_blog
title:  "Building a Shell, Part 6"
date:   2017-12-07 14:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/shell.jpg
card_image_credit: Photo by Clever Visuals on Unsplash
---
Today we're going to be adding the second of our more complex functions to our
shell, list. This command will be a simplistic version of the ls command. The code mostly relies upon using a few system calls that
makes this functionality easy to implement, and looks like this:

```
#include <dirent.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    char *flag;
    char *pathname;

    if (argc == 1) {
        flag = NULL;
        pathname = ".";
    } else if (argc == 2) {

        char *token = argv[1];
        if (strcmp(token, "-i") == 0  || strcmp(token, "-h") == 0) {
            flag = argv[1];
            pathname = ".";
        } else if (strcmp(token, "-i\n") == 0 || strcmp(token, "-h\n") == 0) {
            argv[1][strlen(argv[1])-1] = 0;
            flag = argv[1];
            pathname = ".";
        } else {
            argv[1][strlen(argv[1])] = 0;
            flag = NULL;
            pathname = argv[1];
        }
    } else if (argc == 3) {
        flag = argv[1];
        argv[2][strlen(argv[2])-1] = 0;
        pathname = argv[2];
    } else {
        fprintf(stderr, "Too many command line args specified. Run list --help for more");
        return -1;
    }

    if (flag == NULL) {
        //list current dir
        DIR *d;
        struct dirent *dir;
        d = opendir(pathname);
        if (d) {
            while ((dir = readdir(d)) != NULL) {
                if (dir->d_name[0] != '.') {
                    printf("Filename: %s \n", dir->d_name);
                }
            }
            closedir(d);
        }
        return(0);
    } else if (strcmp(flag, "-i") == 0) {
        DIR *d;
        struct dirent *dir;
        struct stat buf;
        int stats;
        d = opendir(pathname);
        if (d) {
            while ((dir = readdir(d)) != NULL) {
                stat(dir->d_name, &buf);
                stats = buf.st_mode  & (S_IRWXU | S_IRWXG | S_IRWXO);
                printf("Filename: %s Size: %d(bytes) iNode#: %llu Permissions: %o\n", dir->d_name,dir->d_reclen,dir->d_ino,stats);
            }
            closedir(d);
        }
        return(0);
    } else if (strcmp(flag, "-h") == 0) {
        DIR *d;
        struct dirent *dir;
        d = opendir(pathname);
        if (d) {
            while ((dir = readdir(d)) != NULL) {
                if (dir->d_name[0] == '.') {
                    printf(" %s \n", dir->d_name);
                }
            }
            closedir(d);
        }
        return 0;
    } else if (strcmp("--help", argv[1]) == 0) {
        puts("The options to call this command are as follows:");
        puts("\tlist \t list all non-hidden files in current working directory");
        puts("\tlist -i\t list additional info for files in current working directory");
        puts("\tlist -h\t list hidden files in current working directory");
        puts("\tlist pathname\t list all non-hidden files in specified directory");
        puts("\tlist -i pathname\t list additional info for files in specified directory");
        puts("\tlist -h pathname\t list hidden files in specified directory");
    }
    else {
        fprintf(stderr, "The flags entered were not valid. Type --help for help\n");
        return -1;
    }

    return 0;
}

```
Adding this functionality is relatively simple following the example function
that we gave yesterday, and just consists of adding another string comparison to
see if if matches the `list` function. Then we just get the required
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
                } else if (strcmp(buff, "list") == 0) {
                    char *flag = strtok(NULL, " ");
                    char *op1 = strtok(NULL, " ");
                    execl("./list", "list", flag, op1, NULL);
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
