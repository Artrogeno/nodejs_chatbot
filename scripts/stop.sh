#!/bin/bash
# cd ../

WIDTH=25
COLS=5
CONTAINER_LIST=("api" "mongo" "redis" "all" "exit")
MESSAGE="# What container do you want to Down?  "
DOWN_API=0
DOWN_MONGO=0
DOWN_REDIS=0

# HELPERS
find_and_remove() {
  delete=($1)
  CONTAINER_LIST=( "${CONTAINER_LIST[*]/$delete}" )
}

# LIST CONTAINERS UP
list_containers_list() {
  echo '######## CONTAINERS UP ###########'
  echo
  docker inspect --format='{{.Name}}' $(docker ps -aq --no-trunc)
  echo
  echo '##################################'
  echo
}

# SHOW CONTAINER LIST
show_containers_list() {
  for ((i=0; i<${#CONTAINER_LIST[@]}; i++)); do
    string="${CONTAINER_LIST[$i]}"
    printf "%s" "$string"
    printf "%$(($WIDTH-${#string}))s" " "
    [[ $(((i+1)%$COLS)) -eq 0 ]] && echo
  done
}

# OPTIONS ACTIONS
down_container_api() {
  API="$(docker ps --all --quiet --filter=name=api)"
  docker stop $API

  MESSAGE="# What container do you want to DOWN more? "
  DOWN_API=1
  find_and_remove 'api'
  init
}
down_container_mongo() {
  MONGO="$(docker ps --all --quiet --filter=name=mongo)"
  docker stop $MONGO

  MESSAGE="# What container do you want to DOWN more? "
  DOWN_MONGO=1
  find_and_remove 'mongo'
  init
}
down_container_redis() {
  REDIS="$(docker ps --all --quiet --filter=name=redis)"
  docker stop $REDIS
  docker-compose kill $REDIS
  docker-compose rm -f $REDIS

  MESSAGE="# What container do you want to DOWN more? "
  DOWN_REDIS=1
  find_and_remove 'redis'
  init
}

try_another() {
  echo "It's  DOWN! try another option."
  question_action_container
}

# QUESTION
question_action_container() {
  echo
  read -p "$MESSAGE" opt
  echo
  case $opt in
    api)
      if [ $(($DOWN_API)) -eq 0 ]; then
        down_container_api
      else
        try_another
      fi ;;
    mongo)
      if [ $(($DOWN_MONGO)) -eq 0 ]; then
        down_container_mongo
      else
        try_another
      fi ;;
    redis)
      if [ $(($DOWN_REDIS)) -eq 0 ]; then
        down_container_redis
      else
        try_another
      fi ;;
    all) docker-compose down ;;
    exit) echo "  :(  " ;;
    *)
      echo "Sorry, I don't understand"
      init ;;
  esac
}


init() {
  list_containers_list
  show_containers_list
  question_action_container
}

# Init Docker
init
