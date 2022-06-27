FROM node:latest
WORKDIR /app
COPY ./package.json .
RUN yarn
COPY . .
RUN yarn prisma generate
RUN mkdir ssl
CMD node src/app.js
EXPOSE 5000