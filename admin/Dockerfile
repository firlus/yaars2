FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn 
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]