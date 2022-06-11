FROM node:18-alpine

# Create app directory and destination directory
RUN mkdir -p /usr/src/webhook-handler
RUN mkdir -p /usr/src/webhook-handler/logs
WORKDIR /usr/src/webhook-handler

# copy the app, note .dockerignore
COPY . /usr/src/webhook-handler

# Install app dependencies
RUN npm install

ENV PORT=3500

EXPOSE 3500

CMD ["npm", "start"]