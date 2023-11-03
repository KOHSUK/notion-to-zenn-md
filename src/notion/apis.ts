import { Client } from '@notionhq/client';
import { Database, Page } from './types';

// Initializing a client
export function getNotionClient(apiSecret: string) {
  const client = new Client({
    auth: apiSecret,
  });

  return client;
}

export async function getDatabase(notion: Client, databaseId: string) {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results as Database;
}

export async function getPage(notion: Client, pageId: string) {
  const response = await notion.pages.retrieve({ page_id: pageId });

  return response as Page;
}

export async function getBlocks(notion: Client, pageId: string) {
  const response = await notion.blocks.children.list({
    block_id: pageId,
  });

  return response.results;
}
