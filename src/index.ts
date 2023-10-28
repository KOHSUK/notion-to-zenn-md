import { NotionToMarkdown } from "notion-to-md";
import { NotionClient, getNotionClient, getPage } from "./notion";
import { getTransformer } from "./transformer";
import { FrontMatter } from "./zenn";
import { getTitleString } from "./notion/utils";
import { isCheckBoxProperty, isDateProperty, isEmojiProperty, isMultiSelectProperty, isSelectProperty, isTitleProperty } from "./notion/type_guards";
import { decodeUnicodeEscapeSequence } from "./utils";
import { format, parseISO } from "date-fns";

export type FrontMatterNotionPropMapping = {
  [key in keyof Omit<FrontMatter, 'emoji'>]: string;
}

const defaultMapping: FrontMatterNotionPropMapping = {
  title: 'Title',
  type: 'Type',
  topics: 'Topics',
  published: 'Published',
} as const;

export default class NotionToZennMarkdown {
  private transformer: NotionToMarkdown;
  private client: NotionClient;

  constructor(apiSecret: string) {
    this.client = getNotionClient(apiSecret);
    this.transformer = getTransformer(this.client);
  }

  /**
   * 指定したNotionのページIDのページをZenn記法のマークダウン(FrontMatterなし)に変換して返します。
   * @param pageId Notion Page ID
   * @returns Markdown representation of the page
   */
  async pageToZennMarkdown(pageId: string): Promise<string> {
    const mdBlocks = await this.transformer.pageToMarkdown(pageId);
    const mdString = this.transformer.toMarkdownString(mdBlocks);

    return mdString.parent;
  }

  /**
   * 指定したNotionのページIDのページプロパティからZenn記法のマークダウンのFrontMatterオブジェクトを生成して返します。
   * @param pageId Notion Page ID
   * @param mappingKeys Mapping Keys to Zenn Markdown Front Matter Keys
   * @returns Front Matter
   */
  async getFrontMatter(pageId: string, mappingKeys: Partial<FrontMatterNotionPropMapping> = defaultMapping): Promise<FrontMatter> {
    const mapping = { ...defaultMapping, ...mappingKeys };
    const page = await getPage(this.client, pageId);

    if (!page) {
      throw new Error(`Page not found. pageId: ${pageId}`);
    }

    // title
    const titleProp = page.properties[mapping.title];
    let title = "";
    if (titleProp && isTitleProperty(titleProp)) {
      title = getTitleString(titleProp.title)
    }

    const emojiProp = page.icon
    let emoji = "";
    if (emojiProp && isEmojiProperty(emojiProp)) {
      emoji = emojiProp.emoji;
    }

    const typeProp = page.properties[mapping.type];
    let type = "";
    if (typeProp && isSelectProperty(typeProp)) {
      type = typeProp.select.name;
    }

    const topicsProp = page.properties[mapping.topics];
    let topics: string[] = [];
    if (topicsProp && isMultiSelectProperty(topicsProp)) {
      topics = topicsProp.multi_select.map((val) => val.name);
    }

    const publishedProp = page.properties[mapping.published];
    let published = false;
    if (publishedProp && isCheckBoxProperty(publishedProp)) {
      published = publishedProp.checkbox;
    }

    let publishedAt = undefined;
    if (mapping.publishedAt) {
      const publishedAtProp = page.properties[mapping.publishedAt];
      if (publishedAtProp && isDateProperty(publishedAtProp)) {
        publishedAt = format(parseISO(publishedAtProp.date.start), 'yyyy-MM-dd HH:mm');
      }
    }

    const frontMatter: FrontMatter = {
      title,
      emoji,
      type,
      topics,
      published,
      publishedAt
    }

    return frontMatter;
  }

