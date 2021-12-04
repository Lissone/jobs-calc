<h1 align="center">
  <img alt="JobsCalc logo" title="JobsCalc" src="https://i.imgur.com/Veqm7Gh.png" width="220px" />
</h1>

<p align="center">
  <a href="#description">Description</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#requirements">Requirements</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#usage">Usage</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#demonstration">Demonstration</a>
</p>
<br />
<p align="center">
  <img src="https://img.shields.io/static/v1?label=license&message=MIT" alt="License">
  <img src="https://img.shields.io/github/repo-size/Lissone/jobs-calc" alt="Repo size" />
  <img src="https://img.shields.io/github/languages/top/Lissone/jobs-calc" alt="Top lang" />
  <img src="https://img.shields.io/github/stars/Lissone/jobs-calc" alt="Stars repo" />
  <img src="https://img.shields.io/github/forks/Lissone/jobs-calc" alt="Forks repo" />
  <img src="https://img.shields.io/github/issues-pr/Lissone/jobs-calc" alt="Pull requests" >
  <img src="https://img.shields.io/github/last-commit/Lissone/jobs-calc" alt="Last commit" />
</p>

<p align="center">
  <a href="https://github.com/Lissone/jobs-calc/issues">Report bug</a>
  ·
  <a href="https://github.com/Lissone/jobs-calc/issues">Request feature</a>
</p>

<br />

## Description

JobsCalc is a calculation estimation application for freelance projects, where it is possible to register and exclude jobs (projects), obtaining a cost estimate for each job. Furthermore, it is possible to plot the time value of the person who will be using the system.

Project developed in my first rocketseat marathon, in a way that changed my way of seeing my professional career and my motivation to study. Taught by Mayk Brito and Jakeliny Gracielly from Discover 2021.

## Requirements

- [Nodejs](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com/)
- [SqlServer](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

## Technologies

### Backend (Api)

- NodeJs
- Javascript
- Express
- TypeORM
- SqlServer

### Front End

- HTML
- EJS
- CSS
- JavaScript

## Layout

You can view the project layout via this <a href="https://www.figma.com/file/s4fytPFbDiSkv4GPSfKaLE/Jobs-Planning" target="_blank">link</a>.

## Usage

You can clone it on your pc using the command:

```bash
git clone https://github.com/Lissone/jobs-calc.git
cd jobs-calc
```

Install dependencies using:

```bash
yarn
#or
npm install
```

### Database configuration

You must create the database before running an api (dbJobsCalc).

```typescript
// .\src\config\dbConfig.js

const connection = createConnection({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [**Entities**],
  synchronize: true,
  logging: false,
  options: {
    enableArithAbort: true
  }
})
```

Need to add environment variables:

```bash
# ./.env

# DEFAULT
PORT=5000

DB_USERNAME=sa
DB_PASSWORD=123456
DB_NAME=dbJobsCalc
DB_HOST=localhost
```

Run application:

```bash
yarn dev
#or
npm run dev
```

## Demonstration

<p align="center">
  <img alt="jobscalc demo" src=".github/jobscalc.png" width="100%">
</p>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<h4 align="center">
  Made with ❤️ by <a href="https://github.com/Lissone" target="_blank">Lissone</a>
</h4>

<hr />
