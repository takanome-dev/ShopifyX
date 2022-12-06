FROM node:18.12.1-alpine3.16

WORKDIR /app

RUN addgroup app && adduser -S -G app app

# ENV PATH=$PATH:/home/node/.npm-global/bin

COPY package.json .npmrc ./

RUN yarn install

COPY . .

EXPOSE 3000:8080

CMD [ "yarn", "run", "dev" ]
