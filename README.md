# TravelTrucks — Camper Rental Platform

A modern, production-ready React application for renting campers and motorhomes. Built with Vite, React, TypeScript, Redux Toolkit, and React Router, this frontend application provides an intuitive interface for browsing, filtering, and booking camper rentals with a robust favorites system.

## 🚀 Project Overview

TravelTrucks is a comprehensive camper rental platform frontend that connects users with their perfect camping experience. The application features a responsive design with advanced filtering capabilities, detailed camper information, and a persistent favorites system that syncs across browser tabs. Built with modern web technologies including Vite + React + TypeScript, Redux Toolkit for state management, React Router v6 for navigation, Axios for API communication, and CSS Modules for styling. The backend API is powered by MockAPI at https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers.

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: CSS Modules with CSS Variables
- **Code Quality**: ESLint, Prettier, Commitlint, Husky
- **Testing**: Vitest
- **Deployment**: Vercel, Netlify ready

## 📁 Project Structure

```
src/
├── app/                    # App configuration
│   ├── store.ts           # Redux store setup
│   └── routes.tsx         # Route definitions
├── shared/                # Shared utilities and components
│   ├── api/               # API configuration and parsing
│   ├── components/        # Reusable UI components
│   │   ├── Badge/         # Badge component
│   │   ├── Button/        # Button component
│   │   ├── Checkbox/      # Checkbox component
│   │   ├── Input/         # Input component
│   │   ├── Loader/        # Loading spinner
│   │   ├── LoadMore/      # Load more button
│   │   ├── Rating/        # Star rating component
│   │   ├── Select/        # Select dropdown
│   │   └── Toast/         # Toast notifications
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility functions
│   ├── styles/            # Global styles and design tokens
│   └── types/             # TypeScript type definitions
├── features/              # Feature-based modules
│   ├── campers/           # Camper listing functionality
│   │   ├── components/    # CamperCard, CamperFilters, CamperGrid
│   │   ├── selectors.ts   # Camper selectors
│   │   ├── campers.slice.ts
│   │   └── campers.thunks.ts
│   ├── camper/            # Individual camper details
│   │   ├── components/    # BookingForm, CamperDetailsTable, etc.
│   │   ├── camper.slice.ts
│   │   └── camper.thunks.ts
│   ├── favorites/         # Favorites functionality
│   │   ├── favorites.slice.ts
│   │   └── __tests__/     # Favorites tests
│   └── ui/                # Page-level UI components
│       ├── Header/        # Site header
│       └── Hero/          # Hero section
└── pages/                 # Page components
    ├── HomePage.tsx       # Landing page
    ├── CatalogPage.tsx    # Camper catalog
    └── CamperPage.tsx     # Individual camper details
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- pnpm, yarn, or npm

### Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd neo-test-proj1
```

2. **Install dependencies:**

```bash
# Using pnpm (recommended)
pnpm install

# Or using yarn
yarn install

# Or using npm
npm install
```

3. **Create environment file:**

```bash
cp .env.example .env
```

4. **Configure environment variables:**

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://66b1f8e71ca8ad33d4f5f63e.mockapi.io
```

5. **Start development server:**

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm test` - Run tests with Vitest
- `pnpm test:ui` - Run tests with UI

## ✨ Features

### Core Functionality

- **Home Page**: Hero section with compelling call-to-action and navigation to catalog
- **Catalog Page**: Advanced filtering system with location, body type, and equipment filters
- **Camper Detail Page**: Comprehensive camper information including:
  - Image gallery with multiple photos
  - Detailed feature list with icons
  - Specifications table
  - Customer reviews and ratings
  - Interactive booking form with validation
- **Responsive Design**: Desktop-first approach with mobile optimization
- **Loading States**: Smooth loading indicators for all async operations
- **URL-based Filters**: Clean, shareable URLs with query parameters

### Favorites System

