import { Client } from "@notionhq/client";

export type NotionClient = Client;

// ##############################################
// User
// ##############################################
type UserWrapper<T extends string, U> = {
  object: "user";
  id: string;
  type?: T;
  name?: string;
  avatar_url?: string;
} & {
    [K in T]?: U;
  };

type UserType = UserWrapper<
  "person",
  {
    email: string;
  }
>;

type BotType = UserWrapper<
  "bot",
  {
    type: "workspace" | "user";
    workspace_name?: string | null;
  }
>;

export type User = UserType | BotType;

// ##############################################
// Page Property
// ##############################################

export type PropertyColor =
  | "blue"
  | "brown"
  | "default"
  | "gray"
  | "green"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "yellow";

export type PagePropertyWrapper<T extends string, U> = {
  type: T;
  id: string;
} & {
    [K in T]: U;
  };

export type CheckBoxProperty = PagePropertyWrapper<"checkbox", boolean>;

export type CreatedByProperty = PagePropertyWrapper<"created_by", User>;

export type CreatedTimeProperty = PagePropertyWrapper<"created_time", string>;

export type DateProperty = PagePropertyWrapper<
  "date",
  {
    start: string;
    end: string | null;
    time_zone: string | null;
  }
>;

export type EmailProperty = PagePropertyWrapper<"email", string>;

type FileWrapper<T extends string, U> = {
  type: T;
  name: string;
} & {
    [K in T]: U;
  };

export type FilePropertyValue = FileWrapper<
  "file",
  {
    url: string;
    expiry_time: string;
  }
>;

export type ExternalPropertyValue = FileWrapper<
  "external",
  {
    url: string;
  }
>;

export type FileProperty = FilePropertyValue | ExternalPropertyValue;

export type FilesProperty = PagePropertyWrapper<
  "files",
  Array<
    {
      name: string;
    } & FileProperty
  >
>;

type FormulaValue<T extends string, U> = {
  type: T;
} & {
    [K in T]: U;
  };

export type FormulaProperty = PagePropertyWrapper<
  "formula",
  | FormulaValue<"boolean", boolean>
  | FormulaValue<"date", any>
  | FormulaValue<"number", number>
  | FormulaValue<"string", string>
>;

export type LastEditedByProperty = PagePropertyWrapper<"last_edited_by", User>;

export type LastEditedTimeProperty = PagePropertyWrapper<
  "last_edited_time",
  string
>;

type MultiSelectValue = {
  id: string;
  color: PropertyColor;
  name: string;
};

export type MultiSelectProperty = PagePropertyWrapper<
  "multi_select",
  Array<MultiSelectValue>
>;

export type NumberProperty = PagePropertyWrapper<"number", number>;

export type PeopleProperty = PagePropertyWrapper<"people", User[]>;

export type PhoneNumberProperty = PagePropertyWrapper<"phone_number", string>;

export type RelationProperty = PagePropertyWrapper<
  "relation",
  Array<{ id: string }>
> & { has_more: boolean };

// TODO
export type RollupProperty = PagePropertyWrapper<"rollup", any>;

export type RichTextProperty = PagePropertyWrapper<
  "rich_text",
  Array<TextRichText>
>;

export type SelectProperty = PagePropertyWrapper<
  "select",
  {
    id: string;
    name: string;
    color: PropertyColor;
  }
>;

export type StatusProperty = PagePropertyWrapper<
  "status",
  {
    id: string;
    name: string;
    color: PropertyColor;
  }
>;

export type Title = Array<TextRichText>;
export type TitleProperty = PagePropertyWrapper<"title", Title>;

export type UrlProperty = PagePropertyWrapper<"url", string>;

export type UniqueIdProperty = PagePropertyWrapper<
  "unique_id",
  {
    number: number;
    prefix: string | null;
  }
>;

export type Date = {
  start: string;
  end: string | null;
  time_zone: string | null;
};

export type VerificationProperty = PagePropertyWrapper<
  "verification",
  {
    state: string;
    verified_by: User | null;
    date: Date | null;
  }
>;

// ##############################################
// Page
// ##############################################

export type Emoji = {
  type: "emoji";
  emoji: string;
};

type Property =
  | CheckBoxProperty
  | CreatedByProperty
  | CreatedTimeProperty
  | DateProperty
  | EmailProperty
  | FilesProperty
  | FormulaProperty
  | LastEditedByProperty
  | LastEditedTimeProperty
  | MultiSelectProperty
  | NumberProperty
  | PeopleProperty
  | PhoneNumberProperty
  | RelationProperty
  | RollupProperty
  | RichTextProperty
  | SelectProperty
  | StatusProperty
  | TitleProperty
  | UrlProperty
  | UniqueIdProperty
  | VerificationProperty;

