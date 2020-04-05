# I developed under node-13.7.0 at the time I wrote this experiment
FROM node:13.7.0-alpine

# Define target folder in the container instance
WORKDIR /usr/src/app

# Copy our source code
COPY . .

# Install dependencies
RUN npm install

# CMD is the defaut command which can be overriden on container startup
CMD [ "node", "index.js" ] 