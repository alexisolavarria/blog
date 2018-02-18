---
layout: default_blog
title:  "Basic Server Administration - Day 1"
date:   2018-02-18 12:00:00 -0400
categories: Writing
tags: Development
---
After yesterdays post about who should be learning server administration, it's time to actually start learning. The first step is to get yourself a linux machine and install Centos 7 on it, as that is what we will be using throughout this. With most hosting providers this is simply an option that you select when you're signing up. The other required technologies are a computer running Mac OS, as that is what I use day to day so that's the easiest for me to test.

The first thing that you will probably do with your server is want to get onto it, normally through ssh. The command for this on your Mac is:

```ssh username@ip.ad.dr.ess```

After you type that, you should receive a prompt on your screen asking you for your password. Now, because you will be doing this frequently, or at least you should be to be properly learning, typing the password every time will quickly become tiresome. So we're going to use key based authentication. Key based authentication works by generating a public key and a private key that work together. What this means is when you try to log onto a server, your laptop is going to hand your private key to the server, and if it matches with one that the server has in its key list then you can logon without using a password.

To start this process, on terminal on your mac type the following: 

```ssh-keygen -t RSA```

which means that we will be generating an ssh key with the RSA encryption scheme. If you choose you can enter a password when prompted, and you should save it within the default location. Then type 

```cat ~/.ssh/id_rsa.pub | pbcopy```

which just copies the public portion of the key that was just created to the system clipboard. Then ssh to the server using the ssh command from above, and do the following:

```mkdir .ssh``` 

```vi .ssh/authorized_keys```

Now we are in a command line text editor named vi, which will seem extremely confusing at first, and we'll get into it one day but for now just hit the ```i``` key, hit ```command+v``` to paste the public key from your clipboard, hit the ```esc``` key on your keyboard, then type ```:wq``` and you're out. Now just to quickly breeze through the wizardry that we just went through, we went into **i**nsert to put text into the file, pasted the text into the file, **esc**aped from insert mode, and then **w**rote the file and **q**uit from the file.

Now to try this out type 

```quit```

which will have you leave the server. Then if we did everything right, after trying to ssh again, that command from the top, you should be able to log into the server without using your password. Again, this seems like a little thing but trust me it will be very helpful going forward.