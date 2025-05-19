# Passionate Beer

## About the project stack

Since this project is a product showcase, I chose **Next.js** for its excellent support for **Server-Side Rendering (SSR)**, which helps with **SEO** and search engine indexing. Additionally, Next.js offers a solid component structure that promotes **scalability** and **reusability**.

> 🔗 Live Demo: [Passionate Beer](https://passionate-beer-f2b4.vercel.app/)

## Getting Started

### Prerequisites

> [!IMPORTANT]  
> [nvm](https://github.com/nvm-sh/nvm) is recommended to manage local node versions.

After installing nvm, ensure the correct node version is being used:
```sh
nvm use
```

Install all dependencies:
```sh
npm install
```

Install husky:
```sh
npm run prepare
```

### Image Hosting
The project is configured to only load images from [pixabay.com](pixabay.com), a free image resource.

## Setup Environment variables

Create a `.env` file by renaming `.env.template`.

⚠️ The .env file contains sensitive information. In a real-world scenario, these values should be stored securely (e.g., in a vault or secret manager).
For this test, I have provided the environment variables via email so you can validate the project.

Run the project in dev mode:
```sh
npm run dev
```

Run the tests tdd project:
```sh
npm run test
```

Run the build project:
```sh
npm run build
```

Run the project in prd mode:
```sh
npm run start
```

