ARG NODE_IMAGE=node:20.10.0-alpine

FROM $NODE_IMAGE

ENV NODE_ENV=development
ENV PORT 3000

RUN apk update && apk upgrade
RUN apk add python3 g++ make gcc
RUN npm install -g pnpm

RUN mkdir -p /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app

WORKDIR /usr/src/app

USER node

COPY --chown=node:node ../../package.json ../../pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile
RUN pnpm rebuild bcrypt

COPY --chown=node:node ../.. .

EXPOSE $PORT
