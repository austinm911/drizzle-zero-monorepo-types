import type { Zero } from "@rocicorp/zero";
import type { Mutators } from "./client-mutators";
import type { Schema } from "./schema.gen";

export { type Schema, schema } from "./schema.gen";
export type ZeroClient = Zero<Schema, Mutators>;
