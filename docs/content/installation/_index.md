---
title: "Installation"
date: 2022-06-27T11:20:27+02:00
draft: false
---

## Production

### Requirements

Make sure you installed `git`, `docker` and `docker-compose` on your server.

### Get the source-code from GitHub

    git clone git@github.com:firlus/yaars2.git
    cd yaars2

### Edit environment variables to fit your use case

Use your preferred text editor to make changes to environment variables before starting the application

    vim .env

The default configuration looks like that:

    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    INITIAL_USERNAME=admin
    INITIAL_PASSWORD=admin
    HOSTNAME=localhost

{{< hint type=warning >}}
**Change unsafe credentials!**\
You definitely must change both the credentials for your database and your initial account!
{{< /hint >}}
