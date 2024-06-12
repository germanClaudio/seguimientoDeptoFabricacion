# syntax=docker/dockerfile:1

FROM node:20-alpine
# FROM node:22-slim
# FROM node:20.11-slim
# FROM alpine:3.18

ENV NODE_VERSION 20.14.0

RUN npm cache clean --force

WORKDIR /
#/usr/src/app

# chown -R change the owner of app folder to app
# the node_modules will be owned by app too

# When using COPY with more than one source file, the destination must be a directory and end with a /
COPY package*.json ./

RUN npm cache clean --force

RUN npm install

ENV NODE_ENV production

COPY . ./

USER node
# USER app

EXPOSE 4000

# CMD [ "npm", "start" ]
CMD [ "node", "app.js" ]