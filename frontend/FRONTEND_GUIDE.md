# Frontend - Angular 21 Task Management UI

A modern, responsive Angular 21 application built with Material Design 3 principles, showcasing best practices for UX, component architecture, and code organization.

## 📁 Folder Structure

```
src/
├── app/
│   ├── shared/                    # Shared components, services, and utilities
│   │   ├── components/
│   │   │   ├── ui/               # Reusable UI components
│   │   │   │   ├── button/       # Button component (4 variants)
│   │   │   │   ├── card/         # Card component with elevation
│   │   │   │   ├── input/        # Form input/textarea component
│   │   │   │   └── accordion/    # Accordion/expansion panel component
│   │   │   ├── layout/           # Layout components
│   │   │   │   ├── header/       # Navigation header with profile menu
│   │   │   │   └── page-container/ # Responsive page layout wrapper
│   │   │   └── task-card/        # Task display component with actions
│   │   ├── models/               # TypeScript interfaces and types
│   │   ├── services/             # API and business logic services
│   │   ├── pipes/               # Custom Angular pipes (optional)
│   │   ├── directives/          # Custom directives (optional)
│   │   ├── utils/               # Utility functions (optional)
│   │   └── index.ts             # Barrel exports for easy imports
│   ├── features/                # Feature/page components (future)
│   ├── app.ts                   # Root component
│   ├── app.html                 # Root template
│   ├── app.scss                 # Root styles
│   ├── app.routes.ts            # Route configuration
│   └── app.config.ts            # Application configuration
├── index.html                   # HTML entry point
├── main.ts                      # Application bootstrap
├── styles.scss                  # Global styles
└── (other config files)
```

## 🎨 UI Components

### **Button Component** (`button/`)
A versatile button component with 4 variants and customizable appearance.

#### Features:
- **Variants**: basic, raised (default), flat, stroked
- **Colors**: primary (default), accent, warn
- **States**: disabled, loading
- **Icons**: Optional leading icon
- **Full Width**: Responsive full-width support

#### Usage:
```html
<app-button
  label="Click Me"
  variant="raised"
  color="primary"
  [disabled]="disabled"
  icon="add"
  (clicked)="handleClick()">
</app-button>
```

---

### **Card Component** (`card/`)
A flexible card container for displaying grouped content.

#### Features:
- **Elevation**: 4 levels (1, 2, 4, 8)
- **Hoverable**: Optional hover animation
- **Clickable**: Optional click interaction
- **Header Support**: Title and subtitle slots
- **Actions**: Optional action buttons area

#### Usage:
```html
<app-card title="Card Title" subtitle="Subtitle" [elevation]="2">
  <p>Card content goes here</p>
  <div card-actions>
    <!-- Action buttons -->
  </div>
</app-card>
```

---

### **Input Component** (`input/`)
A form input with validation, hints, and multiple input types.

#### Features:
- **Types**: text, email, password, number, textarea
- **Validation**: Error display, required fields
- **Hints**: Helper text below input
- **Character Count**: Max length indicator
- **Icons**: Optional prefix/suffix icons
- **Events**: change, blur, focus

#### Usage:
```html
<app-input
  label="Email"
  type="email"
  placeholder="Enter your email"
  [value]="email"
  [error]="emailError"
  hint="We'll never share your email"
  (valueChange)="onEmailChange($event)">
</app-input>
```

---

### **Accordion Component** (`accordion/`)
A Material expansion panel component for collapsible content.

#### Features:
- **Multi-open**: Allow multiple panels open simultaneously
- **Items**: Dynamic accordion items from array
- **Disabled**: Individual item disable support
- **Descriptions**: Optional panel descriptions

#### Usage:
```typescript
items = [
  {
    id: '1',
    title: 'Section 1',
    description: 'Optional description',
    content: 'Panel content...',
    disabled: false
  }
];
```

```html
<app-accordion [items]="items" [multi]="true"></app-accordion>
```

---

## 🏗️ Layout Components

### **Header Component** (`header/`)
Application header with navigation and profile menu.

#### Features:
- Material toolbar with primary color
- Optional menu icon for mobile
- Profile menu with logout
- Responsive design

#### Usage:
```html
<app-header [title]="'My App'" [showMenuIcon]="true"></app-header>
```

---

### **Page Container Component** (`page-container/`)
Responsive page layout wrapper with max-width and padding.

#### Features:
- Customizable max-width (default: 1200px)
- Customizable padding (default: 24px)
- Responsive breakpoints (768px, 480px)
- Content centering

#### Usage:
```html
<app-page-container maxWidth="900px" padding="16px">
  <!-- Page content -->
</app-page-container>
```

---

## 📋 Feature Components

### **Task Card Component** (`task-card/`)
Displays a single task with status, dates, and action buttons.

