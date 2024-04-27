FROM node:20-alpine

WORKDIR /code
COPY . .

# RUN npm install -g npm@10.5.1
RUN npm install

CMD [ "npm", "start" ]

EXPOSE 8000