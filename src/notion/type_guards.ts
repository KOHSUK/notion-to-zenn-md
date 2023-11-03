import {
  Bookmark,
  Breadcrumb,
  BulletedListItem,
  Callout,
  CheckBoxProperty,
  ChildDatabase,
  ChildPage,
  Code,
  ColumnList,
  CreatedByProperty,
  CreatedTimeProperty,
  DateProperty,
  Divider,
  EmailProperty,
  Embed,
  Emoji,
  Equation,
  File,
  FilesProperty,
  FormulaProperty,
  Heading1,
  Heading2,
  Heading3,
  Image,
  LastEditedByProperty,
  LastEditedTimeProperty,
  LinkPreview,
  MultiSelectProperty,
  NumberProperty,
  NumberedListItem,
  PDF,
  Paragraph,
  PeopleProperty,
  PhoneNumberProperty,
  Quote,
  RelationProperty,
  RichTextProperty,
  RollupProperty,
  SelectProperty,
  StatusProperty,
  SyncedBlock,
  Table,
  TableOfContents,
  TableRow,
  TitleProperty,
  ToDo,
  Toggle,
  UrlProperty,
  Video,
} from './types';

// ##############################################
// Block
// ##############################################

// Type Guards for Bookmark
export function isBookmarkBlock(block: unknown): block is Bookmark {
  return (block as Bookmark).type === 'bookmark';
}

// Type Guards for BreadCrumb
export function isBreadcrumbBlock(block: unknown): block is Breadcrumb {
  return (block as Breadcrumb).type === 'breadcrumb';
}

// Type Guards for BulletedListItem
export function isBulletedListItemBlock(
  block: unknown,
): block is BulletedListItem {
  return (block as BulletedListItem).type === 'bulleted_list_item';
}

// Type Guards for Callout
export function isCalloutBlock(block: unknown): block is Callout {
  return (block as Callout).type === 'callout';
}

// Type Guards for ChildDatabase
export function isChildDatabaseBlock(block: unknown): block is ChildDatabase {
  return (block as ChildDatabase).type === 'child_database';
}

// Type Guards for ChildPage
export function isChildPageBlock(block: unknown): block is ChildPage {
  return (block as ChildPage).type === 'child_page';
}

// Type Guards for Code
export function isCodeBlock(block: unknown): block is Code {
  return (block as Code).type === 'code';
}

// Type Guards for ColumnList
export function isColumnListBlock(block: unknown): block is ColumnList {
  return (block as ColumnList).type === 'column_list';
}

// Type Guards for Divider
export function isDividerBlock(block: unknown): block is Divider {
  return (block as Divider).type === 'divider';
}

// Type Guards for Embed
export function isEmbedBlock(block: unknown): block is Embed {
  return (block as Embed).type === 'embed';
}

// Type Guards for Equation
export function isEquationBlock(block: unknown): block is Equation {
  return (block as Equation).type === 'equation';
}

// Type Guards for File
export function isFileBlock(block: unknown): block is File {
  return (block as File).type === 'file';
}

// Type Guards for Heading1
export function isHeading1Block(block: unknown): block is Heading1 {
  return (block as Heading1).type === 'heading_1';
}

// Type Guards for Heading2
export function isHeading2Block(block: unknown): block is Heading2 {
  return (block as Heading2).type === 'heading_2';
}

// Type Guards for Heading3
export function isHeading3Block(block: unknown): block is Heading3 {
  return (block as Heading3).type === 'heading_3';
}

// Type Guards for Image
export function isImageBlock(block: unknown): block is Image {
  return (block as Image).type === 'image';
}

// Type Guards for LinkPreview
export function isLinkPreviewBlock(block: unknown): block is LinkPreview {
  return (block as LinkPreview).type === 'link_preview';
}

// Type Guards for NumberedListItem
export function isNumberedListItemBlock(
  block: unknown,
): block is NumberedListItem {
  return (block as NumberedListItem).type === 'numbered_list_item';
}

// Type Guards for Paragraph
export function isParagraphBlock(block: unknown): block is Paragraph {
  return (block as Paragraph).type === 'paragraph';
}

// Type Guards for PDF
export function isPDFBlock(block: unknown): block is PDF {
  return (block as PDF).type === 'pdf';
}

// Type Guards for Quote
export function isQuoteBlock(block: unknown): block is Quote {
  return (block as Quote).type === 'quote';
}

// Type Guards for SyncedBlock
export function isSyncedBlockBlock(block: unknown): block is SyncedBlock {
  return (block as SyncedBlock).type === 'synced_block';
}

