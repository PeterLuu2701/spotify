FROM node:20

WORKDIR /root/app

COPY package*.json .

COPY yarn*.lock .

RUN yarn config set network-timeout 3000000

RUN yarn install

COPY ./src/prisma ./src/prisma/
RUN yarn prisma generate --schema ./src/prisma/schema.prisma

COPY . .

RUN yarn run build

EXPOSE 8080

CMD [ "yarn","run", "start:prod"]
