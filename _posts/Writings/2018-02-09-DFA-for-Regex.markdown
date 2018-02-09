---
layout: default_blog
title:  "Constructing A DFA From A Regex"
date:   2018-02-09 12:00:00 -0400
categories: Writing
tags: Development
---

While creating [Prex](https://doug-skinner.com/projects/2018/02/09/Prex.html),
one of the major challenges was trying to figure out the best way to represent a
walkable path through the regular expression without just resorting to the built in regular
expression class within Python. After some deliberation, and a failed attempt of
trying to keep track of my position walking through the string iteself, I
remembered from my Automata class that a regular expression has to be able to be
represented within a
[Deterministic Finite Automaton](https://en.wikipedia.org/wiki/Deterministic_finite_automaton) or it's
not valid, so I decided to construct one of those. In order to do this, I would
need three classes, one to represent each state of the DFA, one to represent the
actual DFA, and then one to read in the file and the regex string to be
processed. Since the actual code for the project can be found both on my personal GitLab
and Github I won't be showing the actual code here, just describing the thought
process.

Creating the state representation was relatively simple. It has three
internal variables, one to hold any possible loop variables, one to hold any
possible transition variables, and then one to represent the next state. The
reason for that last variable is to represent the possible states as a linked
list of states, to easily keep track of the beginning and end of the list. In
order to create the DFA from the regex, a blank state is created initially.
Then, for each character a new state is created, the transition variable is set
to the character, and then the previous state's next state is set to the current
state.

The only exception to this is if the character is +, \*, [, or ]. If the
character is a +, which means that the character can appear one or many times,
then a new state is added with a loop variable that matches the previous states
transition variable and the transition variable is set to ''. Aside, in this DFA
a transition of '' is treated as a null transition allowing it to be
transitioned across at any time. If the character is a \*, which means that the character can be there zero or
any number of times, the previous characters transition variable is moved to the
loop variable, and the transition variable is set to ''. This allows it to be
looped infinitely or skipped entirely.

The last part of the construction is if the character is a [. If it is, then a
flag is set indicating that we are currently within brackets. While that flag is
set, all characters encountered are added to the transition variable of the
current state. Once we encounter a ], we turn that flag off and continue. And
thus, the DFA is made and we can start processing the passed in strings.
