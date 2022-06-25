# YAARS2 (Yet Another Audience Response System 2)

YAARS is a web-based application that allowes intuitive communication through with the audience of any kind of presentation.

## Features

### Management Panel

Through the YAARS management panel you can manage lectures and polls. Lectures give you the opportunity to organize polls. YAARS is user-based, which means that each user on a YAARS instance has private access to their lectures and polls. Administrators can create and delete users to give people in their organization access to YAARS.

### Client

The YAARS client gives participants of a presentation the opportunity to participate in polls. There is an individual link for each lecture that exists. As soon as a presenter starts a poll located within the lecture, a participant can send an answer. As soon as the presenter stops the poll, the participant can view the poll results on their device. The client is a web-app that works in all modern browsers. It is planned to provide the client as a Progressive Web App from version 1.1.

### Powerpoint-AddIn

The Powerpoint give the presenter the option, to include YAARS-powered polls directly into his PowerPoint-presentations. Installation instructions can be found in the management panel. The AddIn is user-specific, a user has access to all his lectures and polls in his version of the AddIn.

## Technologies

### Database

- PostgreSQL

### Backend

- Node.js
- Express as the server framework
- Socket.io for real time communication with clients
- Prisma as the ORM

### Admin

- React
- React-Admin

### Client

- React
- TailwindCSS
- Recharts

### Powerpoint-AddIn

- React
- TailwindCSS
- Recharts
- Office.js
