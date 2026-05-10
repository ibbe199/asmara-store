# Asmara Store

Asmara Store is a modern web application for an online store interface. The project is built as a React / TypeScript application and runs through the main `index.html` entry point.

## Overview

This project replaces the default Google AI Studio title with the project name:

```html
<title>Asmara Store</title>
```

The application is designed to be the foundation for a clean, responsive store experience that can later include products, categories, search, user actions, and other marketplace features.

## Features

- Modern web app structure
- React and TypeScript entry point
- Responsive layout support
- Easy local development
- Ready for future store and marketplace features

## Project Structure

```txt
Asmara2-/
├── index.html
├── src/
│   └── main.tsx
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Environment Variables

If the app uses Gemini or Google AI services, create a `.env.local` file and add your API key:

```env
GEMINI_API_KEY=your_api_key_here
```

## App Title

Update the title in `index.html` to:

```html
<title>Asmara Store</title>
```

## License

This project is for development and learning purposes.
