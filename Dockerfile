FROM node:18.12.1-alpine3.16

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

USER node

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

ENV PATH=$PATH:/home/node/.npm-global/bin

COPY package.json .npmrc ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD [ "yarn", "dev" ]
