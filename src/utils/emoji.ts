export function decodeUnicodeEscapeSequence(unicodeString: string): string {
    // 正規表現を使用して、"\U0001F929" のようなパターンをすべて取得
    const regex = /\\U([a-fA-F0-9]{8}|[a-fA-F0-9]{4})/g;

    return unicodeString.replace(regex, (_, code) => {
        const codePoint = parseInt(code, 16); // 16進数を整数に変換
        return String.fromCodePoint(codePoint); // ユニコードコードポイントから文字に変換
    });
}