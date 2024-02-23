# Task Manager

A simple task manager API built with [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), and [PostgreSQL](https://www.postgresql.org/).

## Table of Contents

- [Task Manager](#task-manager)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Docker](#docker)
    - [Without Docker](#without-docker)
  - [Installation](#installation)
    - [Docker](#docker-1)
    - [Without Docker](#without-docker-1)

## Requirements

_Optional_:

- [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) or any other API client

_If running with Docker_:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

_If running without Docker_:

- [Node.js](https://nodejs.org/en/) (v20.11.1 or higher)
- [Pnpm](https://pnpm.io/) (v8.15.3 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v16.0 or higher)

## Installation

### Docker

1. Clone the repository

```sh
git clone git@github.com:LaulauChau/task-manager.git
```

2. Navigate to the project directory

```sh
cd task-manager
```

3. Copy the `.env.example` file to `.env` and update the environment variables

```sh
cp .env.example .env
```

4. Start the Docker containers

```sh
docker-compose up --build -d
```

You can now access the API at the port specified in the `.env` file.

### Without Docker

1. Clone the repository

```sh
git clone git@github.com:LaulauChau/task-manager.git
```

2. Navigate to the project directory

```sh
cd task-manager
```

3. Copy the `.env.example` file to `.env` and update the environment variables

```sh
cp .env.example .env
```

4. Install the dependencies

```sh
pnpm install
```

5. Start the PostgreSQL server

6. Run the migrations

```sh
pnpm dlx prisma db push
```

7. Start the server

```sh
pnpm run start:dev
```

You can now access the API at the port specified in the `.env` file.
