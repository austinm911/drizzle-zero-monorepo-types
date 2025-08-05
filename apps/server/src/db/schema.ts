import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

/**
 * Blog post table schema.
 * The column name property is omitted as per project conventions.
 */
export const posts = pgTable("posts", {
	id: serial().primaryKey(),
	title: text().notNull(),
	content: text().notNull(),
	authorId: text().notNull(),
	published: boolean().default(false),
	createdAt: timestamp().notNull().defaultNow(),
	updatedAt: timestamp().notNull().defaultNow(),
});

/**
 * Tag table schema.
 * The column name property is omitted as per project conventions.
 */
export const tags = pgTable("tags", {
	id: serial().primaryKey(),
	name: text().notNull().unique(),
	createdAt: timestamp().notNull().defaultNow(),
});

/**
 * Post-Tag join table schema.
 * The column name property is omitted as per project conventions.
 */
export const postTags = pgTable(
	"post_tags",
	{
		postId: integer()
			.notNull()
			.references(() => posts.id, { onDelete: "cascade" }),
		tagId: integer()
			.notNull()
			.references(() => tags.id, { onDelete: "cascade" }),
	},
	(t) => [primaryKey({ columns: [t.postId, t.tagId] })],
);

/**
 * Drizzle relations for blog tables.
 * These enable type-safe joins and eager loading.
 */

// Posts relations: each post belongs to a user and has many postTags (and thus tags)
export const postsRelations = relations(posts, ({ one, many }) => ({
	postTags: many(postTags),
}));

// Tags relations: each tag has many postTags (and thus posts)
export const tagsRelations = relations(tags, ({ many }) => ({
	postTags: many(postTags),
}));

// PostTags relations: each postTag belongs to a post and a tag
export const postTagsRelations = relations(postTags, ({ one }) => ({
	post: one(posts, {
		fields: [postTags.postId],
		references: [posts.id],
	}),
	tag: one(tags, {
		fields: [postTags.tagId],
		references: [tags.id],
	}),
}));
