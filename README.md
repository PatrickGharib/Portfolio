# Portfolio Site

A modern, responsive portfolio website built with Vue 3 and Vite.

## Features

- Responsive design for all devices
- Dark/light theme support
- Interactive background animation
- Blog section with filterable posts
- Project showcase with filtering by technology
- Skills visualization with progress indicators
- Contact form
- Smooth page transitions

## Tech Stack

- Vue 3 with Composition API
- Vue Router for navigation
- Pinia for state management
- GSAP for animations
- Vite for fast development and building

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages using either of the following methods:

### Method 1: GitHub Actions (Automated)

1. Push your code to GitHub
2. GitHub Actions will automatically build and deploy your site to the `gh-pages` branch
3. Configure GitHub Pages in your repository settings to use the `gh-pages` branch

### Method 2: Manual Deployment

Run the deploy script to build and publish to the `gh-pages` branch:

```sh
npm run deploy
```

## Customization

- Update personal information in the view components
- Modify the theme colors in `src/App.vue`
- Add your own projects in the Projects view
- Create blog posts in the Blog view

## License

MIT
