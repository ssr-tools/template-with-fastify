# template-with-fastify

Hi! This is a really simple project. It shows the usage of [ssr-tools](https://github.com/ssr-tools/ssr-tools) combined with [fastify](https://github.com/fastify/fastify).

You can see a live demo at: 
  - https://ssr-t-twf.herokuapp.com (cold start of free dyno on heroku takes a few seconds)

# Getting started

tldr; Clone the repo and run `npm run dev`. The development server should start on `http://localhost:3000`.

There are, however, more detailed instructions below.

---

Before you begin, make sure you have the following tools installed on your machine:

- [Terminal](https://en.wikipedia.org/wiki/Terminal_emulator)
- [Source-code editor](https://en.wikipedia.org/wiki/Source-code_editor)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)

Then:

1. In your browser, go to `https://github.com/ssr-tools/template-with-fastify`
1. At the top of the page, there should be a button `Use this template`
1. Click on the button and follow the instructions. 
1. On the page of your newly created repository, click on the `Code` button and copy the `SSH` URL
1. In your terminal, clone the repository using the copied address: `git clone {paste the SSH URL}`
1. Go to the repository's directory: `cd {project's name}`
1. Install the packages: `npm i`
1. Start the development server: `npm run dev`
1. In your browser, open up the development version of the app by going to the `http://localhost:3000`
1. In the project's directory, open up `pages/Home.tsx` using your source-code editor and try to change something
1. If everything went fine, you should see live updates on `http://localhost:3000` when you save the file with some changes

# What's bundled

Below, you can find short descriptions of the major packages included in the repo:

- `fastify` - simple and fast web framework
- `jest-puppeteer` - integrates `jest` with `puppeteer` to run E2E tests
- `jest` - test runner 
- `lint-staged` - runs code checkers on the staged files before you commit them
- `React` - a library for building user interfaces using declarative views
- `ssr-tools/core` - simplifies configuration of Webpack and React for SSR apps
- `ssr-tools/css` - TypeScript first CSS integration for SSR React apps
- `ssr-tools/router` - TypeScript first router for SSR React apps
- `ts-node` & `ts-node-dev` - allows for TypeScript in the project's toolchain configuration

# Scripts

In the `package.json` file, you can find the following scripts:

- `npm run dev` - starts the development server
- `npm run build` - builds the app
- `npm run start` - starts the production build of the app. **Make sure you are providing `PORT` env variable to this command**
- `npm run prepare` - install the git hooks (pre-commit, pre-push)
- `npm run lint` - run ESLint check against the all source files
- `npm run test` - runs unit/integration tests (`*.test.ts(x)` files)
- `npm run test:e2e` - runs E2E tests (`*.e2e.ts` files)