// Type Guards for Table
export function isTableBlock(block: unknown): block is Table {
  return (block as Table).type === 'table';
}

// Type Guards for TableRow
export function isTableRowBlock(block: unknown): block is TableRow {
  return (block as TableRow).type === 'table_row';
}

// Type Guards for TableOfContents
export function isTableOfContentsBlock(
  block: unknown,
): block is TableOfContents {
  return (block as TableOfContents).type === 'table_of_contents';
}

// Type Guards for ToDo
export function isToDoBlock(block: unknown): block is ToDo {
  return (block as ToDo).type === 'to_do';
}

// Type Guards for Toggle
export function isToggleBlock(block: unknown): block is Toggle {
  return (block as Toggle).type === 'toggle';
}

// Type Guards for Video
export function isVideoBlock(block: unknown): block is Video {
  return (block as Video).type === 'video';
}

// ##############################################
// Property
// ##############################################

// Type Guards for CheckBox

export function isCheckBoxProperty(
  property: unknown,
): property is CheckBoxProperty {
  return (property as CheckBoxProperty).type === 'checkbox';
}

// Type Guards for CreatedByProperty
export function isCreatedByProperty(
  property: unknown,
): property is CreatedByProperty {
  return (property as CreatedByProperty).type === 'created_by';
}

// Type Guards for CreatedTimeProperty
export function isCreatedTimeProperty(
  property: unknown,
): property is CreatedTimeProperty {
  return (property as CreatedTimeProperty).type === 'created_time';
}

// Type Guards for DateProperty
export function isDateProperty(property: unknown): property is DateProperty {
  return (property as DateProperty).type === 'date';
}

// Type Guards for EmailProperty
export function isEmailProperty(property: unknown): property is EmailProperty {
  return (property as EmailProperty).type === 'email';
}

// Type Guards for FilesProperty
export function isFilesProperty(property: unknown): property is FilesProperty {
  return (property as FilesProperty).type === 'files';
}

// Type Guards for FormulaProperty
export function isFormulaProperty(
  property: unknown,
): property is FormulaProperty {
  return (property as FormulaProperty).type === 'formula';
}

// Type Guards for LastEditedByProperty
export function isLastEditedByProperty(
  property: unknown,
): property is LastEditedByProperty {
  return (property as LastEditedByProperty).type === 'last_edited_by';
}

// Type Guards for LastEditedTimeProperty
export function isLastEditedTimeProperty(
  property: unknown,
): property is LastEditedTimeProperty {
  return (property as LastEditedTimeProperty).type === 'last_edited_time';
}

// Type Guards for MultiSelectProperty
export function isMultiSelectProperty(
  property: unknown,
): property is MultiSelectProperty {
  return (property as MultiSelectProperty).type === 'multi_select';
}

// Type Guards for NumberProperty
export function isNumberProperty(
  property: unknown,
): property is NumberProperty {
  return (property as NumberProperty).type === 'number';
}

// Type Guards for PeopleProperty
export function isPeopleProperty(
  property: unknown,
): property is PeopleProperty {
  return (property as PeopleProperty).type === 'people';
}

// Type Guards for PhoneNumberProperty
export function isPhoneNumberProperty(
  property: unknown,
): property is PhoneNumberProperty {
  return (property as PhoneNumberProperty).type === 'phone_number';
}

// Type Guards for RelationProperty
export function isRelationProperty(
  property: unknown,
): property is RelationProperty {
  return (property as RelationProperty).type === 'relation';
}

// Type Guards for RichTextProperty
export function isRichTextProperty(
  property: unknown,
): property is RichTextProperty {
  return (property as RichTextProperty).type === 'rich_text';
}

// Type Guards for RollupProperty
export function isRollupProperty(
  property: unknown,
): property is RollupProperty {
  // Note: The type string for RollupProperty was not provided.
  return (property as RollupProperty).type === 'rollup';
}

// Type Guards for SelectProperty
export function isSelectProperty(
  property: unknown,
): property is SelectProperty {
  return (property as SelectProperty).type === 'select';
}

// Type Guards for StatusProperty
export function isStatusProperty(
  property: unknown,
): property is StatusProperty {
  return (property as StatusProperty).type === 'status';
}

// Type Guards for TitleProperty
export function isTitleProperty(property: unknown): property is TitleProperty {
  return (property as TitleProperty).type === 'title';
}

// Type Guards for UrlProperty
export function isUrlProperty(property: unknown): property is UrlProperty {
  return (property as UrlProperty).type === 'url';
}

export function isEmojiProperty(property: unknown): property is Emoji {
  return (property as Emoji).type === 'emoji';
}
