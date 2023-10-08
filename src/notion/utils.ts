import { RichText, Title } from "./types";

export function getRichTextString(richText?: RichText[]): string {
  if (!richText || richText.length < 1) {
    return "";
  }

  return richText[0].plain_text || "";
}

export function getTitleString(title?: Title): string {
  if (!title || title.length < 1) {
    return "";
  }

  return title[0].plain_text || "";
}

