## Project Description

Full stack buy and sell website built with NodeJS, Express and PostgreSQL.

## Features

- Users
- Create new listings
- Delete listings if you are the owner or admin
- Admin account with superuser permissions
- Users can message owner of listing
- Various filtering options
- Users can update account information
- Users can favourite listings

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information

- username: `labber`
- password: `labber`
- database: `midterm`

3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`

- Check the db folder to see what gets created and seeded in the SDB

7. Run the server: `npm run local`

- Note: nodemon is used, so you should not have to restart your server

8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PostgreSQL 6.x

  ### NPM Dependencies

  - body-parser
  - chalk
  - dotenv
  - ejs
  - express
  - morgan
  - node-sass-middleware
  - pg
  - pg-native

  ### CDN Dependencies

  - Bootstrap
  - jQuery 3.2.1 min
  - moment.js 2.29.1 min
  - wow.js
  - animate.css
