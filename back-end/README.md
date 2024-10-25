# BACKEND with NestJS Impact Social Cup

## Route Description

Marked with (\*) need token

### USER:

```http
http://localhost:3000/user/
GET   - .../              Fetch all user (*)
GET   - .../{id}          Fetch user by ID (*)
GET   - .../email/{email} Filter user by email (*)
GET   - .../login         If user have token grant access (*)
POST  - .../login         Authenticacion with email, password in the body request
POST  - .../              With User model in body create a user (*)
PATCH - .../{id}          With User info in body use for update user data (*)
DELETE- .../{id}          Delete user by ID (*)
```

### PARTICIPANT:

```http
http://localhost:3000/participant/
GET   - .../              Fetch all participant (*)
GET   - .../{id}          Fetch participant by ID (*)
POST  - .../              With Participant model in body create participant (*)
PATCH - .../{id}          With Participant info in body use for update participant (*)
DELETE- .../{id}          Delete participant by ID (*)
```

### OPPORTUNITY

```http
http://localhost:3000/opportunity/
GET   - .../              Fetch all opportunity (*)
GET   - .../{id}          Fetch opportunity by ID (*)
POST  - .../              With opportunity model in body create opportunity (*)
PATCH - .../{id}          With opportunity info in body use for update opportunity (*)
DELETE- .../{id}          Delete opportunity by ID (*)
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

## Support

## Author

- [Daniele Quintiliani](www.linkedin.com/in/daniele-quintiliani)
- [Eduardo](www.linkedin.com/in/......)
