# Docker network <!-- omit in toc -->

- [Run the examples](#run-the-examples)
  - [Docker storage](#docker-storage)
  - [Docker network](#docker-network)
- [Storage in Docker](#storage-in-docker)
  - [Volumes](#volumes)
  - [Temporary storage: `tmpfs`](#temporary-storage-tmpfs)
  - [Bind](#bind)
  - [Concurrency](#concurrency)
- [Networking in Docker](#networking-in-docker)
- [Next steps](#next-steps)

**Pre-requisites**

- [Docker getting started](../getting-started/README.md)

https://docs.docker.com/engine/reference/commandline/network_create/

## Run the examples

### Docker storage

```sh
# Define variable to avoid typo
LOG_VOLUME=bw_docker-network-storage_server
LOG_FOLDER=/app-log

# Create the docker volume if it does not exist yet
sudo docker volume create $LOG_VOLUME

# Run the container against the created volume
sudo docker run -d --rm -p 3000:3000 --env APP_LOG_FOLDER=$LOG_FOLDER/ --mount source=$LOG_VOLUME,target=$LOG_FOLDER alunsng/beerworld:docker-network-storage_server
```

1. Check on [`http://localhost:3000`](http://localhost:3000) that the server is up and running
2. Check the log file. Try `sudo vim /var/lib/docker/volumes/bw_docker-network-storage_server/_data/some_log.txt`

### Docker network

```sh
# Define variable to avoid typo
DB_USER=plop
DB_PWD=plop
DB_NAME=beers
DB_VOLUME=bw_docker-network-storage_database
DB_NETWORK=beerworld
DB_HOST=database

# Create the docker volume for the database if it does not exist yet
sudo docker volume create $DB_VOLUME
# Create the docker network if it does not exist yet. Feel fre to adjust the network configuration
sudo docker network create --driver=bridge --subnet=39.39.0.0/16 --ip-range=39.39.39.0/24 --gateway=39.39.0.1 $DB_NETWORK

# Start the database image. Database must be spawn first
sudo docker run -d --rm --network=$DB_NETWORK --network-alias=$DB_HOST \
    --env POSTGRES_USER=$DB_USER --env POSTGRES_PASSWORD=$DB_PWD --env POSTGRES_DB=$DB_NAME --PGDATA=/var/lib/postgresql/data \
    --mount source=$DB_VOLUME,target=/var/lib/postgresql/data
    postgres:12-alpine

# Start the server image, from the docker-getting-started project
sudo docker run -d --rm --network=$DB_NETWORK --network-alias=server \
    --env DATABASE_URL=postgres://$DB_USER:$DB_PWD@$DB_HOST:5432/$DB_NAME \
    -p 3000:3000 \
    alunsng/beerworld:docker-getting-started_server

# Open the browser to check that database are fetch from the database
firefox http://localhost:3000
```

## Storage in Docker

Some containers need some storage to work. As for examples, there is no need to look further than databases or application with logging capabilities. Those will be our examples here. Docker offers three types of storage storage:

- Volumes
- Bind
- tmpfs

![Docker storage](https://docs.docker.com/storage/images/types-of-mounts-volume.png)

<sub>From [Docker documentation](https://docs.docker.com/storage/#choose-the-right-type-of-mount)</sub>

> As stated by [Docker documentation](https://docs.docker.com/storage/volumes/#create-and-manage-volumes#choose-the--v-or---mount-flag), prefer using/exploring the `--mount` flag over `-v` / `--volume`.

A Docker storage is a storage location, either directly from the host or from another storage, is mounted in a specified point, the target, inside the container. For example, mounting the `$PG_DATA` directory from a PostgreSQL container will save the actual database content in the specified storage. Containers and volumes having independent lifecycles, you can spawn a container with data populated by a previous container.

**References**

- [Docker hub: PostgreSQL images documentation](https://hub.docker.com/_/postgres/)

### Volumes

Volumes made storage handling easier as all the hassle is handled by Docker. Volumes can be managed with the Docker CLI so without further ado, let's create a volume:

```sh
# Create a volume named `bw_docker-network-storage_server`
sudo docker volume create bw_docker-network-storage_server

# Display information about the created volume
sudo docker volume inspect bw_docker-network-storage_server
```

![Volume creation output and information](../beerworld/screenshots/docker-network-storage_storage-01.png)

Volumes can be listed with:

```sh
sudo docker volume ls
```

![Volume list](../beerworld/screenshots/docker-network-storage_storage-02.png)

The volume being now ready, we will use the server from [`./server`](./server/README.md) which log in a text file:

```sh
# Build the Docker image
docker build -t alunsng/beerworld:docker-network-storage_server -f ./server/server.Dockerfile ./server

# Run with a volume
LOG_FOLDER=/app-log
sudo docker run -d --rm -p 3000:3000 --env APP_LOG_FOLDER=$LOG_FOLDER/ --mount source=bw_docker-network-storage_server,target=$LOG_FOLDER alunsng/beerworld:docker-network-storage_server
```

![Container started with volume](../beerworld/screenshots/docker-network-storage_storage-03.png)

Check the [`http://localhost:3000`](http://localhost:3000) URL in your favourite browser. You should an empty result:

![No beers returned](../beerworld/screenshots/docker-network-storage_storage-04.png)

The logging file can be checked based on the path provided by `sudo docker volume inspect`:

![Show logging file](../beerworld/screenshots/docker-network-storage_storage-05.png)

<sub>Oops, I have not uninstalled some service workers from another application...</sub>

Success!

You can then try to stop the running container and check that the logging file is still there. Spawning a new container using the same volume will not erase the file, at least Docker will not erase it, so the previous logs will still be there.

**References**

- [Docker documentation: storage overiew](https://docs.docker.com/storage/)
- [Docker documentation: volumes](https://docs.docker.com/storage/volumes/)
- [Understanding data volumes in Docker](https://blog.container-solutions.com/understanding-volumes-docker)

### Temporary storage: `tmpfs`

When persistence is not required, a temporary folder does the job:

```sh
sudo docker run -d --rm -p 3000:3000 --env APP_LOG_FOLDER=/app-log/ --mount type=tmpfs,destination=/app-log alunsng/beerworld:docker-network-storage_server
```

![Starting a container with temporary storage](../beerworld/screenshots/docker-network-storage_storage-06.png)

```sh
curl http://localhost:3000/ | jq
curl http://localhost:3000/logs | jq
```

When fetching the logs again, logs are from a fresh logging file:

![Fresh logs](../beerworld/screenshots/docker-network-storage_storage-07.png)

**References**

- [Docker documentation: tmpfs](https://docs.docker.com/storage/tmpfs/)

### Bind

A classic bind mount is also possible.

> When using the `--mount` syntax, ensure that the directory on the host already exist.

```sh
# Try to bind to ./bind/
sudo docker run -d --rm -p 3000:3000 --env APP_LOG_FOLDER=/app-log/ --mount type=bind,source="$(pwd)"/bind,target=/app-log alunsng/beerworld:docker-network-storage_server

# If there is an error, create the missing directory and retry
mkdir bind/
sudo docker run -d --rm -p 3000:3000 --env APP_LOG_FOLDER=/app-log/ --mount type=bind,source="$(pwd)"/bind,target=/app-log alunsng/beerworld:docker-network-storage_server
```

![Binding](../beerworld/screenshots/docker-network-storage_storage-08.png)

The same `curl` command can check that server is all good:

```sh
curl http://localhost:3000/ | jq
curl http://localhost:3000/logs | jq
```

![The usual network requests](../beerworld/screenshots/docker-network-storage_storage-09.png)

And ensure that logs are written in the expected file. Checking log timestamps ensures that we opened the proper file:

```sh
# Display the APP_LOG_FOLDER folder
ls -l ./bind/
# Display the saved logs
cat ./bind/some_log.txt
```

![Logs are now saved in the bind/ folder](../beerworld/screenshots/docker-network-storage_storage-10.png)

**References**

- [Docker documentation: bind](https://docs.docker.com/storage/bind-mounts/)

### Concurrency

TODO

## Networking in Docker

```sh
sudo docker network ls
```

```sh
# Feel free to adjust the network values
sudo docker network create --driver=bridge --subnet=39.39.0.0/16 --ip-range=39.39.39.0/24 --gateway=39.39.0.1 beerworld
# Create beerworld network
# >> e2c805d8efd611f9eabe402a6d809e502e8f5ceaf7821372f6a606f599dc1259
```

```sh
sudo docker network rm beerworld
```

## Next steps

- [Docker compose](../docker-compose/README.md)
