FROM node:24.4.1-alpine

WORKDIR /app

# Copy only package.json first to leverage Docker layer caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code
COPY . ./

# Expose Vite's dev server port
EXPOSE 5173

# Start Vite in development mode
CMD ["npm", "run", "dev", "--", "--host"]
