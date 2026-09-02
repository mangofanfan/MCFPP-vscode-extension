import { Hover, MarkdownString } from "vscode";
import { parseDocComment } from "./parseDocComment";

export function enhanceDocComment(hover: Hover): Hover {
  const mdString = hover.contents[0] as MarkdownString;
  const pdc = parseDocComment(mdString.value);
  const newMdString = new MarkdownString();
  newMdString.appendCodeblock(pdc.source);
  newMdString.appendMarkdown(`\n---\n${pdc.summary}\n\n---\n`);
  if (pdc.params) {
    newMdString.appendMarkdown("### 参数\n\n");
    for (const param of pdc.params) {
      newMdString.appendMarkdown(`* \`${param.name}\` : ${param.desc}\n`);
    }
  }
  if (pdc.returns) {
    newMdString.appendMarkdown("### 返回值\n\n");
    newMdString.appendMarkdown(`${pdc.returns}`);
  }
  hover.contents[0] = newMdString;
  return hover;
}
