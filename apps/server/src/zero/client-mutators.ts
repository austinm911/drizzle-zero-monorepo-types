import type { CustomMutatorDefs, Row } from "@rocicorp/zero";
import type { AuthData } from "./permissions";
import type { schema } from "./schema.gen";

export function createMutators(_authData: AuthData | undefined) {
	return {
		posts: {
			add: async (tx, input: Row<typeof schema.tables.posts>) => {
				return await tx.mutate.posts.insert(input);
			},
		},
	} as const satisfies CustomMutatorDefs<typeof schema>;
}

export type Mutators = ReturnType<typeof createMutators>;
