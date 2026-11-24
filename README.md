# Groceries App

A smart grocery shopping list manager built with React, TypeScript, and Vite. Create, edit, complete, and delete shopping items — all persisted locally in your browser.

## Features

- **Add items** — quickly add grocery items to your shopping list
- **Edit items** — update item names inline with a dedicated edit form
- **Delete items** — remove items from the list with a single click
- **Mark complete** — toggle items as purchased (shown with a strikethrough and color change)
- **Local persistence** — the list is saved to `localStorage` and survives page reloads
- **SEO-optimized** — includes Open Graph, Twitter Card, and JSON-LD structured data for better discoverability
- **Responsive design** — centered layout with CSS Modules for component-scoped styling

## Tech Stack

| Layer       | Technology                                     |
| ----------- | ---------------------------------------------- |
| Framework   | React 18                                       |
| Language    | TypeScript (strict mode)                       |
| Build Tool  | Vite 7                                         |
| Styling     | CSS Modules                                    |
| Icons       | FontAwesome (`@fortawesome/react-fontawesome`) |
| IDs         | `uuid` (v4)                                    |
| Linting     | ESLint with `typescript-eslint`, React Hooks   |
| Package Mgr | pnpm                                           |

## Getting Started

### Prerequisites

- Node.js >= 24
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/gabeatwell/react_todo.git

# Navigate into the project
cd groceries

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will be available at `http://localhost:5173` (or whichever port Vite assigns).

### Available Scripts

| Command        | Description                                   |
| -------------- | --------------------------------------------- |
| `pnpm dev`     | Start the Vite dev server with HMR            |
| `pnpm build`   | Type-check and build for production           |
| `pnpm preview` | Preview the production build locally          |
| `pnpm lint`    | Run ESLint across the project                 |
| `pnpm check`   | Run TypeScript type-checking without emitting |

## Project Structure

```
src/
├── App.tsx                         # Root component (SEO + TodoWrapper + Link)
├── main.tsx                        # React entry point
├── index.css                       # Global styles
├── vite-env.d.ts                   # Vite type declarations
└── components/
    ├── wrapper/
    │   ├── TodoWrapper.tsx         # State management, CRUD logic, persistence
    │   └── todowrapper.module.css
    ├── form/
    │   ├── TodoForm.tsx            # Add-item form
    │   └── todoform.module.css
    ├── edit/
    │   ├── EditTodoForm.tsx        # Edit-item form
    │   └── edittodoform.module.css
    ├── todo/
    │   ├── Todo.tsx                # Individual list item (display + actions)
    │   └── todo.module.css
    ├── link/
    │   ├── Link.tsx                # GitHub repository link
    │   └── link.module.css
    └── seo/
        ├── SEO.tsx                 # Meta tags, Open Graph, structured data
        ├── hooks.ts                # useSEO and useStructuredData hooks
        ├── schemas.ts              # Reusable JSON-LD schema generators
        ├── index.ts                # Barrel export
        └── seo.module.css
```

## How It Works

The `TodoWrapper` component holds all application state. Each item follows this shape:

```ts
interface TodoItem {
    id: string; // UUID v4
    task: string; // Grocery item name
    completed: boolean;
    isEditing: boolean;
}
```

State changes are persisted to `localStorage` under the key `"todos"`. On mount, existing data is rehydrated so your list survives page reloads.

The `SEO` component dynamically injects meta tags and JSON-LD structured data into the document head at runtime, making the app crawlable and social-share friendly.

Author: [Gabe Atwell](https://github.com/gabeatwell)
Portfolio: [atwell.dev](https://atwell.dev/)
