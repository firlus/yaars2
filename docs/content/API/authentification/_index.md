---
title: "Authentification"
date: 2022-06-27T12:25:07+02:00
draft: true
---

Used to Log In and to verify JWT tokens.

## POST /auth/login

### Headers

none

### Body

#### Schema

| Property | Type   | Description |
| -------- | ------ | ----------- |
| name     | string |             |
| password | string |             |

#### Example

    {
        "name": "admin",
        "password": "admin"
    }

### Response

| Status Code                 | Description                                |
| --------------------------- | ------------------------------------------ |
| 200 (Success)               | Successfully logged in (created JWT token) |
| 400 (Bad Request)           | Request body does not match schema         |
| 401 (Forbidden)             | Login failed                               |
| 500 (Internal Server Error) | e.g. Database is not reachable             |
