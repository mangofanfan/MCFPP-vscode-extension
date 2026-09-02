export interface ParsedDoc {
  source: string;
  summary: string;
  params: { name: string; desc: string }[];
  returns?: string;
  see?: string;
  since?: string;
  deprecated?: string;
  version?: string;
  author?: string;
  base?: string;
  throws: string[];
  tags: Record<string, string>;
}

const PARAM_RE = /^@param\s+(\w+)\s*(.*)$/;
const RETURN_RE = /^@return\s+(.*)$/;
const SEE_RE = /^@see\s+(.*)$/;
const SINCE_RE = /^@since\s+(.*)$/;
const DEPRECATED_RE = /^@deprecated\s+(.*)$/;
const VERSION_RE = /^@version\s+(.*)$/;
const AUTHOR_RE = /^@author\s+(.*)$/;
const BASE_RE = /^@base\s+(.*)$/;
const THROWS_RE = /^@throws\s+(.*)$/;
const TAG_RE = /^@(\w+)\s*(.*)$/;

/**
 * 处理文档字符串
 *
 * @param raw 是去掉 #{} 之后剩下的字符串，可能多行
 * @returns ParsedDoc
 */
export function parseDocComment(raw: string): ParsedDoc {
  const lines = raw.split(/\r?\n/).map((l) => l.trim());
  const summaryLines: string[] = [];
  const params: ParsedDoc["params"] = [];
  const throws: string[] = [];
  const tags: Record<string, string> = {};
  let returns: string | undefined;
  let see: string | undefined;
  let since: string | undefined;
  let deprecated: string | undefined;
  let version: string | undefined;
  let author: string | undefined;
  let base: string | undefined;

  // 收集函数签名
  const source = lines[1];
  const newLines = lines.slice(6);

  for (const line of newLines) {
    // 参数
    const param = line.match(PARAM_RE);
    if (param) {
      params.push({ name: param[1], desc: param[2] });
      continue;
    }
    // 返回值
    const _ret = line.match(RETURN_RE);
    if (_ret) {
      returns = _ret[1];
      continue;
    }
    // 参见
    const _see = line.match(SEE_RE);
    if (_see) {
      see = _see[1];
      continue;
    }
    // 添加版本
    const _since = line.match(SINCE_RE);
    if (_since) {
      since = _since[1];
      continue;
    }
    // 弃用版本
    const _depre = line.match(DEPRECATED_RE);
    if (_depre) {
      deprecated = _depre[1];
      continue;
    }
    // 指定版本
    const _ver = line.match(VERSION_RE);
    if (_ver) {
      version = _ver[1];
      continue;
    }
    // 指定作者
    const _author = line.match(AUTHOR_RE);
    if (_author) {
      author = _author[1];
      continue;
    }
    // 指定实体的基实体
    const _base = line.match(BASE_RE);
    if (_base) {
      base = _base[1];
      continue;
    }
    // 抛出异常
    const _throws = line.match(THROWS_RE);
    if (_throws) {
      throws.push(_throws[1]);
      continue;
    }
    // 其他标签
    const _tag = line.match(TAG_RE);
    if (_tag) {
      tags[_tag[1]] = _tag[2];
      continue;
    }
    summaryLines.push(line);
  }

  return {
    source,
    summary: summaryLines.join("\n\n").trim(),
    params,
    returns,
    see,
    since,
    deprecated,
    version,
    author,
    base,
    throws,
    tags,
  };
}
