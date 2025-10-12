# Multi-stage build for React Vite application
FROM node:20-alpine AS development

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from development stage
COPY --from=development /app/dist /usr/share/nginx/html

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S react -u 1001

# Change ownership of nginx directories
RUN chown -R react:nodejs /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html
RUN chmod -R 755 /var/cache/nginx /var/run /var/log/nginx

# Switch to non-root user
USER react

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]