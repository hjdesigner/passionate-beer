# Passionate Beer


## Install Dependencies
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

## Setup Environment variables

Create a `.env.local` file by renaming `.env.template`.

Run the project in dev mode:
```sh
npm run dev
```