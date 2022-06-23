FROM node:latest
WORKDIR /app
RUN yarn add -D prisma
RUN yarn add @prisma/client bcrypt dotenv
COPY . .
CMD sh docker-start.sh