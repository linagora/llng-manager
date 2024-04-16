export function transformJsonToList(key: string): string[] {
  const regex: RegExp = /(?:\(\?#(\w+)\))?(.+)(?:\(\?#AuthnLevel=(\d+)\))?/;
  const matches: RegExpMatchArray | null = key.match(regex);

  if (matches) {
    const result: string[] = [matches[1], matches[2], matches[3] || ""];
    return result;
  } else {
    console.log("No match found.");
    return ["", "default", ""];
  }
}
