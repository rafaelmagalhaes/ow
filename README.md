## Setup

Project built in Nuxt 3

Demo at [https://ow-eight.vercel.app/](https://ow-eight.vercel.app/)

rename `.env.example` to `.env` and fill in the values. A google maps javascript api key is required for the map to work.

Packages used:
   * TailwindCSS
   * VueGoogleMaps
   * VueUse
   * Pinia
   * Vitest

### prerequisites
 
   * node 16.18 or higher

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
