# Set the base image to NodeJS
FROM node:latest

# File Author / Maintainer
LABEL maintainer="Arthur Costa da Silva <root.arthur@gmail.com>"

# Define working directory
WORKDIR /app

# Copy package and lock
COPY package.json /app
COPY package-lock.json /app

# Install pm2 global
RUN npm i pm2 -g

# Install nodemon global
RUN npm i nodemon -g

# Install dependences
RUN npm install

# Copy directory
COPY . /app

# Copy pm2 process.json to src/
COPY dockers/api/process.json /app/src/process.json

# Define working directory
ADD . /app

# Expose ports api
EXPOSE  3000

# Set volume
VOLUME [ "/app" ]

# Entrypoint
# ENTRYPOINT ["pm2-docker"]

# Run app using pm2
# CMD ["pm2-docker", "start", "process.json"]

# RUN app using nodemon
CMD [ "npm", "run", "start"  ]

