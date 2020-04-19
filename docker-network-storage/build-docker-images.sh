#!/bin/sh

# Nice error display
error(){
    printf "\e[1;31m"; echo "$@"; printf "\e[0m"
}

# bool function to test if the user is root or not (POSIX only)
is_user_root() { [ "$(id -u)" -eq 0 ]; }

if is_user_root; then
    echo 'Starting...'
else
    error "Please use 'sudo' to run this script"
    exit 1
fi

# docker build -t alunsng/beerworld:docker-network-storage_db -f ./database/db.Dockerfile ./database

echo "Building server images..."
docker build -t alunsng/beerworld:docker-network-storage_server -f ./server/server.Dockerfile --quiet ./server

echo "Pushing latest images..."
docker push alunsng/beerworld:docker-network-storage_server