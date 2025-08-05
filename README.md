# drizzle-zero-monorepo-types

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Start, Hono, and more.

## Issue

Zero types produced in a monorepo where the consuming workspace does not use `tsconfig.json#references` will lose type inference.

For example observe the types produced by `apps/server/src/zero/queries.ts` and `apps/web/src/components/zero/queries.ts`. The `apps/web` imports from `apps/server` the schema, client mutators, and so forth.

But on the `apps/web`, notice how the types are missing.

```ts
// apps/server/src/zero/types.ts
import type { Zero } from "@rocicorp/zero";
import type { Mutators } from "./client-mutators";
import type { Schema } from "./schema.gen";

export { type Schema, schema } from "./schema.gen";
export type ZeroClient = Zero<Schema, Mutators>;
```

```ts
// apps/web/src/components/zero/queries.ts
import type { ZeroClient } from "@app/server/zero";
import type { Row } from "@rocicorp/zero";

export const queries = {
 getPosts: (z: ZeroClient) => {
  return z.query.posts;
 },
};

export type GetPosts = Row<ReturnType<typeof queries.getPosts>>;
/**
 * If `tsconfig.json` is not configured to reference the server workspace, the types are not available in the web app. They would appear as:
type GetPosts = {   
    id: {} | null;
    title: {};
    content: {};
    authorId: {};
    published: {} | null;
    createdAt: {} | null;
    updatedAt: {} | null;
}
 */
```

When this is expected

```ts
export const queries = {
 getPosts: (z: ZeroClient) => {
  return z.query.posts;
 },
};

export type GetPosts = Row<ReturnType<typeof queries.getPosts>>;
/**
type GetPosts = {
    id: number | null;
    title: string;
    content: string;
    authorId: string;
    published: boolean | null;
    createdAt: number | null;
    updatedAt: number | null;
};
```

This can be fixed with a `tsconfig` in `apps/web` like as follows

```ts
{
  "include": [
    "**/*.ts",
    "**/*.tsx"
  ],
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "module": "ESNext",
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "types": [
      "vite/client"
    ],
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    /* Linting */
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  // If this is commented/removed, the Zero Schema types are not available in the web app
  "references": [{
    "path": "../server"
  }]
}
```
