FROM node:18-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli@16.2.0

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0"]