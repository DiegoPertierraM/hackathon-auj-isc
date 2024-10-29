# BACKEND with NestJS Impact Social Cup

```
back-end/
├── .env
├── .eslintrc.js
├── .gitignore
├── Dockerfile
├── README.md
├── docker-compose.yml
├── nest-cli.json
├── package-lock.json
├── package.json
├── prisma
│ ├── dev.db
│ ├── migrations/
│ └── schema.prisma
├── src
│ ├── app.controller.spec.ts
│ ├── app.controller.ts
│ ├── app.module.ts
│ ├── app.service.ts
│ ├── main.ts
│ ├── core
│ │ ├── guard/
│ │ ├── notificacion/
│ │ └── token/
│ ├── task
│ │ ├── dto/
│ │ ├── entities/
│ │ ├── task.controller.spec.ts
│ │ ├── task.controller.ts
│ │ ├── task.module.ts
│ │ ├── task.service.ts
│ │ └── task.service.spec.ts
│ ├── opportunity
│ │ ├── dto/
│ │ ├── entities/
│ │ ├── opportunity.controller.spec.ts
│ │ ├── opportunity.controller.ts
│ │ ├── opportunity.module.ts
│ │ ├── opportunity.service.ts
│ │ └── opportunity.service.spec.ts
│ ├── email
│ │ ├── email.controller.spec.ts
│ │ ├── email.controller.spec.ts
│ │ ├── email.module.ts
│ │ ├── email.service.ts
│ │ └── email.service.spec.ts
│ ├── collaborators
│ │ ├── dto/
│ │ ├── entities/
│ │ ├── collaborators.controller.spec.ts
│ │ ├── collaborators.controller.ts
│ │ ├── collaborators.module.ts
│ │ ├── collaborators.service.ts
│ │ └── collaborators.service.spec.ts
│ └── user
│ ├── dto/
│ ├── entities/
│ ├── user.controller.spec.ts
│ ├── user.controller.ts
│ ├── user.module.ts
│ ├── user.service.ts
│ └── user.service.spec.ts

├── test
│ ├── app.e2e-spec.ts
│ └── jest-e2e.json
└── tsconfig.json
```

## Route Description

Marked with (\*) need token

### USER:

```http
http://localhost:3000/user/
GET   - .../                        Fetch all user (*)
GET   - .../{id}                    Fetch user by ID (*)
GET   - .../email/{email}           Filter user by email (*)
GET   - .../login                   If user have token grant access (*)
POST  - .../login                   Authenticacion with email, password in the body request
POST  - .../                        With User model in body create a user (*)
POST  - .../{user.id}/task/{task.id}Add a task to an User(*)
PATCH - .../{id}                    With User info in body use to update user data (*)
DELETE- .../{id}                    Delete user by ID (*)
DELETE- .../{User.id}/task/{Task.id}Delete a task to an User (*)
```

### PARTICIPANT:

```http
http://localhost:3000/participant/
GET   - .../                        Fetch all participant (*)
GET   - .../{id}                    Fetch participant by ID (*)
POST  - .../                        With Participant model in body create participant (*)
PATCH - .../{id}                    With Participant info in body use to update participant data (*)
DELETE- .../{id}                    Delete participant by ID (*)
```

### TASK

```http
http://localhost:3000/task/
GET    - .../                      Fetch all tasks (*)
GET    - .../{id}                  Fetch task by ID (*)
GET    - .../{taskId}/users        Filter users by task id (*)
GET    - .../{userId}/tasks        Filter tasks by user id (*)
POST   - .../                      With Task model in body create task (*)
PATCH  - .../{id}                  With Task info in body use to update task data (*)
DELETE - .../{id}                  Delete task by ID (*)
```

### OPPORTUNITY

```http
http://localhost:3000/opportunity/
GET   - .../                      Fetch all opportunity (*)
GET   - .../{id}                  Fetch opportunity by ID (*)
POST  - .../                      With opportunity model in body create opportunity (*)
PATCH - .../{id}                  With opportunity info in body use to update opportunity data(*)
DELETE- .../{id}                  Delete opportunity by ID (*)
```

### COLLABORATORS

```http
http://localhost:3000/collaborators/
GET   - .../                      Fetch all collaborators (*)
GET   - .../{id}                  Fetch collaborator by ID (*)
POST  - .../                      With collaborators model in body create collaborator (*)
PATCH - .../{id}                  With collaborators info in body use to update collaborator data (*)
DELETE- .../{id}                  Delete collaborator by ID (*)
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
- [Eduardo](https://www.linkedin.com/in/eduardo-criado-web-developer/)
