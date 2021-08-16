# Base image
FROM node:15.13-alpine
# Set working dir
WORKDIR /frontend
# Bundle app source and install app dependencies
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build

# Specify port
EXPOSE 3000

# Start app
CMD ["yarn", "start"]