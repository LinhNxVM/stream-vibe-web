# React Stream Vibe Web Project

This is a React 19.2 application with modern tooling and authentication.

## Tech Stack
- React 19.2
- Vite (build tool)
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Redux Toolkit (state management)
- JWT authentication with refresh tokens

## Project Structure
- `/src/components` - Reusable UI components
- `/src/pages` - Page components
- `/src/store` - Redux store configuration
- `/src/services` - API services and authentication
- `/src/hooks` - Custom React hooks
- `/src/types` - TypeScript type definitions

## Development Guidelines
- Use TypeScript for all new files
- Follow React 19 best practices with concurrent features
- Use Shadcn/ui components for consistent design
- Implement proper error handling for authentication flows
- Use Redux Toolkit for complex state management
- Keep components small and focused

## Authentication Flow
- JWT-based authentication with access and refresh tokens
- Login and register forms with proper validation
- Automatic token refresh handling
- Protected routes with authentication guards