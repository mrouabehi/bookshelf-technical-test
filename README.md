# Bookshelf Technical Test

## Installation

1. Clone the repository
2. Run `pnpm install`

## Running the app

### With Docker and Taskfile

1. Run `task start:dev`

### Only with Docker

1. Run `docker compose -f .docker/development/docker-compose.yml up --detach --build`

### Locally

1. Run `pnpm start`

## Access the API

You can access the API to this URL: `http://localhost:3000`

You can also import to Postman the file `Bookshelf.postman_collection.json` to test the API.