The favorites feature provides a seamless way for users to save and manage their preferred campers:

- **Toggle Button**: Heart icon button on camper cards and detail pages
- **Persistent Storage**: Favorites are stored in localStorage with key `tt:favorites:v1`
- **Cross-tab Sync**: Changes sync across browser tabs using `storage` events
- **Hydration**: Favorites are loaded on app initialization
- **Accessibility**: Proper ARIA attributes (`aria-pressed`) for screen readers
- **Integration**: Available in both catalog cards and individual camper pages

#### Favorites Implementation Details

```typescript
// Redux state structure
interface FavoritesState {
  ids: string[]; // Array of camper IDs
  hydrated: boolean; // Whether data is loaded from localStorage
  version: 1; // Version for future migrations
}

// Storage key for localStorage
const STORAGE_KEY = 'tt:favorites:v1';
```

## 🎨 Design System

### Design Tokens

The application uses a comprehensive design system with consistent tokens:

```css
/* Colors */
--tt-text: #101828; /* Primary text */
--tt-muted: #475467; /* Secondary text */
--tt-accent: #e44848; /* Primary accent */
--tt-accent-hover: #d84343; /* Accent hover state */
--tt-star: #ffc531; /* Rating stars */

/* Spacing */
--tt-gap-200: 12px;
--tt-gap-300: 16px;
--tt-gap-400: 24px;
--tt-gap-500: 32px;

/* Border Radius */
--tt-radius-sm: 10px;
--tt-radius-md: 12px;
--tt-radius-lg: 20px;
--tt-radius-pill: 200px;

/* Typography */
--tt-fs-h2: 24px;
--tt-lh-h2: 32px;
--tt-fs-body: 16px;
--tt-lh-body: 24px;
```

### Shared Components

- **Button**: Primary, secondary, and ghost variants with loading states
- **Badge**: Status indicators and category labels
- **Input**: Form inputs with validation states
- **Select**: Dropdown selections with search
- **Rating**: Star rating display component
- **Loader**: Spinning loading indicator
- **Toast**: Success and error notifications

## 🔄 State Management

### Redux Store Structure

```typescript
{
  campers: {
    list: Camper[],
    filters: {
      location: string,
      type: string[],
      equipment: string[]
    },
    pagination: {
      page: number,
      hasMore: boolean
    },
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  camper: {
    current: Camper | null,
    reviews: Review[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  favorites: {
    ids: string[],
    hydrated: boolean,
    version: 1
  }
}
```

### Key Features

- **Filtering**: Location, body type, and equipment filters with URL persistence
- **Pagination**: Load more functionality with infinite scroll
- **Favorites**: Persistent favorites using localStorage with cross-tab sync
- **Error Handling**: Comprehensive error states and retry logic
- **Loading States**: Granular loading indicators for better UX

## 🧪 Development Guidelines

### Code Standards

- **Component-based Architecture**: Modular, reusable components
- **TypeScript Strict Mode**: Full type safety with strict configuration
- **DRY Principles**: Shared utilities and components
- **CSS Modules**: Scoped styling with design tokens
- **Redux Toolkit**: Modern Redux patterns with slices and thunks

### Development Workflow

1. **Branch Naming**: Use `feature/*`, `fix/*`, `docs/*` prefixes
2. **Code Quality**: Run `pnpm lint` and `pnpm format:check` before commits
3. **Testing**: Write tests for new features and bug fixes
4. **Pull Requests**: Include screenshots for UI changes and ensure all checks pass

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. The `vercel.json` configuration is already set up:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ],
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```
3. Deploy automatically on push to main branch

### Netlify

1. Connect your repository to Netlify
2. The `netlify.toml` configuration is already set up:

   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
pnpm build

# The 'dist' folder contains the production build
# Upload to your hosting provider
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

**Live Demo**: [Deploy to Vercel](https://vercel.com/new) or [Deploy to Netlify](https://app.netlify.com/start)
