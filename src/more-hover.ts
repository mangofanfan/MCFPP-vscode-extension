import * as vscode from "vscode";

export function getMoreHoverMarkdownText(
  word: string,
  extra: vscode.MarkdownString,
): vscode.MarkdownString {
  let tokenExtra = extra;
  if (word === "var") tokenExtra = addTokenVar(tokenExtra);
  if (word === "func") tokenExtra = addTokenFunc(tokenExtra);
  if (word === "as") tokenExtra = addTokenAs(tokenExtra);
  if (word === "int") tokenExtra = addTokenInt(tokenExtra);
  if (word === "float") tokenExtra = addTokenFloat(tokenExtra);
  if (word === "bool") tokenExtra = addTokenBool(tokenExtra);
  if (word === "nbt") tokenExtra = addTokenNbt(tokenExtra);
  if (word === "list") tokenExtra = addTokenList(tokenExtra);
  if (word === "dict") tokenExtra = addTokenDict(tokenExtra);
  if (word === "map") tokenExtra = addTokenMap(tokenExtra);
  if (word === "string") tokenExtra = addTokenString(tokenExtra);
  if (word === "text") tokenExtra = addTokenText(tokenExtra);
  if (word === "entity") tokenExtra = addTokenEntity(tokenExtra);
  if (word === "selector") tokenExtra = addTokenSelector(tokenExtra);

  tokenExtra.isTrusted = true;
  return tokenExtra;
}

/** var 文档 */
function addTokenVar(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown("**var** 关键字用于声明变量。\n\n");
  extra.appendCodeblock(
    "var i as int = 6;\nvar j as int;\nj = i * 5;",
    "mcfpp",
  );
  extra.appendMarkdown(
    "var 声明变量时，可以根据赋值自动推断类型；但如果声明时未赋值，则必须显示指定类型。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** func 文档 */
function addTokenFunc(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown("**func** 关键字用于声明函数。\n\n");
  extra.appendCodeblock(
    "func add(a as int, b as int) -> int{\n  return a + b;\n}",
    "mcfpp",
  );
  extra.appendMarkdown(
    "函数签名中，参数必须声明类型；返回值类型在函数无返回值时（void）可以忽略。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** as 文档 */
function addTokenAs(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown(
    "**as** 关键字用于显示声明类型。在两种情况下你需要显示声明类型：\n\n",
  );
  extra.appendCodeblock(
    "# 1. 变量在声明时未初始化\nvar aString as string;\n# 2. 函数的参数\nfunc add(a as int, b as int) -> int{\n  return a + b;\n}",
    "mcfpp",
  );
  return addMcfppKeywordTip(extra);
}

/** int 文档 */
function addTokenInt(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown("基本类型 **int** 表示一个整数，是最基础的类型。\n\n");
  return addMcfppKeywordTip(extra);
}

/** float 文档 */
function addTokenFloat(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown(
    "基本类型 **float** 表示一个浮点数，其精度与单精度浮点数相当。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** bool 文档 */
function addTokenBool(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown(
    "基本类型 **bool** 表示一个布尔型数据，有 `true` 和 `false` 两个取值。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** nbt 文档 */
function addTokenNbt(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown("基本类型 **nbt** 表示一个 NBT 数据。\n\n");
  return addMcfppKeywordTip(extra);
}

/** list 文档 */
function addTokenList(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown(
    "基本类型 **list** 表示一个列表，底层由 nbt 类型实现。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** dict 文档 */
function addTokenDict(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown(
    "基本类型 **dict** 表示一个简单字典，底层由 nbt 类型实现。\n\n",
  );
  extra.appendMarkdown(
    "dict 类型只能进行基本的键值对插入和删除操作，更多需求请考虑 map。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** map 文档 */
function addTokenMap(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown(
    "基本类型 **map** 表示一个拥有比 dict 更多功能的字典，底层由 dict 类型实现。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** string 文档 */
function addTokenString(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown("基本类型 **string** 表示一个字符串。\n\n");
  return addMcfppKeywordTip(extra);
}

/** text 文档 */
function addTokenText(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown(
    "基本类型 **text** 表示一个原始 JSON 文本，比 string 包含更多的格式信息。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** entity 文档 */
function addTokenEntity(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown("基本类型 entity 表示一个实体，以 UUID 存储。\n\n");
  return addMcfppKeywordTip(extra);
}

/** selector 文档 */
function addTokenSelector(extra: vscode.MarkdownString): vscode.MarkdownString {
  extra.appendMarkdown(
    "基本类型 **selector** 表示一个目标选择器，储存为字符串。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** 增加 MCFPP 关键字说明 */
function addMcfppKeywordTip(
  extra: vscode.MarkdownString,
): vscode.MarkdownString {
  extra.appendMarkdown(
    "此为 MCFPP 关键字，请参见：[MCFPP API](https://www.mcfpp.top/)",
  );
  return extra;
}
