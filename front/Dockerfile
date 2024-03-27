FROM node:20-alpine AS builder

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "build/index.js"]
