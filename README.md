# Express + Vite Monorepo Starter

Monorepo for sharing apps and packages using [pnpm](https://pnpm.io/) and [Turbo](https://turbo.build/repo/docs/getting-started/monorepo). Easily extendable for additional apps, packages, and shared configurations.

## Apps via `/apps`:

- [Vite](https://vitejs.dev/): [`/web`](./apps/web/)
    - Frontend framework using [Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/) and [SWC](https://github.com/vitejs/vite-plugin-react-swc)
- [Express](https://expressjs.com/): [`/api`](./apps/api/)
    - Backend api framework using [Typescript](https://www.typescriptlang.org/)

## Shared packages via `/packages`:

- [ESLint](https://eslint.org/) configs: [`/eslint-config`](./packages/eslint-config)
    - Preference for [Typescript](https://www.typescriptlang.org/) runs deep. Used `eslint.config.ts` and took inspiration from this [repo](https://github.com/isa-group/bpm2025). Its a bit overengineered for this monorepo. Great starting point for sharing specific linting rules across different package types with the new flat config format.
    - Mostly for learning purposes as an "industry standard". I'd use [Biome](https://biomejs.dev/) in other projects.
- [Typescript](https://www.typescriptlang.org/) configs: [`/typescript-config`](./packages/typescript-config)
    - Needs optomization
- React UI Components: [`/ui`](./packages/ui)
    - Simple pure React UI library (check the [package.json](./packages/ui/package.json)) to share

## Development

### Install Dependencies (in root)

```bash
pnpm install
```

### Run

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Lint and fix

```bash
pnpm lint
```

## References

- [Turbo](https://turbo.build/repo/docs/getting-started/monorepo)
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Vite + React + SWC](https://github.com/vitejs/vite-plugin-react-swc)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [pnpm](https://pnpm.io/)
- [Express](https://expressjs.com/)
- [Typescript Config](https://www.typescriptlang.org/tsconfig)
