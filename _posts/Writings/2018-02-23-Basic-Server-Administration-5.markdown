---
layout: default_blog
title:  "Basic Server Administration - Day 5"
date:   2018-02-23 12:00:01 -0400
categories: Writing
tags: Development
---

Now that you have some experience with a text editor, another tool that is crucial for you to understand is systemctl. Systemctl is the command line wrapper around systemd which is how processes and programs are normally made to run, and are started and stopped by the administrator.

The example process that we'll be using in the demonstration is the firewall manager firewalld. Now, there are a couple main things that you can use systemctl for. To check the status of a running package, you just type:

```systemctl status firewalld```

Which will give you the last few lines of the log file for the service, and a direct message about whether it's running or not. If you want a service to start, it's simply:

```systemctl start firewalld```

And similarly stopping a service is:

```systemctl stop firewalld```

The last real command that you need to use is the ```enable``` flag which just makes it so that the process starts when the server reboots. So normally the sequence that you follow when adding a new service is:

```systemctl start firewalld && systemctl enable firewalld &&systemctl status firewalld```

Which to recap just starts the service, tells it to start on login, and then shows the status to ensure that it is running. Oh, and I almost forgot there is an alias flag ```restart``` that basically stops the service and then starts it. The main reason that you'll be starting and stopping services in the future is to have them relaunch with new config changes.