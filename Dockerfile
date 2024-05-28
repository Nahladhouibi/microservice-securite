# Stage 1: Build Node.js app
FROM node:16 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Optionally, if your microservice requires any build step, perform it here
# Example: RUN npm run build
# Installer node-pre-gyp globalement
RUN npm install -g node-pre-gyp

# Rebuild bcrypt module
RUN npm rebuild bcrypt --build-from-source

# Stage 2: Final image with only Node.js runtime
FROM node:16 as final

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

# Expose port 6000 for Node.js application
EXPOSE 6000 

# Start the Node.js application
CMD ["node", "index.js"]
