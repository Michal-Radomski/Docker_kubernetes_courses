# Step1: Use and existing docker image as a base -> Alpinelinux distrubution
FROM alpine

# Step 2: Download and install dependency
RUN apk add --update gcc
RUN apk add --update redis

# Step 3: Tell the image what to do when it starts as container
CMD ["redis-server"]
