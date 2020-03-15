# Fullstack

This project was generated using [Nx](https://nx.dev).

<p><img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" width="200"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Monorepo objectives

### Base functionalities

- [x] Angular PWA + Nestjs API, in one repository
- [x] code formatting & linting pre-commit hook with husky & lint-staged
- [x] one .env file for Pwa & Api, run `npm run set-env` to update prduction & development environment.ts files
- [ ] run all the stack in containers with docker-compose
- [ ] code documentation for PWA & API with compodoc

### Pwa functionalities

- [ ] is a Progressive Web Application (Lighthouse checked)
- [ ] follow Material design guidelines, responsive...
- [ ] Dynamic color themes (Dark/light)
- [ ] User authentication system :
  - [ ] sign up, sign in, jwt authentication (is user signed ?)
  - [ ] email confirmation (is user email confirmed ?)
  - [ ] user can update his informations
  - [ ] user can upload his profile avatar (image resized, progressive encoding)

### Api functionalities

- [ ] switch from Express to Fastify for better performances
- [ ] Postgres DB connected to Nestjs API, with TypeORM
- [ ] Graphql implementation, auto-schemas based on Typescript classes with Type-Graphql
- [ ] User authentication system :
  - [ ] sign up, sign in, jwt authentication (is user signed ?)
  - [ ] email confirmation (is user email confirmed ?)
  - [ ] user can update his informations
  - [ ] user can upload his profile avatar (image resized, progressive encoding)

## How to use this monorepo

### Run it in your local dev environment + container for database

```bash
# install dependencies
npm i
# run Postgres Database
docker-compose db -d
# run Nest Application Programming Interface
npm start api
# run Angular Progressive Web App
npm start pwa
```

### Run apps in containers only

```bash
# install dependencies
npm i
# build all apps in production mode
npm run build --project api && npm run build --project pwa
# run all apps in containers
docker-compose up
```
