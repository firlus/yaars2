FROM node:latest
WORKDIR /app
COPY ./package.json .
RUN yarn
COPY . .
RUN yarn prisma generate
CMD node src/app.js
EXPOSE 5000