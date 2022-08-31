FROM node:12-alpine as builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

RUN npm config set unsafe-perm true

RUN npm install -g typescript
RUN npm install -g ts-node
USER node
RUN npm install
# RUN npm i -g typeorm

COPY --chown=node:node . .
RUN npm run build
# RUN npm run migrate

EXPOSE 3000
