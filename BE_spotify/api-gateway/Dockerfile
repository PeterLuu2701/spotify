FROM node:20

WORKDIR /root/app

COPY package*.json .

COPY yarn*.lock .

RUN yarn config set network-timeout 3000000

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 8080

CMD [ "yarn","run", "start:prod"]



















