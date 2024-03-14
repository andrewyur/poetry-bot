# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

# Download dependencies as a separate step. 
# Since there's no multi-stage build support without BuildKit, copy everything first, 
# then install dependencies.
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --production --frozen-lockfile

# Copy remaining files
COPY . /usr/src/app/

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 443
EXPOSE 80

# Run the application.
CMD yarn run register && yarn start

