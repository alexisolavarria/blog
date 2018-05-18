from fabric import *

def add():
    local("git add .")

def commit():
    local("git commit -a")

def upload():
    local("git push origin master")

def upload_rd():
    local("git push readonly master")

def git():
    # Commit all the code to gitlab
    add()
    commit()
    upload()
    upload_rd()

def convert_images():
    local("scripts/minimize_thumbnails")

def create_photo_posts():
    local("scripts/create_thumbnail_posts")

def build():
    local("bundle exec jekyll build .")

def prep():
    # Get all the content ready
    convert_images()
    create_photo_posts()
    build()

def deploy():
    prep()
    git()
