import { NotionToMarkdown } from 'notion-to-md';
import {
  Bookmark,
  Callout,
  Code,
  Embed,
  Equation,
  Image,
  NotionClient,
} from '../notion';

export function getTransformer(notion: NotionClient) {
  const n2m = new NotionToMarkdown({ notionClient: notion });

  // Add custom transformer

  // bookmark
  // https://zenn.dev/zenn/articles/markdown-guide#%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%AB%E3%83%BC%E3%83%89
  n2m.setCustomTransformer('bookmark', (block) => {
    const { bookmark } = block as Bookmark;
    if (!bookmark.url) return '';

    return `
@[card](${bookmark.url})
`;
  });

  // image
  // https://zenn.dev/zenn/articles/markdown-guide#%E7%94%BB%E5%83%8F
  n2m.setCustomTransformer('image', async (block) => {
    let imageUrl = '';
    const { image } = block as Image;

    const caption = image.caption
      ? image.caption.map((item) => item.plain_text).join('')
      : '';

    if (image.type === 'external') {
      imageUrl = `![${caption || 'image'}](${image.external.url})`;
    }

    if (image.type === 'file') {
      imageUrl = `![${caption || 'image'}](${image.file.url})`;
    }

    // キャプション
    // https://zenn.dev/zenn/articles/markdown-guide#%E3%82%AD%E3%83%A3%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E3%81%A4%E3%81%91%E3%82%8B
    if (caption) {
      imageUrl += `\n*${caption}*`;
    }

    return imageUrl;
  });

  // embed
  // https://zenn.dev/zenn/articles/markdown-guide#%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84%E3%81%AE%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BF
  n2m.setCustomTransformer('embed', (block) => {
    const { embed } = block as Embed;
    if (!embed.url) return '';

    return `
${embed.url}
`;
  });

  // equation
  // https://zenn.dev/zenn/articles/markdown-guide#%E6%95%B0%E5%BC%8F
  n2m.setCustomTransformer('equation', (block) => {
    const { equation } = block as Equation;

    return `$$
${equation.expression}
$$`;
  });

  // callout
  // https://zenn.dev/zenn/articles/markdown-guide#%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8
  n2m.setCustomTransformer('callout', (block) => {
    const { callout } = block as Callout;

    let icon = '';
    if (callout.icon.type === 'emoji') {
      icon = callout.icon.emoji;
    }

    return `
:::message
${icon} ${callout.rich_text.map((item) => item.plain_text).join('')}
:::
`;
  });

  // code
  // https://zenn.dev/zenn/articles/markdown-guide#%E3%82%B3%E3%83%BC%E3%83%89%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF
  n2m.setCustomTransformer('code', (block) => {
    const { code } = block as Code;
    const language = code.language === 'plain text' ? 'text' : code.language;
    const fileName = code.caption.map((item) => item.plain_text).join('');
    const codeString = code.rich_text.map((item) => item.plain_text).join('');

    if (language === 'diff') {
      return `\`\`\`${language} ${fileName || 'text'}
${codeString}
\`\`\``;
    }

    if (language === 'text' && fileName) {
      return `\`\`\`${fileName}
${codeString}
\`\`\``;
    }

    return `\`\`\`${language}${fileName ? `:${fileName}` : ''}
${codeString}
\`\`\``;
  });

  // toggleのcustom transformerはバグで動作しない https://github.com/souvikinator/notion-to-md/issues/98
  //   // toggle
  //   // https://zenn.dev/zenn/articles/markdown-guide#%E3%82%A2%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%82%AA%E3%83%B3%EF%BC%88%E3%83%88%E3%82%B0%E3%83%AB%EF%BC%89
  //   n2m.setCustomTransformer('toggle', async (block) => {
  //     const { toggle } = block as Toggle;
  //     const toggleMd = await n2m.blocksToMarkdown(toggle.children);
  //     const toggleMdString = n2m.toMarkdownString(toggleMd);

  //     console.log(toggleMdString)

  //     return `
  // :::details ${toggle.rich_text.map((val) => val.plain_text).join("")}
  // ${toggleMdString.parent}
  // :::
  // `;
  //   });

  return n2m;
}
