# Portfolio Web Application

## Overview

This is a modern, interactive portfolio website for Hans Gunawan, a full-stack developer and aspiring data analyst. The application is built with React and Express.js, featuring smooth animations, responsive design, and a contact form system. The portfolio showcases skills, projects, and professional experience through an engaging user interface with carefully crafted animations and a dark theme design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React.js with TypeScript for type safety and better development experience
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with CSS custom properties for consistent theming and responsive design
- **UI Components**: Radix UI primitives with shadcn/ui component library for accessible, pre-styled components
- **Animations**: Framer Motion for smooth, performant animations throughout the application
- **State Management**: TanStack Query (React Query) for server state management and API data fetching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for consistent typing across the full stack
- **API Design**: RESTful API endpoints with proper error handling and request logging
- **Validation**: Zod schemas for runtime type validation and data sanitization
- **Session Management**: Basic in-memory storage with extensible interface for future database integration

### Development Environment
- **Build Tool**: Vite for fast development server and optimized production builds
- **Development Features**: Hot module replacement, runtime error overlay for better developer experience
- **Code Quality**: TypeScript strict mode enabled with comprehensive type checking
- **Asset Management**: Static asset serving with proper path resolution

### Database Schema
The application currently uses in-memory storage but is architected to easily support database integration:
- **Contact Messages**: Schema includes name, email, message with validation constraints
- **User System**: Basic user schema prepared for future authentication features
- **Drizzle ORM**: Configured for PostgreSQL with migration support ready for production deployment

### Styling and Theming
- **Design System**: Dark theme with teal primary color and orange accent color
- **Typography**: Custom font stack using Poppins, Inter, and JetBrains Mono for different use cases
- **Responsive Design**: Mobile-first approach with comprehensive breakpoint coverage
- **CSS Architecture**: CSS custom properties for consistent theming and easy maintenance

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18+ with TypeScript support, React DOM, and React development tools
- **Express.js**: Server framework with middleware for JSON parsing, URL encoding, and CORS handling
- **Vite**: Modern build tool providing fast development server and optimized production builds

### UI and Styling Libraries
- **Tailwind CSS**: Utility-first CSS framework with PostCSS for processing
- **Radix UI**: Comprehensive set of accessible UI primitives including dialogs, tooltips, forms, and navigation components
- **Framer Motion**: Animation library for smooth transitions and interactive elements
- **shadcn/ui**: Pre-built component library built on top of Radix UI with consistent styling

### Data Management and Validation
- **TanStack Query**: Server state management with caching, background updates, and error handling
- **Zod**: TypeScript-first schema validation library for runtime type checking
- **React Hook Form**: Form library with minimal re-renders and built-in validation support

### Development and Build Tools
- **TypeScript**: Static type checking for both client and server code
- **ESBuild**: Fast JavaScript bundler for server-side code compilation
- **PostCSS**: CSS processing with autoprefixer for browser compatibility

### Database and ORM (Configured but not yet implemented)
- **Drizzle ORM**: TypeScript ORM configured for PostgreSQL with migration support
- **Neon Database**: Serverless PostgreSQL database provider integration ready

### Font and Icon Libraries
- **Google Fonts**: Poppins, Inter, and JetBrains Mono font families for typography hierarchy
- **Font Awesome**: Icon library for social media links and UI elements

### Utility Libraries
- **clsx and tailwind-merge**: Utility functions for conditional CSS class management
- **date-fns**: Date manipulation and formatting library
- **nanoid**: Secure random ID generation for unique identifiers