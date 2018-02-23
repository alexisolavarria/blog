---
layout: default_blog
title:  "Basic Server Administration - Day 4"
date:   2018-02-22 12:00:00 -0400
categories: Writing
tags: Development
---

Vim. That simple word can bring forth any emotion from love to hatred and even confusion for those that have used it before. What is it? Well, according to our man page, vim is Vi IMproved, a programmer's text editor.  Now, you may be wondering what it means to be a programmer's text editor, or why we would even need a text editor on our server.

If you remember back to our first day with the ssh keys, we've actually already used vi, which is what vim is built upon, to create a file. Creating and editing files directly on the server saves you, the user, the trouble of having to copy the file to your local machine, edit it, and then upload it back to the server. Instead, we can just simply edit it directly where it lives. This allows you to make changes quicker and continue on with what you need to be doing. 

That's all good and well, but you may be asking why I would choose vim. The answers pretty simple actually. Vi, the slightly more simplistic version of vim has all of the same keybindings and comes installed on pretty much any linux, unix, or bsd variant made in the last twenty years. This means that if you have to edit a file on a machine that is unable to update or install packages for whatever reason you can still edit files as an editor that you know is going to be there for you to rely on.

In the coming tutorials I am going to be giving commands for you to use, and all of the file based commands will use vim. Instead of having to explain the commands every single post, it's easier to have a base list for you to refer to. So, you may be expecting there to be a list of commands in a table below, with each telling you what it does. For this though I am actually going to take the easy route and direct you to a tutorial. 

Not just any tutorial though, but the vim tutor. The vim tutor is a program that ships with every version of vim and walks you through how to use vim by having you actually use vim to edit the tutorial itself. Before throwing you directly into it though, one thing about vim needs to be explained. Vim is a modal editor. That means that there exists multiple states that you can be in when using the editor, and in vim when in different modes the keys of your keyboard will actually do different things depending on what mode you are.

When you launch vim you start in editing mode. If you try to type directly into the document, other things will happen. While this may seem confusing, this is actually where vim gains most of its power. An example of this power can be seen in two keystrokes. While in edit mode, if the cursor is at the beginning of a word and you type:

```dw```

That will delete the entire word. Now imagine that the word that you wanted to delete was something long like the word administration. You could either hit the delete key for each letter, or simply type two letters and delete the entire word. To switch to input mode, where as you guessed it you can input text, you simply type:

```i```

And to exit back to editing mode you simply hit the:

```escape```

key. If this seems interesting, then follow the instructions below to begin. And if it doesn't, I still encourage you to give it a try. You never know when it might come in handy to know even just the basics of vim. To install vim run:

```sudo yum install vim -y```

And to launch the tutor just run:

```vimtutor```

Enjoy.