# Although Vue.js documentation uses node:lts-alpine as source image, I 
# picked the 13.7.0 version which is the same as the API so building the
# API and the front-end will use the same source image
FROM node:13.7.0-alpine AS build-stage

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]