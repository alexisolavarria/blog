#!/bin/bash

bundle exec jekyll build .
git add .
git commit -am "Automated commit"
git push origin master
git push readonly master