  /**
   * マークダウン文字列を生成します。
   * @param mdString マークダウンの文字列
   * @param frontMatter Front Matterのオブジェクト
   * @returns マークダウンの文字列
   */
  private _generateMd(mdString: string, frontMatter: FrontMatter): string {
    // // topicsをカスタムフォーマットに変換
    // const topicPlaceholder = "__TOPIC_PLACEHOLDER__";
    // const customTopics = `[${frontMatter.topics.map(topic => `"${topic}"`).join(', ')}]`;
    // // emojiを変換
    // const emojiPlaceholder = "__EMOJI_PLACEHOLDER__";
    // const decodedEmoji = decodeUnicodeEscapeSequence(frontMatter.emoji);
    // const modifiedFrontMatter = { ...frontMatter, topics: topicPlaceholder, emoji: emojiPlaceholder };
    // const md = matter.stringify(mdString, modifiedFrontMatter).replace(topicPlaceholder, customTopics).replace(emojiPlaceholder, decodedEmoji);

    // return md
    // topicsをカスタムフォーマットに変換
    const title = `title: "${frontMatter.title}"`;
    const emoji = `emoji: "${decodeUnicodeEscapeSequence(frontMatter.emoji)}"`;
    const type = `type: "${frontMatter.type}"`;
    const topics = `topics: [${frontMatter.topics.map(topic => `"${topic}"`).join(', ')}]`;
    const published = `published: ${frontMatter.published}`
    const publishedAt = frontMatter.publishedAt ? `published_at: ${frontMatter.publishedAt}` : "";

    return `---\n${title}\n${emoji}\n${type}\n${topics}\n${published}${publishedAt ? `\n${publishedAt}` : ""}\n---${mdString ? `\n${mdString}` : ""}`;
  }

  /**
   * 指定したNotionのページIDのページプロパティからFrontMatter文字列を生成します。
   * @param pageId Notion Page ID
   * @param mappingKeys Mapping Keys to Zenn Markdown Front Matter Keys
   * @returns FrontMatterの文字列を生成
   */
  async getFrontMatterString(pageId: string, mappingKeys?: Partial<FrontMatterNotionPropMapping>): Promise<string> {
    const frontMatter = await this.getFrontMatter(pageId, mappingKeys);
    const frontMatterString = this._generateMd("", frontMatter);

    return frontMatterString;
  }

  /**
   * マークダウン文字列を生成します。
   * @param mdString マークダウンの文字列
   * @param frontMatter Front Matterのオブジェクト
   * @returns マークダウンの文字列
   */
  stringify(mdString: string, fontMatter: FrontMatter): string {
    const frontMatterString = this._generateMd(mdString, fontMatter);

    return frontMatterString;
  }

  /**
   * 指定したNotionのページIDのページをZenn記法のマークダウンに変換して返します。
   * @param pageId Notion Page ID
   * @param mappingKeys Mapping Keys to Zenn Markdown Front Matter Keys
   * @returns Markdown representation of the page
   */
  async generateMd(pageId: string, mappingKeys?: Partial<FrontMatterNotionPropMapping>): Promise<string> {
    const mdString = await this.pageToZennMarkdown(pageId);
    const frontMatter = await this.getFrontMatter(pageId, mappingKeys);
    const zennMarkdown = this._generateMd(mdString, frontMatter);

    return zennMarkdown;
  }

  /**
   * Markdown文字列から画像のURLのリストを抽出します。
   * @param mdString Markdown文字列
   * @returns Image paths
   */
  extractImageUrls(mdString: string): string[] {
    const imagePathRegex = /!\[.*?\]\((http[s]?:\/\/[^\s)]+|[^)\s]+)\)/g;
    const matches = mdString.match(imagePathRegex);

    if (!matches) {
      return [];
    }

    const imagePaths = matches.map((match) => {
      const pathMatch = match.match(/!\[.*?\]\((http[s]?:\/\/[^\s)]+|[^)\s]+)\)/);
      if (pathMatch && pathMatch[1]) {
        return pathMatch[1];
      }
      return "";
    });

    return imagePaths.filter((path) => path !== "");
  }

  /**
   * 指定したNotionのページIDのページに含まれる画像のURLのリストを返します。
   * @param pageId Notion Page ID
   * @returns Image paths
   */
  async listImageUrls(pageId: string): Promise<string[]> {
    const markdown = await this.pageToZennMarkdown(pageId);
    const imageUrls = this.extractImageUrls(markdown);

    return imageUrls;
  }
}