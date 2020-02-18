# ---------- Building stage
# Although Vue.js documentation uses node:lts-alpine as source image, I 
# picked the 13.8.0 version which is the same as the API so building the
# API and the front-end will use the same source image
FROM node:13.8.0-alpine AS build-stage


WORKDIR /usr/src/bw-docker-getting-started/client

# Copy only package.json and the lock file (package-lock.json or yarn.lock)
# as referenced from Vue.js documentation: every layer being cached, having
# an unchanged package.json will NOT re-trigger dependencies installation,
# significantly speeding up image building, right?
# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package*.json ./
RUN npm install

# Similarly, if the source code has not changed, it should NOT trigger a Vue.js 
# build every time the Docker image is built 
COPY . .
RUN npm run build

# ---------- Production stage
FROM nginx:stable-alpine as production-stage
EXPOSE 80

# the "build-stage" value of the "--from" argument must match the image
# alias defined in the previous stage
COPY --from=build-stage /usr/src/bw-docker-getting-started/client/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]