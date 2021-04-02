# OSSHero

A web app to gamify open source contribution!

The frontend is in `client` and is a react app.

The backend is in `server` and is a nextjs app.

## Run locally

Create a .env file `server/.env` modeled after `server/.env.example`.

Create a .env file `client/.env` modeled after `client/.env.example`.

 `docker-compose --file docker-compose-dev.yml up` will start the DB, client, and server locally.

 ## Development

 You'll probably want to run

 ``` shell
 cd client
 yarn
 cd ../server
 yarn
 cd ..
 ```

 to install the dependencies so your editor stops yelling at you.