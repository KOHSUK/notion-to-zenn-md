export const ArticleTypes = ["tech", "idea"] as const;
export type ArticleType = typeof ArticleTypes[number]; // "tech" | "idea"

export type FrontMatter = {
  title: string; // Title
  emoji: string; // Icon
  type: ArticleType; // Select
  topics: string[]; // Multi Select
  published: boolean; // Checkbox
};