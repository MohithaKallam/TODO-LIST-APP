# Use Node LTS
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy rest of the code
COPY . .

# Expose backend port (change if your app runs on different port)
EXPOSE 5000

# Start backend
CMD ["npm", "start"]
