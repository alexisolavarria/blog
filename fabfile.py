from fabric.api import *

env.hosts = ['']

def add():
    local("git add .")

def build():
    local("bundle exec jekyll build .")

def commit():
    local("git commit -a")

def upload():
    local("git push origin master")

def git():
    # Commit all the code to github
    add()
    build()
    commit()
    upload()

def convert_images():
    local("scripts/minimize_thumbnails")

def create_photo_posts():
    local("scripts/create_thumbnail_posts")
    local("scripts/create_large_posts")
    local("scripts/create_full_posts")

def prep():
    # Get all the content ready
    convert_images()
    create_photo_posts()
    build()

def sync():
    local("rsync -avz --progress _site/* root@blog:/var/www/html")
    local("rsync -avz --progress _site/* root@blog2:/var/www/html")
    local("rsync -avz --progress _site/* root@blog3:/var/www/html")

def deploy():
    prep()
    git()
    sync()
