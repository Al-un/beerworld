FROM node:13.7.0-alpine

# Expose is a documentation only and has no real effect on the container 
# real behaviour
EXPOSE 3000

# Declare our work directory
WORKDIR /usr/src/app

# Install the dependencies leveraging build cache: 
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache
COPY package*.json ./
RUN npm install

# Copy our API source code AFTER installing dependencies
COPY . .

# CMD is the defaut command which can be overriden on container startup
CMD [ "node", "index.js" ] 