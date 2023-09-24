# User docker image as base
FROM alpine

# Install dependencies
RUN apk add --update redis

# start command 
CMD [ "redis-server" ]