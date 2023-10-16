// test index.ts
import NotionToZennMarkdown from "../src/index";
import { describe, it, vi, expect, beforeAll } from 'vitest';
import { NotionToMarkdown } from 'notion-to-md';
import * as notion from '../src/notion';
import { Page } from "../src/notion";


describe("NotionToZennMarkdown", () => {
  describe('generateMd', () => {

    beforeAll(() => {
      const mockPageToMarkdown = vi.spyOn(NotionToMarkdown.prototype, "pageToMarkdown")

      mockPageToMarkdown.mockImplementation(async () => {
        return [
          {
            type: 'heading_1',
            blockId: '70ed00de-6ff2-43a5-be32-a8991b25f1ca',
            parent: '# Heading 1',
            children: []
          },
          {
            type: 'heading_2',
            blockId: '3b8bed17-94a3-452d-84bc-274508ee6019',
            parent: '## Heading 2',
            children: []
          },
          {
            type: 'heading_3',
            blockId: 'd1941f4a-0d86-41ec-93c1-ed9bd2aa749d',
            parent: '### Heading 3',
            children: []
          },
          {
            type: 'paragraph',
            blockId: 'e0c2eb47-d4eb-45f7-abc3-004bb369d113',
            parent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eros a metus imperdiet maximus. Aenean gravida lacinia ultricies. Duis sit amet justo et lectus pharetra accumsan. Pellentesque urna erat.(text)',
            children: []
          },
          {
            type: 'paragraph',
            blockId: '34abf6cd-013f-4f29-ae2e-6d415bcc02cb',
            parent: '_イタリック_',
            children: []
          },
          {
            type: 'paragraph',
            blockId: '4f1c4436-d67d-47a2-a0c6-da6ad46b7359',
            parent: '**太字**',
            children: []
          },
          {
            type: 'paragraph',
            blockId: 'e35d4400-f27a-4017-828d-a1ebbbb87e6f',
            parent: '~~取り消し線~~',
            children: []
          },
          {
            type: 'paragraph',
            blockId: '51cc934b-4c12-46f6-8ec9-3fdc1afd760b',
            parent: 'インラインの`code`の挿入',
            children: []
          },
          {
            type: 'paragraph',
            blockId: '3fc190f1-9a12-405a-89f5-8c456836cac0',
            parent: '[テキストのリンク](https://www.kohsuk.tech/articles/blog-migration-to-nextjs-and-notion)',
            children: []
          },
          {
            type: 'to_do',
            blockId: 'b8ed1cfc-2c66-4b48-b644-b2769bf4e3c5',
            parent: '- [ ] CheckBox(off)',
            children: []
          },
          {
            type: 'to_do',
            blockId: 'ddf19014-f707-4ece-842b-8651dc9f8a4d',
            parent: '- [x] CheckBox(on)',
            children: []
          },
          {
            type: 'bulleted_list_item',
            blockId: 'aecf9141-13e3-4967-a81d-64cb99611dbb',
            parent: '- Bulleted List 1',
            children: []
          },
          {
            type: 'bulleted_list_item',
            blockId: 'ec2e794c-fb2d-4326-929b-6cf22688ce3c',
            parent: '- Bulleted List 2',
            children: []
          },
          {
            type: 'numbered_list_item',
            blockId: '9d8f9045-f685-4ea3-a53a-9ece5857ca2f',
            parent: '1. Numbered List 1',
            children: []
          },
          {
            type: 'numbered_list_item',
            blockId: '6e11cfa2-7fad-4d2f-bbb6-a771cb220443',
            parent: '2. Numbered List 2',
            children: []
          },
          {
            type: 'toggle',
            blockId: 'b19aab0f-9a7c-4eb6-80a3-21ec0570d9bc',
            parent: 'Toggle List',
            children: []
          },
          {
            type: 'quote',
            blockId: '3ccd1f97-eaa5-4c61-86bb-6098307a8725',
            parent: '> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum eros a metus imperdiet maximus. Aenean gravida lacinia ultricies. Duis sit amet justo et lectus pharetra accumsan. Pellentesque urna erat.(Quote)',
            children: []
          },
          {
            type: 'divider',
            blockId: '7ace8a6b-12cb-427d-b238-24d869f0d2c9',
            parent: '---',
            children: []
          },
          {
            type: 'callout',
            blockId: 'e5492ec7-173a-439b-a2de-7b7b8ff17a0c',
            parent: '\n:::message\n💡 Callout\n:::\n',
            children: []
          },
          {
            type: 'image',
            blockId: 'f55c3a72-5797-44a5-a5f7-73615c0784e4',
            parent: '![画像（キャプションの表示）](https://prod-files-secure.s3.us-west-2.amazonaws.com/87fa912e-5725-43e4-91de-2911f2fd0b15/49c4adce-aafb-47cb-ba90-a4b31e4d5a3e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=XXXXXXXXXXXXXXXXXXXX%2F20231006%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231006T110453Z&X-Amz-Expires=3600&X-Amz-Signature=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&X-Amz-SignedHeaders=host&x-id=GetObject)\n' +
              '*画像（キャプションの表示）*',
            children: []
          },
          {
            type: 'bookmark',
            blockId: 'a644aa46-46ba-45d0-af8e-49ee403d431f',
            parent: '\n' +
              '@[card](https://www.kohsuk.tech/articles/blog-migration-to-nextjs-and-notion)\n',
            children: []
          },
          {
            type: 'paragraph',
            blockId: '1b4b4371-afdd-4aae-8747-f64a8dd30422',
            parent: '',
            children: []
          },
          {
            type: 'paragraph',
            blockId: '5b8fa501-05ae-4dd3-9f11-fc19a6b16ac6',
            parent: '',
            children: []
          }
        ];

      });

      const getPageMock = vi.spyOn(notion, 'getPage');

      getPageMock.mockImplementation(async () => ({
        "object": "page",
        "id": "99999999-9999-9999-9999-999999999991",
        "created_time": "2023-10-01T13:52:00.000Z",
        "last_edited_time": "2023-10-01T14:30:00.000Z",
        "created_by": {
          "object": "user",
          "id": "99999999-9999-9999-9999-999999999999"
        },
        "last_edited_by": {
          "object": "user",
          "id": "99999999-9999-9999-9999-999999999999"
        },
        "cover": null,
        "icon": { "type": "emoji", "emoji": "🤩" },
        "parent": {
          "type": "database_id",
          "database_id": "b9121b4b-2e23-4370-815f-acbd5b6d50da"
        },
        "archived": false,
        "properties": {
          "Type": {
            "id": "%3D%5BO%3C",
            "type": "select",
            "select": { "id": "]ns^", "name": "tech", "color": "blue" }
          },
          "Published": { "id": "H%7BJ%7C", "type": "checkbox", "checkbox": true },
          "Topics": {
            "id": "ZzyO",
            "type": "multi_select",
            "multi_select": [
              {
                "id": "c1e9d580-ae07-4679-a879-4d97c9d7e3e3",
                "name": "notion",
                "color": "brown"
              }
            ]
          },
          "Title": {
            "id": "title",
            "type": "title",
            "title": [
              {
                "type": "text",
                "text": { "content": "記事のタイトルです。", "link": null },
                "annotations": {
                  "bold": false,
                  "italic": false,
                  "strikethrough": false,
                  "underline": false,
                  "code": false,
                  "color": "default"
                },
                "plain_text": "記事のタイトルです。",
                "href": null
              }
            ]
          },
          "CustomType": {
            "id": "%3D%5BO%3C",
            "type": "select",
            "select": { "id": "]ns^", "name": "tech", "color": "blue" }
          },
          "CustomPublished": { "id": "H%7BJ%7C", "type": "checkbox", "checkbox": true },
          "CustomTopics": {
            "id": "ZzyO",
            "type": "multi_select",
            "multi_select": [
              {
                "id": "c1e9d580-ae07-4679-a879-4d97c9d7e3e3",
                "name": "notion",
                "color": "brown"
              }
            ]
          },
          "CustomPublishedAt": {
            "id": "xxxxxxxx",
            "type": "date",
            "date": { "start": "2023-10-01T13:52:00.000Z", "end": null, "time_zone": null }
          }
        },
        "url": "https://www.notion.so/99999999999999999999999999999991",
        "public_url": null
      } as Page));

    })

    it('should generate markdown properly', async () => {
      const n2zm = new NotionToZennMarkdown('sample');
      const md = await n2zm.generateMd('');

      expect(md).toMatchSnapshot();
    });

    it('should generate markdown properly even if a mapping key is specified', async () => {
      const n2zm = new NotionToZennMarkdown('secret_sample');
      const md = await n2zm.generateMd('page_id', {
        type: 'CustomType',
        published: 'CustomPublished',
        topics: 'CustomTopics'
      });

      expect(md).toMatchSnapshot();
    });
  });

  describe('getFrontMatterString', () => {
    it('should output published_at if published_at is specified in a Mapping Key', async () => {
      const n2zm = new NotionToZennMarkdown('secret_sample');
      const frontMatter = await n2zm.getFrontMatterString('page_id', {
        publishedAt: 'CustomPublishedAt'
      });

      expect(frontMatter).toBe(`---
title: "記事のタイトルです。"
emoji: "🤩"
type: "tech"
topics: ["notion"]
published: true
published_at: 2023-10-01 13:52
---`);
    });

    it('should not output published_at if published_at is not specified in a Mapping Key', async () => {
      const n2zm = new NotionToZennMarkdown('secret_sample');
      const frontMatter = await n2zm.getFrontMatterString('page_id');

      expect(frontMatter).toBe(`---
title: "記事のタイトルです。"
emoji: "🤩"
type: "tech"
topics: ["notion"]
published: true
---`);
    });

  })

  describe('extractImageUrls', () => {
    const markdown = `
# My Favorite Places to Visit

I love to travel and explore new places. Here are some of my favorite destinations:

## Paris, France

![Eiffel Tower](https://via.placeholder.com/500x300)

Paris is known as the City of Love, and it's easy to see why. The architecture, the food, and the culture all combine to create a romantic atmosphere that is hard to resist. One of my favorite things to do in Paris is to visit the Eiffel Tower. The view from the top is breathtaking.

## Bali, Indonesia

![Bali Beach](https://via.placeholder.com/500x400)

Bali is a tropical paradise that is perfect for relaxation and adventure. The beaches are beautiful, and the water is warm and clear. I love to go surfing in Bali, and there are plenty of great spots for beginners and experts alike.

## Tokyo, Japan

![Tokyo Skyline](https://via.placeholder.com/400x300)

Tokyo is a city that never sleeps. There is always something to do or see, from visiting the temples and shrines to exploring the bustling streets and markets. One of my favorite things to do in Tokyo is to visit the Tsukiji Fish Market. The sushi there is some of the best I've ever had.

## New York City, USA

![New York City Skyline](https://via.placeholder.com/500x200)

New York City is the city that never sleeps. There is always something to do or see, from visiting the museums and galleries to exploring the parks and neighborhoods. One of my favorite things to do in New York City is to visit Central Park. It's a great place to relax and enjoy nature in the middle of the city.

Overall, these are just a few of my favorite places to visit. Each destination has its own unique charm and appeal, and I can't wait to explore more of the world in the future.
`
    it('should extract image urls', () => {
      const n2zm = new NotionToZennMarkdown('sample');

      const imageUrls = n2zm.extractImageUrls(markdown);

      expect(imageUrls).toEqual([
        'https://via.placeholder.com/500x300',
        'https://via.placeholder.com/500x400',
        'https://via.placeholder.com/400x300',
        'https://via.placeholder.com/500x200'
      ]);
    });

    it('should return empty array if there is no image', () => {
      const n2zm = new NotionToZennMarkdown('sample');

      const imageUrls = n2zm.extractImageUrls('');

      expect(imageUrls).toEqual([]);
    });

  });

  describe('listImageUrls', () => {
    it('should list image urls', async () => {
      const n2zm = new NotionToZennMarkdown('sample');

      const imageUrls = await n2zm.listImageUrls('page_id');

      expect(imageUrls).toEqual([
        'https://prod-files-secure.s3.us-west-2.amazonaws.com/87fa912e-5725-43e4-91de-2911f2fd0b15/49c4adce-aafb-47cb-ba90-a4b31e4d5a3e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=XXXXXXXXXXXXXXXXXXXX%2F20231006%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20231006T110453Z&X-Amz-Expires=3600&X-Amz-Signature=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&X-Amz-SignedHeaders=host&x-id=GetObject'
      ]);
    });
  })

});


