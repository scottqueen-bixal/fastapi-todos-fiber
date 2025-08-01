FROM node:24-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

# Copy the rest of the app's code
COPY . .

# Expose Vite's dev server port
EXPOSE 5173

# Start Vite in development mode
CMD ["npm", "run", "dev", "--", "--host"]
