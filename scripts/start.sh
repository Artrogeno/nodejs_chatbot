#!/bin/bash
# cd ../

WIDTH=25
COLS=4
CONTAINER_LIST=("api" "mongo" "redis" "exit")
MESSAGE="# What container do you want to UP?  "
UP_API=0
UP_MONGO=0
UP_REDIS=0
#

# HELPERS
find_and_remove() {
  delete=($1)
  CONTAINER_LIST=( "${CONTAINER_LIST[*]/$delete}" )
}

# SHOW CONTAINER LIST
show_container_list() {
  for ((i=0; i<${#CONTAINER_LIST[@]}; i++)); do
    string="${CONTAINER_LIST[$i]}"
    printf "%s" "$string"
    printf "%$(($WIDTH-${#string}))s" " "
    [[ $(((i+1)%$COLS)) -eq 0 ]] && echo
  done
}

# OPTIONS ACTIONS
up_container_api() {
  docker-compose kill api
  docker-compose rm -f api
  docker-compose up -d api

  MESSAGE="# What container do you want to UP more? "
  UP_API=1
  find_and_remove 'api'
  init
}
up_container_mongo() {
  docker-compose kill mongo
  docker-compose rm -f mongo
  docker-compose up -d mongo

  MESSAGE="# What container do you want to UP more? "
  UP_MONGO=1
  find_and_remove 'mongo'
  init
}
up_container_redis() {
  docker-compose kill redis
  docker-compose rm -f redis
  docker-compose up -d redis

  MESSAGE="# What container do you want to UP more? "
  UP_REDIS=1
  find_and_remove 'redis'
  init
}

try_another() {
  echo "It's  UP! try another option."
  question_action_container
}

# QUESTION
question_action_container() {
  echo
  read -p "$MESSAGE" opt
  echo
  case $opt in
    api)
      if [ $(($UP_API)) -eq 0 ]; then
        up_container_api
      else
        try_another
      fi ;;
    mongo)
      if [ $(($UP_MONGO)) -eq 0 ]; then
        up_container_mongo
      else
        try_another
      fi ;;
    redis)
      if [ $(($UP_REDIS)) -eq 0 ]; then
        up_container_redis
      else
        try_another
      fi ;;
    exit) echo "  :(  " ;;
    *)
      echo "Sorry, I don't understand"
      init ;;
  esac
}


init() {
  show_container_list
  question_action_container
}

# Init Docker
init

# docker stop $(docker ps -a -q)

# docker rm $(docker ps -a -q)
