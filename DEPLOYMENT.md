# Deployment Guide

## Build Process

The project is configured for production deployment with the following optimizations:

### 1. Build the Project
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder with:
- Code splitting for better performance
- Minified CSS and JavaScript
- Source maps for debugging
- Proper asset optimization

### 2. Environment Variables

Before deployment, configure your environment variables:

1. Copy `.env.example` to `.env.production`
2. Update `VITE_API_URL` to your production API endpoint
3. Add any other required environment variables

### 3. Deployment Options

#### Static Hosting (Vercel, Netlify, etc.)
- Deploy the `dist/` folder
- Configure build command: `npm run build`
- Set output directory: `dist`

#### Traditional Server
- Upload the `dist/` folder to your web server
- Configure your server to serve static files from this directory

#### Docker
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 4. Post-Deployment Checklist

- [ ] Environment variables are correctly set
- [ ] API endpoints are accessible
- [ ] All pages load correctly
- [ ] Assets (CSS, JS, images) are loading
- [ ] Routing works properly
- [ ] No console errors

### 5. Performance Optimization

The build includes:
- Manual chunk splitting for vendor libraries
- Source maps for production debugging
- Optimized asset loading
- Proper base path configuration

### 6. Troubleshooting

If you encounter issues:
1. Check that all environment variables are set
2. Verify the API endpoints are accessible
3. Ensure the build completed successfully
4. Check browser console for errors

## Continuous Deployment

For automated deployments, set up CI/CD with:
- Build step: `npm run build`
- Deploy step: Upload `dist/` folder
- Environment variable management
