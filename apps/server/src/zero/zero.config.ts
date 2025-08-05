/** biome-ignore-all lint/performance/noNamespaceImport: ignore */

import { drizzleZeroConfig } from "drizzle-zero";
import * as drizzleSchema from "../db/schema";

export default drizzleZeroConfig(drizzleSchema, {
	debug: true,
	casing: "snake_case",
	tables: {
		posts: true,
		postTags: true,
		tags: true,
	},
});
