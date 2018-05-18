#!/bin/bash

./scripts/minimize_thumbnails
sudo ./scripts/create_thumbnail_posts
bundle exec jekyll build .
git add .
git commit -am "Automated commit"
git push origin master
git push readonly master
