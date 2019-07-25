FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/server
WORKDIR /srv/app/server
COPY package.json /srv/app/server
RUN npm install --production --silent
COPY . /srv/app/server

EXPOSE 8000

CMD ["npm", "start"]
