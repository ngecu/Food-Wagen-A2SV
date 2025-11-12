# Food Wagen

A modern food management application built with Next.js, React, and Redux Toolkit for managing food items with full CRUD operations.

## Features

- **Food Management** - Add, edit, delete, and view food items
- **Search & Filter** - Real-time search with suggestions
- **Responsive Design** - Mobile-first responsive layout
- **Fast Performance** - Optimized with lazy loading
- **Modern UI** - Beautiful Tailwind CSS design
- **Form Validation** - Comprehensive form validation with error handling
- **Loading States** - Smooth loading indicators for all operations

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **Testing**: Cypress (E2E)
- **Package Manager**: npm

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ngecu/Food-Wagen-A2SV
   cd food-wagen-a2sv
   npm install
   ```

2. **Environment Configuration**

    Create a .env.local file in the root directory:

    ```bash
    NEXT_PUBLIC_API_BASE_URL=https://6852821e0594059b23cdd834.mockapi.io
    NODE_ENV=development
    ```
3. **Running The Application**

    ```bash
    npm run dev
    ```

4. **Running Tests**

    Open Cypress test runner
    ```bash
    npm run cy:open
    ```
