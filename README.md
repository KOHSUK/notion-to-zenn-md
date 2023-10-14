<div align="center">
    <h1>Notion to Zenn Markdown</h1>
    <p>Convert Notion page to <a href="https://zenn.dev">Zenn</a> markdown.</p>

[![npm version](https://badge.fury.io/js/notion-to-zenn-md.svg)](https://badge.fury.io/js/notion-to-zenn-md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[📜 Documentation(日本語)](https://www.kohsuk.tech/articles/notion-to-zenn-markdown)

</div>

## Install

```sh
npm install notion-to-zenn-md
```

## Usage
> Please ensure that your Notion integration settings are all set up correctly. Please refer to [Getting Started Guide](https://developers.notion.com/docs/getting-started) for more information.

```typescript
import NotionToZennMarkdown from "notion-to-zenn-md";

// Instantiate with your Notion integration secret
const n2zm = new NotionToZennMarkdown('your_notion_integration_secret');
// Generate markdown from Notion page
const md = await n2zm.generateMd('notion_page_id');

console.log(md);
```

## License

Copyright (c) Kosuke Kihara. All rights reserved.

Licensed under the MIT License. See [LICENSE](./LICENSE)