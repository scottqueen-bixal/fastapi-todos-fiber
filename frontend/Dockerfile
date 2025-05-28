FROM node:24-slim

WORKDIR /app

# Copy package files and the script
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code
COPY . .

# Expose Vite's dev server port
EXPOSE 5173

# Start Vite in development mode
CMD ["npm", "run", "dev", "--", "--host"]
