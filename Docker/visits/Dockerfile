 FROM node:18-alpine

 WORKDIR /usr/apps/visit

 COPY ./package.json ./
 COPY ./ ./


 RUN npm install

 CMD [ "npm", "start" ]
