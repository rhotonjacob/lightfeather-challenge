# Lightfeather-challenge

## Background

The objective of this project is to create a module for a fictitious internal management system at Lightfeather. Its purpose is to coordinate supervisors within the company with the jurisdiction they cover. An employee can submit their contact information for a specific supervisor to be notified of any announcements the supervisor has made.

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Build your container: `docker build -t nextjs-docker .`.
1. Run your container: `docker run -p 3000:3000 nextjs-docker`.

You can view your images created with `docker images`.

This will build the project as a standalone app inside the Docker image.

## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

API Routes can be accessed via [http://localhost:3000/api/supervisors](http://localhost:3000/api/supervisors) and [http://localhost:3000/api/submit](http://localhost:3000/api/submit).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Libraries Used

- [Next.js](https://nextjs.org/docs): A flexible React framework for building full-stack applications
- [Chakra-UI](https://chakra-ui.com/getting-started): A simple and modular component library
- [Formik](https://formik.org/docs/overview): A form library for React
- [Lodash](https://lodash.com/): A utility library for Javascript
