FROM node:alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD ["node", "app.js"]

# app.yaml:

# runtime: custom
# env: flex

# env_variables:
#   MONGO_USER: '...'
#   MONGO_PASSWORD: '...'
#   MONGO_DEFAULT_DATABASE: '...'
