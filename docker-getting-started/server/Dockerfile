# Although I was running Node.js 13.7.0, I assume that 13.8.0, latest version
# to this date, will not kill the program. But such control over runtime
# version is a very cool part of Docker \o/ 
FROM node:13.8.0-alpine

# Expose is a documentation only and has no real effect on the container 
# real behaviour
EXPOSE 3000

# Declare our work directory. As the beerworld project will involve multiple
# Docker images, the convention would be 
#   /usr/src/{folder name}/{sub folder if any}
WORKDIR /usr/src/bw-docker-getting-started/server

# Install the dependencies leveraging build cache: 
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache
COPY package*.json ./
RUN npm install

# Copy our API
COPY . .

# ADD commands would allow changing ownership with --chown=XXX but this is
# not required for our little example
ADD ./entrypoint.sh /usr/local/bin/entrypoint.sh
# Ensure that our entrypoint can be executed T_T (pain for forgetting this
# line is still here)
RUN chmod +x /usr/local/bin/entrypoint.sh

# ENTRYPOINT is ALWAYS executed on container startup
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]
# CMD is the defaut command which can be overriden on container startup
CMD [ "node", "index.js" ] 