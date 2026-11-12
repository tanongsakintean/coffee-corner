import { readFileSync } from "node:fs";
import { join } from "node:path";

type NamedToken = { name: string; value: string };
type TypographyToken = {
  name: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
};

function section(document: string, start: string, end: string) {
  const match = document.match(new RegExp(`^${start}:\\r?\\n([\\s\\S]*?)(?=^${end}:|^---$)`, "m"));
  if (!match) throw new Error(`Missing ${start} tokens in DESIGN.md`);
  return match[1];
}

function namedTokens(block: string, valuePattern: string): NamedToken[] {
  const pattern = new RegExp(`^  ([\\w-]+): '?(${valuePattern})'?\\r?$`, "gm");
  return [...block.matchAll(pattern)].map(([, name, value]) => ({ name, value }));
}

export function loadDesignTokens() {
  const document = readFileSync(join(process.cwd(), "DESIGN.md"), "utf8");
  const name = document.match(/^name: (.+)\r?$/m)?.[1];
  const colors = namedTokens(section(document, "colors", "typography"), "#[0-9a-fA-F]{6}");
  const rounded = namedTokens(section(document, "rounded", "spacing"), "[\\d.]+(?:px|rem)");
  const spacing = namedTokens(section(document, "spacing", "unused"), "[\\d.]+(?:px|rem)");
  const typography: TypographyToken[] = [
    ...section(document, "typography", "rounded").matchAll(/^  ([\w-]+):\r?\n((?:    [^\r\n]*\r?\n)*)/gm),
  ].map(([, tokenName, block]) => {
    const fields = Object.fromEntries(
      [...block.matchAll(/^    (\w+): '?([^'\r\n]+)'?\r?$/gm)].map(([, key, value]) => [key, value]),
    );
    return {
      name: tokenName,
      fontFamily: fields.fontFamily,
      fontSize: fields.fontSize,
      fontWeight: fields.fontWeight,
      lineHeight: fields.lineHeight,
      letterSpacing: fields.letterSpacing,
    };
  });

  if (!name || !colors.length || !rounded.length || !spacing.length || !typography.length) {
    throw new Error("DESIGN.md contains incomplete design tokens");
  }

  return { name, colors, rounded, spacing, typography };
}
