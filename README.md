# CS 571: p91 Project

A modern React application built for CS 571, utilizing Vite. The project is strictly typed with TypeScript and styled using a combination of Tailwind CSS and React Bootstrap.

Running on https://cs571-s26.github.io/p91/

## Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Language:** [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [React Bootstrap](https://react-bootstrap.netlify.app/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Linting & Formatting:** ESLint (v10 Flat Config) + Prettier

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

Clone the repository and install the dependencies:

```bash
npm i
```

### Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/p91/`.

## Code Quality & Formatting

This project maintains strict code quality standards to ensure consistency and prevent bugs.

- **Linting:** ESLint is configured with rules for modern JavaScript, TypeScript, and React Hooks.
- **Formatting:** Prettier is integrated to handle all code formatting (2-space indent, single quotes, trailing commas).

**Available Commands:**

- `npm run lint`: Scans the `src` directory for logical errors and rule violations.
- `npm run lint:fix`: Automatically fixes fixable linting errors.

_Note for Developers: It is highly recommended to use VS Code with the ESLint and Prettier extensions installed, and to enable `editor.formatOnSave` in your local workspace settings._

## Build & Deployment

This project is configured for easy deployment to GitHub Pages.

```bash
npm run build
```

The build process compiles TypeScript and bundles the application into the `docs` directory, ensuring compatibility with GitHub Pages' serving mechanism. The base path is set to `/p91/`.
