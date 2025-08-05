import type { ZeroClient } from "@app/server/zero";
import type { Row } from "@rocicorp/zero";

export const queries = {
	getPosts: (z: ZeroClient) => {
		return z.query.posts;
	},
	getPostsWithTags: (z: ZeroClient) => {
		return z.query.posts.related("postTags");
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
export type GetPostsWithTags = Row<ReturnType<typeof queries.getPostsWithTags>>;
/**
 * If `tsconfig.json` is not configured to reference the server workspace, the types are not available in the web app. They would appear as:
type GetPostsWithTags = {
    id: {} | null;
    title: {};
    content: {};
    authorId: {};
    published: {} | null;
    createdAt: {} | null;
    updatedAt: {} | null;
    postTags: readonly { ... 2 more }[];
}
 */

type GetPostsWithTagsNested = GetPostsWithTags["postTags"];
/**
type GetPostsWithTagsNested = readonly {
    postId: {};
    tagId: {};
}[]
 */
