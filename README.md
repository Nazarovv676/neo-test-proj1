# TravelTrucks - Camper Rental Platform

A modern, production-ready React application for renting campers and motorhomes. Built with Vite, React, TypeScript, Redux Toolkit, and React Router.

## 🚀 Features

- **Home Page**: Hero section with call-to-action
- **Catalog Page**: Filterable camper listings with pagination
- **Camper Details**: Gallery, features, reviews, and booking form
- **Favorites**: Save and manage favorite campers
- **Responsive Design**: Mobile-first approach with modern UI
- **Type Safety**: Full TypeScript implementation
- **State Management**: Redux Toolkit with async thunks
- **Code Splitting**: Lazy-loaded routes for optimal performance

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router v6+
- **HTTP Client**: Axios
- **Styling**: CSS Modules with CSS Variables
- **Code Quality**: ESLint, Prettier, Commitlint
- **Deployment**: Vercel, Netlify ready

## 📁 Project Structure

```
src/
├── app/                    # App configuration
│   ├── store.ts           # Redux store setup
│   └── routes.tsx         # Route definitions
├── shared/                # Shared utilities and components
│   ├── api/               # API configuration
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility functions
│   ├── styles/            # Global styles and variables
│   └── types/             # TypeScript type definitions
├── features/              # Feature-based modules
│   ├── campers/           # Camper listing functionality
│   ├── camper/            # Individual camper details
│   └── ui/                # Page-level UI components
└── pages/                 # Page components
    ├── HomePage.tsx
    ├── CatalogPage.tsx
    └── CamperPage.tsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd traveltrucks
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Start development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://66b1f8e71ca8ad33d4f5f63e.mockapi.io
```

### API Endpoints

The application uses the following API endpoints:

- `GET /campers` - List campers with filtering support
- `GET /campers/:id` - Get individual camper details

## 🎨 Design System

The application uses a consistent design system with:

- **Colors**: Primary red (#E44848), secondary grays, accent yellow
- **Typography**: Inter font family with consistent sizing
- **Spacing**: 4px base unit with consistent scale
- **Components**: Reusable UI components with variants
- **Responsive**: Mobile-first design with breakpoints

## 🔄 State Management

### Redux Store Structure

```typescript
{
  campers: {
    list: Camper[],
    filters: Filters,
    pagination: PaginationState,
    favorites: string[]
  },
  camper: {
    current: Camper | null,
    reviews: Review[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
  }
}
```

### Key Features

- **Filtering**: Location, body type, and equipment filters
- **Pagination**: Load more functionality with infinite scroll
- **Favorites**: Persistent favorites using localStorage
- **Error Handling**: Comprehensive error states and retry logic

## 🧪 Testing & Quality

### Code Quality

- **ESLint**: Configured with TypeScript and React rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking enabled
- **Commitlint**: Conventional commit messages

### Manual Testing Checklist

- [ ] Home → "View Now" navigates to /catalog
- [ ] Filters update results; previous results cleared on change
- [ ] "Load more" appends additional cards respecting current filters
- [ ] Favorites persist across refresh
- [ ] Prices rendered with two decimals and euro prefix
- [ ] "Show more" opens detail in new tab (/catalog/:id)
- [ ] Camper page shows gallery, features, details table, reviews
- [ ] Booking form validates and shows success toast on submit
- [ ] Loader visible during async fetches
- [ ] Deployed link works with client-side routing (SPA settings)

## 🚀 Deployment

### Vercel

1. Connect your repository to Vercel
2. The `vercel.json` configuration is already set up
3. Deploy automatically on push to main branch

### Netlify

1. Connect your repository to Netlify
2. The `netlify.toml` configuration is already set up
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 🔧 Development

### Adding New Features

1. Create feature folder in `src/features/`
2. Add Redux slice and thunks if needed
3. Create components in feature folder
4. Add routes in `src/app/routes.tsx`
5. Update types in `src/shared/types/`

### Component Guidelines

- Use CSS Modules for styling
- Follow the established component structure
- Include TypeScript interfaces
- Add proper error boundaries
- Implement loading states

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern camper rental platforms
- Icons and emojis for visual elements
- Mock API provided by MockAPI.io

---

**Live Demo**: [Deploy to Vercel](https://vercel.com/new) or [Deploy to Netlify](https://app.netlify.com/start)
