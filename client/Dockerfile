FROM node:12-alpine

WORKDIR /app
COPY . /app

RUN yarn --silent
RUN yarn global add react-scripts

EXPOSE 3000

CMD ["yarn","start"]