import {
	ANYONE_CAN_DO_ANYTHING,
	definePermissions,
	type PermissionsConfig,
} from "@rocicorp/zero";
import { type Schema, schema } from "./schema.gen";

export type AuthData = {
	userId: string;
};

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
	return {
		posts: ANYONE_CAN_DO_ANYTHING,
		tags: ANYONE_CAN_DO_ANYTHING,
		postTags: ANYONE_CAN_DO_ANYTHING,
	} satisfies PermissionsConfig<AuthData, Schema>;
});