#### Features:
- Status badge with icon and color
- Created/Updated date display
- Task description with ellipsis (3 lines max)
- Status change dropdown menu
- Edit and delete buttons
- Responsive grid layout

#### Usage:
```html
<app-task-card
  [task]="task"
  (edit)="onEdit($event)"
  (delete)="onDelete($event)"
  (updateStatus)="onStatusChange($event)">
</app-task-card>
```

---

## 🔧 Services

### **TaskService** (`services/task.service.ts`)
Handles all API communication with the backend.

#### Methods:
```typescript
// Retrieve all tasks
getAllTasks(): Observable<ApiResponse<Task[]>>

// Get single task
getTaskById(id: number): Observable<ApiResponse<Task>>

// Create new task
createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<ApiResponse<Task>>

// Update task
updateTask(id: number, task: Partial<Task>): Observable<ApiResponse<Task>>

// Delete task
deleteTask(id: number): Observable<ApiResponse<null>>
```

---

## 📦 Models & Types

Located in `models/index.ts`:

```typescript
interface Task {
  id?: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  total?: number;
  error?: string;
}
```

---

## 🎯 UX Principles Applied

### 1. **Material Design 3**
   - Consistent with Google's Material Design 3 specifications
   - Color system with primary, accent, and warning colors
   - Proper elevation and shadows for depth

### 2. **Accessibility**
   - Proper ARIA labels and roles
   - Keyboard navigation support
   - High contrast text
   - Icon + text combinations

### 3. **Responsive Design**
   - Mobile-first approach
   - Breakpoints: 1200px, 768px, 480px
   - Flexible grid layouts
   - Touch-friendly button sizes (48px min)

### 4. **Visual Feedback**
   - Hover states for interactive elements
   - Loading indicators
   - Error messages with context
   - Empty states with helpful messages
   - Smooth animations and transitions

### 5. **Performance**
   - Lazy loading support (ready for routes)
   - OnPush change detection strategy
   - Efficient change detection
   - Minimal re-renders

### 6. **Consistency**
   - Unified spacing system (4px base unit)
   - Consistent typography scales
   - Reusable color tokens
   - Standard component API design

---

## 🚀 Setup & Running

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm start
```

Server runs on `http://localhost:4200`

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

---

## 📖 Component Import Pattern

### Using Barrel Exports
```typescript
import {
  Button,
  Card,
  Input,
  Header,
  PageContainer,
  TaskCard,
  TaskService,
  type Task,
} from './shared';
```

### Direct Imports
```typescript
import { Button } from './shared/components/ui/button/button';
import { TaskService } from './shared/services/task.service';
```

---

## 🎨 Customization

### Global Theme
Edit `src/styles.scss` to customize:
- Primary color palette
- Font families
- Base spacing
- Breakpoints

### Component-Specific Styles
Each component has its own `.scss` file for custom styling while maintaining Material Design principles.

---

## 🔄 Component Interaction Flow

```
App Component
├── Header (Static)
├── Page Container
│   ├── Error Banner (Conditional)
│   ├── Page Header (Title + Create Button)
│   ├── Create Form (Conditional)
│   │   ├── Input components
│   │   └── Button components
│   ├── Loading/Empty State (Conditional)
│   └── Tasks Grid
│       └── Task Cards (Repeated)
└── Router Outlet
```

---

## 📚 Best Practices Implemented

1. **Standalone Components**: All components are standalone (Angular 14+)
2. **Type Safety**: Full TypeScript with strict mode
3. **Reactive Patterns**: Using Angular signals and observables
4. **Clean Code**: Well-structured, documented, and DRY
5. **Testing Ready**: Component isolation for unit testing
6. **Accessibility**: WCAG 2.1 AA compliant
7. **Performance**: Optimized rendering and change detection
8. **Documentation**: Clear comments and usage examples

---

## 🔮 Future Enhancements

- [ ] Edit task dialog with form validation
- [ ] Task filtering and search
- [ ] Task sorting options
- [ ] Batch operations (select multiple)
- [ ] Dark mode support
- [ ] Unit and E2E tests
- [ ] Toast notifications
- [ ] Pagination for large task lists
- [ ] Task details/modal view
- [ ] Drag-and-drop reordering

---

## 📝 Notes

- The UI automatically fetches tasks from `http://localhost:8080/api/tasks`
- Ensure the backend is running before starting the frontend
- Task status values: `pending`, `in-progress`, `completed`
- All components support Angular's OnInit, OnDestroy lifecycle hooks
- Use `trackBy` in *ngFor loops for better performance

---

## 🤝 Contributing

When adding new components:
1. Create component in appropriate folder
2. Export from `shared/index.ts`
3. Update this README
4. Follow Material Design 3 principles
5. Add proper TypeScript types
6. Include comprehensive comments
