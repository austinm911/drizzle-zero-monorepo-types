import type { Row } from "@rocicorp/zero";
import type { ZeroClient } from "./types";

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
type GetPosts = {
    id: number | null;
    title: string;
    content: string;
    authorId: string;
    published: boolean | null;
    createdAt: number | null;
    updatedAt: number | null;
};
 */
export type GetPostsWithTags = Row<ReturnType<typeof queries.getPostsWithTags>>;
/**
type GetPostsWithTags = {
    id: number | null;
    title: string;
    content: string;
    authorId: string;
    published: boolean | null;
    createdAt: number | null;
    updatedAt: number | null;
    postTags: readonly { ... 2 more }[];
}
 */
