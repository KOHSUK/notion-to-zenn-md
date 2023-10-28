export type FrontMatter = {
  title: string; // Title
  emoji: string; // Icon
  type: string; // Select
  topics: string[]; // Multi Select
  published: boolean; // Checkbox
  publishedAt?: string; // Date
};