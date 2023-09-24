# Specify base image

FROM node:18-alpine

WORKDIR /usr/apps/simple-web
# install some dependencies
COPY ./package.json ./
COPY ./ ./

RUN npm install

# start command or default command
CMD [ "npm", "start" ]