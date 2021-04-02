
FROM node:12-alpine

WORKDIR /app

COPY . /app

RUN chmod +x ./wait-for-it.sh
RUN npm install -g nodemon --silent
RUN npm install --silent
RUN npm install -g ts-node --silent
RUN apk add --no-cache bash

EXPOSE 3001