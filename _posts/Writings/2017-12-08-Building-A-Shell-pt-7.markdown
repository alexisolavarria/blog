---
layout: default_blog
title:  "Building a Shell, Part 7"
date:   2017-12-08 14:00:00 -0400
categories: Writing
tags: Development
reading_time: 5 Minutes
card_image: /img/post_images/shell.jpg
card_image_credit: Photo by Clever Visuals on Unsplash
---
Today we're going to be adding the third and final (for now) of our more complex functions to our
shell, fileconverter. This command was specific to my class "Make a shell" assignment, but the
functionality can definitely be improved upon for other use cases as well. The file takes in a
regular text file and converts it to a binary file, or vice versa, and looks like this:

```
#include "error.h"
#include "helper.h"
#include "input.h"
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    if (argc != 3 && argc != 4) {
        fprintf(stderr, "The fileconverter must be called as fileconverter flag infile [outfile]\n");
        return -1;
    }

    // Make sure the string is null terminated
    //argv[3][strlen(argv[3])-1] = 0;

    char *flag = argv[1];
    char *infile = argv[2];
    char *outfile = argv[3];

    if (strcmp(flag, "-t") == 0) {
        FILE *fp_in = fopen(infile, "r");
        FILE *fp_out = fopen(outfile, "wb");

        char *line;
        line = getLine(fp_in);

        while (strlen(line) > 0) {

            char *firstname = malloc(sizeof(char) * 256);
            char *lastname = malloc(sizeof(char) * 256);
            int id = 0;
            float GPA = 0.0;

            sscanf(line, "%s %s %d %f", firstname, lastname, &id, &GPA);

            int first_len = strlen(firstname);
            int last_len = strlen(lastname);

            fwrite(&first_len, sizeof(int), 1, fp_out);
            fwrite(firstname, sizeof(char), first_len, fp_out);
            fwrite(&last_len, sizeof(int), 1, fp_out);
            fwrite(lastname, sizeof(char), last_len, fp_out);
            fwrite(&id, sizeof(int), 1, fp_out);
            fwrite(&GPA, sizeof(float), 1, fp_out);

            line = getLine(fp_in);
        }

        fclose(fp_in);
        fclose(fp_out);

    } else if (strcmp(flag, "-b") == 0) {
        FILE *fp_in = fopen(infile, "rb");
        FILE *fp_out = fopen(outfile, "w");

        while (1) {
            char *firstname = malloc(sizeof(char) * 256);
            char *lastname = malloc(sizeof(char) * 256);
            int id = 0;
            float GPA = 0.0;
            int first_len = 0;
            int last_len = 0;

            fread(&first_len, sizeof(int), 1, fp_in);
            fread(firstname, sizeof(char), first_len, fp_in);
            fread(&last_len, sizeof(int), 1, fp_in);
            fread(lastname, sizeof(char), last_len, fp_in);
            fread(&id, sizeof(int), 1, fp_in);
            fread(&GPA, sizeof(float), 1, fp_in);

            if (feof(fp_in) != 0) {
                break;
            }

            fprintf(fp_out, "%s %s %d %f\n", firstname, lastname, id, GPA);
        }

        fclose(fp_in);
        fclose(fp_out);
    }  else {
        fprintf(stderr, "that is not an allowed flag.");
        return -1;
    }

    return 0;
}


```
Adding this functionality is relatively simple following the example function
that we gave yesterday, and just consists of adding another string comparison to
see if if matches the `fileconverter` function. Then we just get the required
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
                } else if (strcmp(buff, "fileconverter") == 0) {
                    char *flag = strtok(NULL, " ");
                    char *op1 = strtok(NULL, " ");
                    char *op2  = strtok(NULL, " ");
                    execl("./fileconverter", "fileconverter", flag, op1, op2, NULL);
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