type ParentWrapper<T extends string, U> = {
  type: T;
} & {
    [K in T]: U;
  }

type DatabaseParent = ParentWrapper<'database_id', string>;
type PageParent = ParentWrapper<'page_id', string>;
type WorkspaceParent = ParentWrapper<'workspace', true>;
type BlockParent = ParentWrapper<'block_id', string>;
export type Parent = DatabaseParent | PageParent | WorkspaceParent | BlockParent;

export type Page = {
  object: "page";
  id: string;
  created_time: string;
  created_by: User;
  last_edited_time: string;
  last_edited_by: User;
  archived: boolean;
  icon: File | Emoji | null;
  cover: ExternalPropertyValue | null;
  properties: Record<string, Property>,
  parent: Parent;
  url: string;
  public_url: string | null;
};

// ##############################################
// Database
// ##############################################

export type Database = Array<Page>;

// ##############################################
// Block
// ##############################################

export type RichTextWapper<T, U> = U & {
  type: T;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
};

export type EquationRichText = RichTextWapper<
  "equation",
  {
    equation: {
      expression: string;
    };
  }
>;

export type TextRichText = RichTextWapper<
  "text",
  {
    text: {
      content: string;
      link: {
        url: string;
      } | null;
    };
  }
>;

export type DateMention = MentionWrapper<"date"> & {
  date: {
    start: string;
    end: string | null;
  };
};

export type DatabaseMention = MentionWrapper<"database"> & {
  database: {
    id: string;
  };
};

export type LinkPreviewMention = MentionWrapper<"link_preview"> & {
  link_preview: {
    url: string;
  };
};

export type PageMeniton = MentionWrapper<"page"> & {
  page: {
    id: string;
  };
};

export type TemplateMention = MentionWrapper<"template_mention"> & {
  template_mention: {
    type: string;
    template_mention_date: string;
  };
};

export type UserMention = MentionWrapper<"user"> & {
  user: User;
};

export type MentionWrapper<T> = RichTextWapper<
  "mention",
  {
    mention: {
      type: T;
    };
  }
>;

export type MentionRichText =
  | DateMention
  | DatabaseMention
  | LinkPreviewMention
  | PageMeniton
  | TemplateMention
  | UserMention;

export type RichText = EquationRichText | TextRichText | MentionRichText;

// Individual Block Types

export type BlockWrapper<T extends string, U> = {
  type: T;
  object: "block";
  id: string;
  parent: {
    type: string;
    page_id: string;
  };
  created_time: string;
  last_edited_time: string;
  created_by: User;
  last_edited_by: User;
  has_children: boolean;
  archived: boolean;
  is_togglable: boolean;
  color: Color;
} & { [K in T]: U };

// Define Bookmark using the BlockContentWrapper
export type Bookmark = BlockWrapper<
  "bookmark",
  {
    caption: RichText[];
    url: string;
  }
>;

export type Color =
  | "blue"
  | "blue_background"
  | "brown"
  | "brown_background"
  | "default"
  | "gray"
  | "gray_background"
  | "green"
  | "green_background"
  | "orange"
  | "orange_background"
  | "yellow"
  | "green"
  | "pink"
  | "pink_background"
  | "purple"
  | "purple_background"
  | "red"
  | "red_background"
  | "yellow_background";

export type Breadcrumb = BlockWrapper<"breadcrumb", {}>;

export type BulletedListItem = BlockWrapper<
  "bulleted_list_item",
  {
    rich_text: RichText[];
    color: Color;
    children: Block[];
  }
>;

export type Callout = BlockWrapper<
  "callout",
  {
    rich_text: RichText[];
    icon: Emoji | FileProperty; // TODO
    color: Color;
  }
>;

export type ChildDatabase = BlockWrapper<
  "child_database",
  {
    title: string;
  }
>;

export type ChildPage = BlockWrapper<
  "child_page",
  {
    title: string;
  }
>;

