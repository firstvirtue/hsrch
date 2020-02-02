FROM node:10.9.0-alpine

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN apk update && apk upgrade && apk add git

COPY package.json /app
#RUN npm rebuild
RUN npm i

ENV NODE_ENV=production

COPY . /app
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 80

CMD ["npm", "start"]
