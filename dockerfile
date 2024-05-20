# syntax=docker/dockerfile:1

# FROM node:22-slim
FROM node:20.11-slim
# FROM alpine:3.18

ENV NODE_VERSION 20.12.2

RUN npm cache clean --force

WORKDIR /
#/usr/src/app

# chown -R change the owner of app folder to app
# the node_modules will be owned by app too

# RUN addgroup app && adduser -S -G app app && chown -R app /app

# When using COPY with more than one source file, the destination must be a directory and end with a /

COPY packeage*.json ./

# When using COPY with more than one source file, the destination must be a directory and end with a /

COPY . ./
RUN npm cache clean --force

RUN npm install

ENV NODE_ENV production

# USER app
USER node

EXPOSE 4000

# CMD [ "npm", "start" ]
CMD [ "node", "app.js" ]