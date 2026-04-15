# Task Management Frontend - Angular 21

A modern, responsive Angular 21 application for managing tasks with a Material Design 3 UI, built with best practices for UX and component architecture.

## 🎯 Features

- ✅ **Material Design 3**: Modern, consistent UI with Material Design 3 principles
- ✅ **Responsive Layout**: Mobile-first responsive design with breakpoints at 1200px, 768px, and 480px
- ✅ **Task Management**: Create, read, update, delete, and filter tasks
- ✅ **Status Tracking**: Track task status (pending, in-progress, completed)
- ✅ **Reusable Components**: Well-designed component library with UI components
- ✅ **Type Safety**: Full TypeScript with strict mode
- ✅ **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels
- ✅ **Smooth Animations**: Fluid transitions and animations for better UX

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- Angular CLI 21+
- Backend API running on `http://localhost:8080`

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

Start the development server:

```bash
npm start
# or
ng serve
```

The application will be available at: **http://localhost:4200**

The app will automatically reload whenever you modify any source files.

### 3. Production Build

Build for production:

```bash
npm run build
# or
ng build --configuration production
```

Output files are in the `dist/` directory.

## 🐳 Docker

### Build Frontend Image

docker build -t task-frontend .

### Run Frontend Container

docker run --rm -p 4200:80 task-frontend

Frontend will be available at: http://localhost:4200

### Full Stack with Docker Compose

From repository root:

docker compose up --build

This starts MySQL, backend, and frontend together.

## 📁 Project Structure

For a detailed guide on the project structure and components, see [FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)

```
src/
├── app/
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/             # Reusable UI components
│   │   │   ├── layout/         # Layout components
│   │   │   └── task-card/      # Task display component
│   │   ├── models/             # TypeScript interfaces
│   │   ├── services/           # API services
│   │   └── index.ts            # Barrel exports
│   ├── app.ts                  # Root component
│   ├── app.html                # Root template
│   └── app.scss                # Root styles
├── styles.scss                 # Global styles
├── main.ts                     # Bootstrap
└── index.html                  # HTML entry
```

## 🎨 UI Components

### Available Components

1. **Button** - Customizable button with 4 variants
2. **Card** - Container component with elevation
3. **Input** - Form input with validation and hints
4. **Accordion** - Expandable panel component
5. **Header** - Navigation header with profile menu
6. **Page Container** - Responsive page layout
7. **Task Card** - Task display card with actions

For detailed component documentation, see [FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)

## 🔌 API Integration

The frontend communicates with the backend API running on `http://localhost:8080`.

For Docker Compose, the browser still accesses backend via `http://localhost:8080`.

### Task Service Endpoints

```
GET    /api/tasks              # Get all tasks
GET    /api/tasks/:id          # Get task by ID
POST   /api/tasks              # Create new task
PUT    /api/tasks/:id          # Update task
DELETE /api/tasks/:id          # Delete task
GET    /health                 # Health check
```

## 🎯 Usage

### Creating a Task

1. Click "New Task" button in the header
2. Enter task title (required)
3. Enter description (optional)
4. Click "Create" button

### Updating Task Status

1. Open task card
2. Click the status menu icon (⋮)
3. Select new status from dropdown
4. Status updates automatically

### Deleting a Task

1. Open task card
2. Click the delete button (trash icon)
3. Confirm deletion in the prompt

## 🏗️ Architecture

### Component Hierarchy

```
App (root)
├── Header (Navigation)
├── Page Container (Layout)
│   ├── Create Form (Conditional)
│   │   ├── Input (Title)
│   │   └── Input (Description)
│   └── Tasks Grid
│       └── Task Cards (Repeated)
└── Router Outlet
```

### Data Flow

```
App Component
    ↓
TaskService (HTTP Requests)
    ↓
Backend API
    ↓
Database
```

## 📱 Responsive Breakpoints

```scss
// Desktop (1200px+)
- Full grid layout with cards
- Multiple cards per row

// Tablet (769px - 1199px)  
- Adjusted grid with fewer columns
- Optimized spacing

// Mobile (480px - 768px)
- Single column layout
- Touch-friendly buttons
- Optimized font sizes

// Small Mobile (<480px)
- Full-width elements
- Larger touch targets
- Minimal padding
```

## 🔧 Development Commands

### Development Server
```bash
npm start
```

### Build
```bash
npm run build
```

### Watch Mode (for development)
```bash
npm run watch
```

### Run Tests
```bash
npm test
```

### Lint Code
```bash
ng lint
```

## 🎨 Customization

### Global Theme

Edit `src/styles.scss` to customize:
- Primary, accent, and warning colors
- Font families and sizes
- Base spacing units
- Dark mode support

### Component-Specific Styles

Each component folder contains:
- `.ts` - Component logic
- `.html` - Template
- `.scss` - Component-specific styles

## 🔒 Security

- ✅ Built-in Angular security
- ✅ HTML content sanitization
- ✅ XSS protection
- ✅ CSRF token support ready

## ♿ Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Color contrast (WCAG AA)

## 📊 Performance

- ✅ Lazy loading ready
- ✅ OnPush change detection
- ✅ Tree-shaking enabled
- ✅ Production optimizations
- ✅ Minimal bundle size

## 🧪 Testing

Tests can be run with:

```bash
npm test
```

Test files follow the naming convention: `*.spec.ts`

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Material Design](https://material.io)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev)

## 🐛 Troubleshooting

### API Connection Error

**Problem**: "Failed to load tasks. Please try again."

**Solution**: 
- Ensure backend is running on `http://localhost:8080`
- Check backend is in `cd backend && go run cmd/server/main.go`

### Port Already in Use

**Problem**: "Port 4200 is already in use"

**Solution**:
```bash
ng serve --port 4300
```

### Dependencies Issues

**Problem**: npm install fails

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Material Icons Not Loading

**Problem**: Icons show as blank squares

**Solution**:
- Verify Material fonts are loaded in `index.html`
- Check internet connection (icons load from Google CDN)

## 📝 Code Style

The project follows Angular style guide:
- Component selectors: `app-component-name`
- File naming: `kebab-case.ts`
- Class naming: `PascalCase`
- Property/method naming: `camelCase`
- Private properties: `_camelCase`

## 🚢 Deployment

### Build for Deployment

```bash
npm run build -- --configuration production
```

### Deploy to Hosting

The dist/ folder contents can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- AWS S3
- Azure Static Web Apps

## 📄 License

This project is part of the Task Management System.

## 🤝 Contributing

When creating new components:
1. Use the shared component structure
2. Add proper TypeScript types
3. Follow Material Design 3 principles
4. Update the component barrel export (`shared/index.ts`)
5. Document usage in [FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)
6. Add tests for the component

## 📧 Support

For issues or questions, please refer to the documentation or create an issue in the repository.

```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
