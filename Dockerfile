FROM node:18.9-buster-slim AS builder

ARG HOST
ENV HOST $HOST

ARG PORT
ENV HOST $PORT

WORKDIR /app

COPY . ./

RUN npm ci --ignore-scripts

RUN npm run build

FROM node:18.9-buster-slim AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts --only=production

COPY --from=builder --chown=node:node /app/dist ./dist/

EXPOSE 3000

USER node

CMD ["npm", "start"]
