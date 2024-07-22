## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Database setup

Add your db configuration into your .env file

1. open psql and run the following commands to create the db
   CREATE USER auction_user WITH ENCRYPTED PASSWORD 'your_password';
   CREATE DATABASE auction_db;
   GRANT ALL PRIVILEGES ON DATABASE auction_db TO auction_user;

2. generate a random jwt token with this cli
   `head -c 32 /dev/urandom | base64` and paste it on your .env file

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
