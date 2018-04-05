---
layout: default_blog
title:  "Building a Shell, Part 8"
date:   2017-12-09 14:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/shell.jpg
card_image_credit: Photo by Clever Visuals on Unsplash
---
Today while testing I had noticed a slight issue with the code. While everything
worked great in the directory where we started the simpleshell, the complicated
functions failed as soon as we stepped outside of the directory using our chwd
command. A simple fix to that just involves looking at the current directory
when we start up, and pre-pending it to the command name. Adding that to our
shell we get:

```c
int main(void) {
    char *base_dir = malloc(sizeof(char) * 512);
    getcwd(base_dir, MAX_STR);

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
                      char *command_path;
                      allocateStr(&command_path);
                      strcat(command_path, base_dir);
                      strcat(command_path, "/create");

                      char *flag = strtok(NULL, " ");
                      char *op1 = strtok(NULL, " ");
                      char *op2  = strtok(NULL, " ");
                      execl("./create", "create", flag, op1, op2, NULL);
                      return -1;
                } else if (strcmp(buff, "list") == 0) {
                    char *command_path;
                    allocateStr(&command_path);
                    strcat(command_path, base_dir);
                    strcat(command_path, "/list");

                    char *flag = strtok(NULL, " ");
                    char *op1 = strtok(NULL, " ");
                    execl(command_path, "list", flag, op1, NULL);
                    return -1;
                } else if (strcmp(buff, "fileconverter") == 0) {
                    char *command_path;
                    allocateStr(&command_path);
                    strcat(command_path, base_dir);
                    strcat(command_path, "/fileconverter");

                    char *flag = strtok(NULL, " ");
                    char *op1 = strtok(NULL, " ");
                    char *op2  = strtok(NULL, " ");
                    execl(command_path, "fileconverter", flag, op1, op2, NULL);
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
