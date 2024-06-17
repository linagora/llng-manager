export function transformJsonToList(key: string): string[] {
  const regex: RegExp =
    /(?:\(\?#([\w|\s?]+)\))?([^()]+)(?:\(\?#AuthnLevel=(\d+)\))?/;
  const matches: RegExpMatchArray | null = key.match(regex);

  if (matches) {
    const result: string[] = [matches[1], matches[2], matches[3] || ""];
    return result;
  } else {
    console.debug("No match found.");
    return ["", "default", ""];
  }
}

export function transformListToJson(
  list: Array<Record<string, string>>
): Record<string, string> {
  const locationRules: Record<string, string> = {};
  list.forEach((part) => {
    const formattedString: string = `${
      part.comment ? `(?#${part.comment})` : ""
    }${part.regex}${part.authLevel ? `(?#AuthnLevel=${part.authLevel})` : ""}`;
    locationRules[formattedString] = part.rule;
  });
  return locationRules;
}