export type Language =
  | "abap"
  | "arduino"
  | "bash"
  | "basic"
  | "c"
  | "clojure"
  | "coffeescript"
  | "c++"
  | "c#"
  | "css"
  | "dart"
  | "diff"
  | "docker"
  | "elixir"
  | "elm"
  | "erlang"
  | "flow"
  | "fortran"
  | "f#"
  | "gherkin"
  | "glsl"
  | "go"
  | "graphql"
  | "groovy"
  | "haskell"
  | "html"
  | "java"
  | "javascript"
  | "json"
  | "julia"
  | "kotlin"
  | "latex"
  | "less"
  | "lisp"
  | "livescript"
  | "lua"
  | "makefile"
  | "markdown"
  | "markup"
  | "matlab"
  | "mermaid"
  | "nix"
  | "objective-c"
  | "ocaml"
  | "pascal"
  | "perl"
  | "php"
  | "plain text"
  | "powershell"
  | "prolog"
  | "protobuf"
  | "python"
  | "r"
  | "reason"
  | "ruby"
  | "rust"
  | "sass"
  | "scala"
  | "scheme"
  | "scss"
  | "shell"
  | "sql"
  | "swift"
  | "typescript"
  | "vb.net"
  | "verilog"
  | "vhdl"
  | "visual basic"
  | "webassembly"
  | "xml"
  | "yaml"
  | "java/c/c++/c#";

export type Code = BlockWrapper<
  "code",
  {
    caption: RichText[];
    rich_text: RichText[];
    language: Language;
  }
>;

export type ColumnList = BlockWrapper<"column_list", {}>;

export type Column = BlockWrapper<"column", {}>;

export type Divider = BlockWrapper<"divider", {}>;

export type Embed = BlockWrapper<
  "embed",
  {
    url: string;
  }
>;

export type Equation = BlockWrapper<
  "equation",
  {
    expression: string;
  }
>;

export type File = BlockWrapper<
  "file",
  {
    caption: RichText[];
    type: string;
    file: any; // TODO
  }
>;

export type Heading1 = BlockWrapper<
  "heading_1",
  {
    rich_text: RichText[];
    color: Color;
    is_togglable: boolean;
  }
>;

export type Heading2 = BlockWrapper<
  "heading_2",
  {
    rich_text: RichText[];
    color: Color;
    is_togglable: boolean;
  }
>;

export type Heading3 = BlockWrapper<
  "heading_3",
  {
    rich_text: RichText[];
    color: Color;
    is_togglable: boolean;
  }
>;

export type FileType = "external" | "file";

export type Image = BlockWrapper<
  "image",
  {
    type: FileType;
    external: {
      url: string;
    };
    file: {
      url: string;
      expiry_time: string;
    };
    caption?: RichText[];
  }
>;

export type LinkPreview = BlockWrapper<
  "link_preview",
  {
    url: string;
  }
>;

export type NumberedListItem = BlockWrapper<
  "numbered_list_item",
  {
    rich_text: RichText[];
    color: Color;
    children: Block[];
  }
>;

export type Paragraph = BlockWrapper<
  "paragraph",
  {
    rich_text: RichText[];
    color: Color;
    children: Block[];
  }
>;

export type PDF = BlockWrapper<
  "pdf",
  {
    caption: RichText[];
    type: FileType;
    external: {
      url: string;
    };
    file: {
      url: string;
      expiry_time: string;
    };
  }
>;

export type Quote = BlockWrapper<
  "quote",
  {
    rich_text: RichText[];
    color: Color;
    children: Block[];
  }
>;

export type SyncedBlock = BlockWrapper<
  "synced_block",
  {
    synced_form?: {
      block_id: string;
    };
    children?: Block[];
  }
>;

export type Table = BlockWrapper<
  "table",
  {
    talbe_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  }
>;

export type TableRow = BlockWrapper<
  "table_row",
  {
    cells: RichText[];
  }
>;

export type TableOfContents = BlockWrapper<
  "table_of_contents",
  {
    color: Color;
  }
>;

export type ToDo = BlockWrapper<
  "to_do",
  {
    rich_text: RichText[];
    checked: boolean;
    color: Color;
    children: Block[];
  }
>;

export type Toggle = BlockWrapper<
  "toggle",
  {
    rich_text: RichText[];
    color: Color;
    children: Block[];
  }
>;

export type Video = BlockWrapper<
  "video",
  {
    caption: RichText[];
    type: FileType;
    external: {
      url: string;
    };
    file: {
      url: string;
      expiry_time: string;
    };
  }
>;

export type Block =
  | Bookmark
  | BulletedListItem
  | Callout
  | ChildPage
  | Code
  | ColumnList
  | Column
  | Divider
  | Embed
  | Equation
  | File
  | Heading1
  | Heading2
  | Heading3
  | Image
  | LinkPreview
  | NumberedListItem
  | Paragraph
  | PDF
  | Quote
  | SyncedBlock
  | Table
  | TableRow
  | TableOfContents
  | ToDo
  | Toggle
  | Video;

export type BlockList = {
  object: "list";
  results: Array<Block>;
  next_cursor: string | null;
  has_more: boolean;
  type: string;
  block: Block;
};
