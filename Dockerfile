FROM node:lts-alpine
WORKDIR /usr/app/server
COPY package*.json ./
RUN npm install
COPY ./dist .
COPY ./files /usr/app/files
