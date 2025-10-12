# React Frontend Docker Setup

This directory contains Docker configuration for the React (Vite) frontend application.

## 🚀 Quick Start

### Production Mode
```bash
# Build and run the application
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Access the application at http://localhost:80
```

### Development Mode (with hot reload)
```bash
# Build and run in development mode
docker-compose -f docker-compose.dev.yml up --build

# Run in detached mode
docker-compose -f docker-compose.dev.yml up -d --build

# Access the application at http://localhost:3001
```

## 📋 Services

### Production (`docker-compose.yml`)
- **react-app**: React application with Nginx (Port: 80)

### Development (`docker-compose.dev.yml`)
- **react-app**: React with Vite dev server and hot reload (Port: 3001)

## 🔧 Configuration

### Environment Variables
The following environment variables are set:

**Both modes:**
- `VITE_API_URL=http://localhost:3000` (Backend API URL)

### Nginx Configuration (Production)
The production build uses Nginx with:
- Gzip compression
- Security headers
- Client-side routing support
- Static asset caching
- Health check endpoint
- Optional API proxy (commented out)

## 🛠️ Commands

```bash
# Stop services
docker-compose down

# View logs
docker-compose logs react-app

# Rebuild application
docker-compose build react-app

# Run only build (no start)
docker-compose build

# Development with logs
docker-compose -f docker-compose.dev.yml up --build
```

## 🔍 Health Checks

The application includes health checks:
- **Production**: http://localhost:80/health
- **Development**: Vite dev server built-in health

## 🌐 API Configuration

To connect to your NestJS backend:

1. **Same machine**: Use `http://localhost:3000`
2. **Different machine**: Update `VITE_API_URL` in docker-compose files
3. **Production**: Update to your actual backend URL

### Updating API URL
Edit the environment section in your docker-compose file:
```yaml
environment:
  VITE_API_URL: https://your-backend-api.com
```

## 📁 Volume Mounts

- **Development**: `.:/app` - Source code hot reload
- **Development**: `/app/node_modules` - Prevent node_modules override

## 🚀 Deployment Notes

### Production Deployment
1. Update `VITE_API_URL` to your production backend URL
2. The application will be built and served via Nginx
3. All routes are handled by the React router (SPA mode)

### Development Features
- Hot module replacement (HMR)
- Source maps
- Development tools
- Fast refresh

## 🔧 Customization

### Nginx Configuration
Edit `nginx.conf` to customize:
- Security headers
- Caching policies  
- API proxy rules
- Compression settings

### Vite Configuration
The development server respects your `vite.config.ts` settings including:
- Plugins
- Build options
- Dev server options
- Environment variables