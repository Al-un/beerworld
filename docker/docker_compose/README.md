# Docker compose <!-- omit in toc -->

**Pre-requisites**

- [Docker getting started](../getting-started/README.md)
- [Docker network](../docker-network/README.md)

- [Run the example](#run-the-example)
- [Setup](#setup)
  - [Installation](#installation)

## Run the example

```sh
sudo docker-compose --file docker-compose.yml build
sudo docker-compose --file docker-compose.yml up
```

- Check [`http://localhost:3000/`](http://localhost:3000/) to ensure that:
  - The "gateway" server is working (no internal server error)
  - The beer API data can be fetched from the database
- Check [`http://localhost:8080/`](http://localhost:8080/) to use a front-end to do the check above
- Check [`http://localhost:3000/logs`](http://localhost:3000/logs) to confirm that logs are properly logged

## Setup

### Installation

https://docs.docker.com/compose/install/

```sh
# Run this command to download the current stable release of Docker Compose:
# To install a different version of Compose, substitute 1.25.3 with the version of Compose you want to use.
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Apply executable permissions to the binary:
sudo chmod +x /usr/local/bin/docker-compose

# Test the installation
docker-compose --version
```

**Misc stuff to process**:

- https://michalzalecki.com/docker-compose-for-nodejs-and-postgresql/
- https://github.com/MichalZalecki/docker-compose-node-postgres
- https://blog.codeship.com/using-docker-compose-for-nodejs-development/
- https://github.com/javiercbk/budgeteala
- http://kimh.github.io/blog/en/docker/gotchas-in-writing-dockerfile-en/#exec_format_error
- https://stackoverflow.com/questions/36884991/how-to-rebuild-docker-container-in-docker-compose-yml
- To answer if found a solution: https://stackoverflow.com/questions/59722631/passing-environment-variables-at-runtime-to-vue-js-application-with-docker-compo
