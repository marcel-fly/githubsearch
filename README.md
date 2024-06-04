# GitHub Search

This project is a React application that allows users to search for GitHub users and view their repositories. It uses the GitHub API to fetch user data and display it in a user-friendly interface. The project is built with React, TypeScript, and Vite, and it uses React Query for data fetching and Axios for making HTTP requests.

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Testing](#testing)

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/github-search.git
   cd github-search
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

This will start the Vite development server and you can open your browser to [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run dev`

Starts the Vite development server.

### `npm run build`

Builds the app for production to the `dist` folder. It also runs TypeScript compiler to check for type errors.

### `npm run lint`

Runs ESLint to check for linting errors in your code. It enforces code quality and consistency.

### `npm run preview`

Runs the Vite preview server to preview the production build.

### `npm run test`

Runs the Jest test runner to execute all tests.

## Dependencies

- **@emotion/react**: For writing css styles with emotion.
- **@emotion/styled**: For writing styled components with emotion.
- **@mui/icons-material**: Material UI icons.
- **@mui/material**: Material UI components.
- **@tanstack/react-query**: For fetching, caching, and updating asynchronous data in React.
- **@testing-library/react**: For testing React components.
- **@testing-library/user-event**: For simulating user events in tests.
- **axios**: For making HTTP requests.
- **react**: For building user interfaces.
- **react-dom**: For rendering React components.
- **react-query**: For managing server state in React.

## Dev Dependencies

- **@testing-library/jest-dom**: Custom jest matchers to test the state of the DOM.
- **@types/jest**: TypeScript type definitions for Jest.
- **@types/react**: TypeScript type definitions for React.
- **@types/react-dom**: TypeScript type definitions for React DOM.
- **@typescript-eslint/eslint-plugin**: ESLint plugin for TypeScript.
- **@typescript-eslint/parser**: TypeScript parser for ESLint.
- **@vitejs/plugin-react**: Vite plugin for React.
- **eslint**: For identifying and reporting on patterns in JavaScript.
- **eslint-plugin-react-hooks**: ESLint rules for React Hooks.
- **eslint-plugin-react-refresh**: ESLint plugin for React Refresh.
- **jest**: JavaScript testing framework.
- **jest-environment-jsdom**: Jest environment for testing with JSDOM.
- **prettier**: Code formatter.
- **ts-jest**: Jest transformer for TypeScript.
- **typescript**: TypeScript language.
- **vite**: Next Generation Frontend Tooling.

## Testing

This project uses Jest and React Testing Library for testing.

### Running Tests

To run the tests, use the following command:

```bash
npm run test
```
