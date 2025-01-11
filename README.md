# KYC System Frontend Application

A modern, responsive React application built with TypeScript for managing KYC (Know Your Customer) workflows. The application features role-based access control, real-time data updates, and comprehensive reporting capabilities.

The application is deployed and accessible at: [https://www.kyc-system-frontend.vercel.app/login](https://kyc-system-frontend.vercel.app/dashboard)


## Features

### Authentication & Authorization
- JWT-based authentication with automatic token refresh
- Role-based access control (Admin/User)
- Protected routes with role-based permissions
- Unauthorized access handling
- Guest-only routes for authentication pages

### User Dashboard
- KYC submission status tracking
- Document upload functionality
- Status notifications and alerts
- Interactive form validation
- Submission history view

### Admin Features
- KYC submission management
- Document review interface
- Comprehensive reporting dashboard
- Status update workflow
- Analytics visualization

### Core Technical Features
- React Query for efficient data fetching and caching
- Lazy loading and code splitting
- Error boundary implementation
- Theme switching (light/dark mode)
- Responsive design
- Type-safe development with TypeScript

## Architecture & Design Patterns

### Project Structure
```
src/
├── components/            # Shared UI components
├── features/             # Feature-based organization
│   ├── admin/           # Admin-specific features
│   ├── auth/            # Authentication
│   ├── dashboard/       # User dashboard
│   └── profile/         # User profile
├── config/              # Configuration files
├── lib/                 # Utility functions
├── routes/              # Route definitions
└── utils/               # Helper functions
```

### Key Design Patterns
- Feature-based architecture
- Context-based state management
- Render props pattern
- Component composition
- Custom hooks for reusable logic
- Error boundary pattern

### Query Cache Management
The current implementation relies primarily on time-based cache invalidation through React Query's built-in intervals. While this provides basic functionality, it lacks sophisticated cache invalidation strategies that would be beneficial in a production environment. Due to time constraints, several important cache management features were not implemented, including:

- Mutation-based cache invalidation for immediate updates after data changes
- Selective cache invalidation based on business rules and data dependencies
- Optimistic updates for improved user experience
- Cache persistence strategies for offline capability
- Cross-tab cache synchronization

## Technical Stack

- **Core**: React 18, TypeScript
- **Routing**: React Router 6
- **State Management**: React Query, Context API
- **UI Components**: Shadcn/UI
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Build Tool**: Vite
- **Type Checking**: TypeScript

## Technical Notes & Trade-offs

Due to the assessment's time constraints (3 days), several features and improvements were identified for future implementation:

**Implemented Features:**
- Core authentication flow
- Basic KYC submission workflow
- Admin dashboard with essential features
- Role-based access control
- Theme switching capability

**Future Improvements:**
1. User Experience:
   - Multi-step form for KYC submission
   - Notes/comments section for submissions
   - Advanced filtering and search capabilities
   - Bulk action functionality
   - Export features for data

2. Real-time Features:
   - WebSocket integration for live updates
   - Recent activity feed
   - Real-time alerts for pending reviews

3. Code Quality:
   - Query keys builder for consistency
   - Debouncing for search inputs
   - Dynamic form generation from JSON schema
   - Enhanced error handling
   - Implement component testing using React Testing Library for UI components
   - Add end-to-end testing with Cypress or Playwright for critical user flows


4. Performance:
   - Advanced caching strategies
   - Optimized bundle splitting
   - Image optimization pipeline

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yazan-Ali-01/kyc-system-frontend
   cd kyc-system-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file based on `.env.example`:
   ```
   VITE_API_URL=http://localhost:3000/api/v1
VITE_SESSION_DURATION_HOURS=14
VITE_REFRESH_TOKEN_INTERVAL_MINUTES=14
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Build for Production:**
   ```bash
   npm run build
   npm run preview
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Components Documentation

The application uses a combination of custom components and Shadcn/UI components:

### Custom Components
- `ErrorBoundary` - Handles component-level errors
- `Layout` - Main application layout
- `AuthProvider` - Authentication context provider
- `ThemeProvider` - Theme management

### UI Components
- Alerts
- Badges
- Buttons
- Cards
- Modals
- Forms
- Tables

## Routing Structure

- `/` → Dashboard
- `/login` → Login page (guest only)
- `/register` → Registration page (guest only)
- `/dashboard` → User dashboard
- `/profile` → User profile
- `/admin/*` → Admin routes
  - `/admin/kyc-reviews` → KYC management
  - `/admin/reports` → Analytics dashboard

## Security Considerations

- Protected routes implementation
- Token-based authentication
- Secure cookie handling
- Input sanitization

## Error Handling

- Global error boundary
- API error handling
- Form validation errors
- Network error handling
- Fallback UI components

## Monitoring & Debugging

- React Query DevTools integration
- Performance monitoring
- Error logging
- API request tracking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
