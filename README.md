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

## Observations

- Whenever you create an entity, import it manually in the app.module.ts file.

## Some useful nest-cli commands:

- `npx @nestjs/cli new <project_name>`
  - Command that initializes a project in NestJS
- `npx @nestjs/cli generate controller <controller_name>`
- `npx @nestjs/cli generate service <service_name>`
- `npx @nestjs/cli generate resource`
  - Each Resource has DTO (request body) and Entity (model)
- `npx @nestjs/cli generate app <microservice_name>`
- `npx @nestjs/cli generate library <library_name>`
