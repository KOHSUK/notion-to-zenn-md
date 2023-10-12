import { NotionToMarkdown } from "notion-to-md";
import { NotionClient, getNotionClient, getPage } from "./notion";
import { getTransformer } from "./transformer";
import { ArticleTypes, FrontMatter } from "./zenn";
import type { ArticleType } from "./zenn/types";
import { getTitleString } from "./notion/utils";
import { isCheckBoxProperty, isDateProperty, isEmojiProperty, isMultiSelectProperty, isSelectProperty, isTitleProperty } from "./notion/type_guards";
import { decodeUnicodeEscapeSequence } from "./utils";
import { format } from "date-fns";

type FrontMatterNotionPropMapping = {
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
   * 指定したNotionのページIDのページをZenn記法のマークダウンに変換して返します。
   * @param pageId Notion Page ID
   * @returns Markdown representation of the page
   */
  async pageToZennMarkdown(pageId: string): Promise<string> {
    const mdBlocks = await this.transformer.pageToMarkdown(pageId);
    const mdString = this.transformer.toMarkdownString(mdBlocks);

    return mdString.parent;
  }

  /**
   * 指定したNotionのページIDのページプロパティからZenn記法のマークダウンのFrontMatterを生成して返します。
   * @param pageId Notion Page ID
   * @param mappingKeys Mapping Keys to Zenn Markdown Front Matter Keys
   * @returns Front Matter
   */
  async getFrontMatter(pageId: string, mappingKeys: FrontMatterNotionPropMapping): Promise<FrontMatter> {
    const page = await getPage(this.client, pageId);

    // title
    const titleProp = page.properties[mappingKeys.title];
    let title = "";
    if (isTitleProperty(titleProp)) {
      title = getTitleString(titleProp.title)
    }

    const emojiProp = page.icon
    let emoji = "";
    if (isEmojiProperty(emojiProp)) {
      emoji = emojiProp.emoji;
    }

    const typeProp = page.properties[mappingKeys.type];
    let type: ArticleType = ArticleTypes[0];
    if (isSelectProperty(typeProp) && (ArticleTypes.includes(typeProp.select.name as ArticleType))) {
      type = typeProp.select.name as ArticleType;
    }

    const topicsProp = page.properties[mappingKeys.topics];
    let topics: string[] = [];
    if (isMultiSelectProperty(topicsProp)) {
      topics = topicsProp.multi_select.map((val) => val.name);
    }

    const publishedProp = page.properties[mappingKeys.published];
    let published = false;
    if (isCheckBoxProperty(publishedProp)) {
      published = publishedProp.checkbox;
    }

    let publishedAt = undefined;
    if (mappingKeys.publishedAt) {
      const publishedAtProp = page.properties[mappingKeys.publishedAt];
      if (isDateProperty(publishedAtProp)) {
        publishedAt = format(new Date(publishedAtProp.date.start), 'yyyy-MM-dd HH:mm');
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
   * 指定したNotionのページIDのページプロパティからFrontMatterを生成します。
   * @param pageId Notion Page ID
   * @param mappingKeys Mapping Keys to Zenn Markdown Front Matter Keys
   * @returns FrontMatterの文字列を生成
   */
  async getFrontMatterString(pageId: string, mappingKeys: Partial<FrontMatterNotionPropMapping> = defaultMapping): Promise<string> {
    const mapping = { ...defaultMapping, ...mappingKeys };
    const frontMatter = await this.getFrontMatter(pageId, mapping);
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

  async generateMd(pageId: string, mappingKeys: Partial<FrontMatterNotionPropMapping> = defaultMapping): Promise<string> {
    const mapping = { ...defaultMapping, ...mappingKeys };
    const mdString = await this.pageToZennMarkdown(pageId);
    const frontMatter = await this.getFrontMatter(pageId, mapping);
    const zennMarkdown = this._generateMd(mdString, frontMatter);

    return zennMarkdown;
  }
}