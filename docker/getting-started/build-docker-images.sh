#!/bin/sh

# Help
# - Checking if the user is currently sudo-ing:
#     > https://stackoverflow.com/a/52586842/4906586

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

echo "Building server images..."
docker build -f ./server/server-v1.Dockerfile   -t alunsng/beerworld:docker-getting-started_server-v1   --quiet ./server
docker build -f ./server/server-v2.Dockerfile   -t alunsng/beerworld:docker-getting-started_server-v2   --quiet ./server
docker build -f ./server/server.Dockerfile      -t alunsng/beerworld:docker-getting-started_server      --quiet ./server

echo "Building client images..."
docker build -f ./client/client-v1.Dockerfile   -t alunsng/beerworld:docker-getting-started_client-v1   --quiet ./client
docker build -f ./client/client.Dockerfile      -t alunsng/beerworld:docker-getting-started_client      --quiet --build-arg VUE_APP_API_ROOT_URL="http://localhost:8000" ./client

echo "Pushing latest images..."
docker push alunsng/beerworld:docker-getting-started_server
docker push alunsng/beerworld:docker-getting-started_client

echo "Finished!"