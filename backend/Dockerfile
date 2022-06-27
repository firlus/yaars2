FROM node:latest
ARG DB_URL=postgresql://postgres:postgres@localhost:5432/postgres?schema=public
WORKDIR /app
COPY ./package.json .
RUN yarn
COPY . .
RUN yarn prisma generate
RUN mkdir ssl
ENV DATABASE_URL=${DB_URL}
CMD node src/app.js
EXPOSE 5000