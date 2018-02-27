---
layout: default_blog
title:  "Basic Server Administration - Day 2"
date:   2018-02-19 12:00:00 -0400
categories: Writing
tags: Development
---

Now that you can log on to your server with ease, the next thing that we want to do is make sure that it is always up to date. But before we do that I want to just briefly explain how user sessions work for your server. When you log in to your server using the ssh command from yesterday, the server opens a session for your user account. 

You can open multiple sessions this way by either logging on from multiple computers or simply opening a new terminal window and logging in again. This session persists until you either exit the server or close your browser window. Now, why is this important to bring up when learning about keeping your server up to date? Well, put simply having your session end while your server is updating is the number one way to ruin your operating system. 

Since this can happen if you accidentally close your terminal window or even just lose wifi, then it makes sense to take measures to ensure that this doesn't happen to you. One way, and what I would argue is the easiest way, is to install a program called screen. A brief description from screen's man page:

```Name: screen - screen manager with VT100/ANSI terminal emulation```

For a more detailed overview you can read the man page, more detail on what that actually is tomorrow, but in essence, screen allows you to have multiple background sessions running on the server. This means that if you do your updating in this background session, then it can never end unless the server gets shut off which helps ensure that your server doesn't get ruined.

To install screen, log on to the server and run the following command:

```sudo yum install screen -y```

Which will install screen onto the server using the default package manager for centos. Now that it's installed we can launch a screen session using:

```screen```

This will launch you into a new session. Now, to leave the session running in the background run:

```control+a+d```

And to rejoin the session:

```screen -r```

And now that we're back in the session, to fully update the server run:

```sudo yum update -y```

And after watching all of the text fly across the screen, type the leave command at any point to let that update run in the background and you can go on your merry way. From now on, every time that you need to update your software or install a new package just re-attach to that screen session and run it there. Tomorrow we'll take a look at learning the man command through diving deep to learn more about the yum and screen commands that we used today.