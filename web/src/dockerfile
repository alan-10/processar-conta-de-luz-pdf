FROM node:20-slim

RUN npm install -g http-server

WORKDIR /usr/src/web

COPY package*.json ./

RUN npm ci

COPY . .

# RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]