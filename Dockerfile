FROM node:12-stretch-slim

WORKDIR /usr/src/node-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8088

CMD ["npm", "run", "start:dev"]