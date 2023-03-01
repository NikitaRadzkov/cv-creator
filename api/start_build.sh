#!/bin/bash
echo "====== DOCKER IMAGES======"
docker images -a
echo "=========================="
APP_NAME=generator_cv
APP_PORT=8443
SSL_PORT=8443
docker stop $APP_NAME
echo "==== OLD DOCKER CONTAINER STOP ===="
docker rm $APP_NAME
echo "==== OLD DOCKER CONTAINER WITH APP IS REMOVED ===="
docker image rm $APP_NAME
echo "==== OLD DOCKER IMAGE IS REMOVED ===="
APP_DIR=CVMaker/api
PROJECT_DIR=CVMaker
GIT_REPO=https://github.com/Lawyer1990/CVMaker.git
sudo rm -R $PROJECT_DIR
echo "=== OLD APP FOLDER IS REMOVED ==="
env GIT_SSL_NO_VERIFY=true git clone $GIT_REPO
cd $PROJECT_DIR
docker build -t $APP_NAME .
echo "==== NEW DOCKER IMAGE IS BUILT ==="
docker run -p $APP_PORT:$SSL_PORT --name $APP_NAME $APP_NAME