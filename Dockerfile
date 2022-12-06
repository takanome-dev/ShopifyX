FROM node:18.12.1-alpine3.16

WORKDIR /app

# ENV PATH=$PATH:/home/node/.npm-global/bin

COPY package.json .npmrc ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "run", "dev" ]
