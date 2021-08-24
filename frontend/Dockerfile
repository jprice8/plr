# Base image
FROM node:15.13-alpine
WORKDIR /frontend
# Bundle app source and install app dependencies
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN yarn install

# Specify port
EXPOSE 3000

# Start app
CMD ["yarn", "start"]