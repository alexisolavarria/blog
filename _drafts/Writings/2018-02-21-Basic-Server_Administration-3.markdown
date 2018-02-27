---
layout: default_blog
title:  "Basic Server Administration - Day 3"
date:   2018-02-21 12:00:00 -0400
categories: Writing
tags: Development
---
Yesterday before we installed screen I briefly mentioned a program on your server called man, and glossed over what the program actually does. So today, we're going to learn about man and why it should be the first thing you do when using a new command. 

A good first step is to run the command on itself. To follow along, that would be:

```man man```

Which will pop open a new screen that gives a description for the man command. The first entry is the name of the command, which includes the command that you type at the terminal and a brief description of what it does. When learning a new command this is very handy, as the description can save you a google on it's own. 

Following the name is a synopsis of the command. This is useful as it show a shorthand of the various options that can be used with the command. After that, there is a roughly paragraph long description of the command that just expands upon the shorter bit above. The last bit of useful information is the options section. This lists each command line flag that the command can take, and gives a description of what the flag does to the command.

As an exercise to learn man and yum, your next task is to use man to find the command line option to search the yum repositories for the rsync command, then attach to your update screen and install the rsync command there. I'll give the command at the start of the post for tomorrow.