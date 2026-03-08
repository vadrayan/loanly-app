# ---------- Stage 1: Build React App ----------
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./

# Copy source code

# Build the app
RUN npm install

COPY . .

RUN npm run build && ls -la dist 


# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine



# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf


# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
