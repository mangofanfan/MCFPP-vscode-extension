import { MarkdownString } from "vscode";

/**
 *
 * 获取用户友好的 MCFPP 内部关键字提示。
 *
 * 对文档注释的增强不在此处。
 *
 * @param word 选中关键字
 * @param extra MarkdownString
 * @returns
 */
export function getMoreHoverMarkdownText(
  word: string,
  extra: MarkdownString,
): MarkdownString {
  let tokenExtra = extra;

  // 内部关键字
  if (word === "var") tokenExtra = addTokenVar(tokenExtra);
  else if (word === "func") tokenExtra = addTokenFunc(tokenExtra);
  else if (word === "as") tokenExtra = addTokenAs(tokenExtra);
  else if (word === "namespace") tokenExtra = addTokenNamespace(tokenExtra);
  // 基本类型
  else if (word === "int") tokenExtra = addTokenInt(tokenExtra);
  else if (word === "float") tokenExtra = addTokenFloat(tokenExtra);
  else if (word === "bool") tokenExtra = addTokenBool(tokenExtra);
  else if (word === "nbt") tokenExtra = addTokenNbt(tokenExtra);
  else if (word === "list") tokenExtra = addTokenList(tokenExtra);
  else if (word === "dict") tokenExtra = addTokenDict(tokenExtra);
  else if (word === "map") tokenExtra = addTokenMap(tokenExtra);
  else if (word === "string") tokenExtra = addTokenString(tokenExtra);
  else if (word === "text") tokenExtra = addTokenText(tokenExtra);
  else if (word === "entity") tokenExtra = addTokenEntity(tokenExtra);
  else if (word === "selector") tokenExtra = addTokenSelector(tokenExtra);
  // 基本修饰
  else if (word === "inline") tokenExtra = addTokenInline(tokenExtra);
  else if (word === "override") tokenExtra = addTokenOverride(tokenExtra);

  tokenExtra.isTrusted = true;
  return tokenExtra;
}

/** var 文档 */
function addTokenVar(extra: MarkdownString): MarkdownString {
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
function addTokenFunc(extra: MarkdownString): MarkdownString {
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
function addTokenAs(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown(
    "**as** 关键字用于显示声明类型。在两种情况下你需要显示声明类型：\n\n",
  );
  extra.appendCodeblock(
    "# 1. 变量在声明时未初始化\nvar aString as string;\n# 2. 函数的参数\nfunc add(a as int, b as int) -> int{\n  return a + b;\n}",
    "mcfpp",
  );
  return addMcfppKeywordTip(extra);
}

/** namespace 文档 */
function addTokenNamespace(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown("**namespace** 关键字用于声明命名空间。\n\n");
  extra.appendMarkdown(
    "一个 `.mcfpp` 文件只能在文件头声明一个命名空间。此命名空间的概念等同于 [Minecraft 中的命名空间](https://zh.minecraft.wiki/w/命名空间ID#命名空间)。",
  );
  extra.appendCodeblock(
    "namespace test;\n\nfunc test() {\n  print(1);\n}\n# 定义了 test:test 方法。",
  );
  return addMcfppKeywordTip(extra);
}

/** int 文档 */
function addTokenInt(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown("基本类型 **int** 表示一个整数，是最基础的类型。\n\n");
  return addMcfppKeywordTip(extra);
}

/** float 文档 */
function addTokenFloat(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown(
    "基本类型 **float** 表示一个浮点数，其精度与单精度浮点数相当。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** bool 文档 */
function addTokenBool(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown(
    "基本类型 **bool** 表示一个布尔型数据，有 `true` 和 `false` 两个取值。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** nbt 文档 */
function addTokenNbt(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown("基本类型 **nbt** 表示一个 NBT 数据。\n\n");
  return addMcfppKeywordTip(extra);
}

/** list 文档 */
function addTokenList(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown(
    "基本类型 **list** 表示一个列表，底层由 nbt 类型实现。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** dict 文档 */
function addTokenDict(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown(
    "基本类型 **dict** 表示一个简单字典，底层由 nbt 类型实现。\n\n",
  );
  extra.appendMarkdown(
    "dict 类型只能进行基本的键值对插入和删除操作，更多需求请考虑 map。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** map 文档 */
function addTokenMap(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown(
    "基本类型 **map** 表示一个拥有比 dict 更多功能的字典，底层由 dict 类型实现。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** string 文档 */
function addTokenString(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown("基本类型 **string** 表示一个字符串。\n\n");
  return addMcfppKeywordTip(extra);
}

/** text 文档 */
function addTokenText(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown(
    "基本类型 **text** 表示一个原始 JSON 文本，比 string 包含更多的格式信息。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** entity 文档 */
function addTokenEntity(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown("基本类型 entity 表示一个实体，以 UUID 存储。\n\n");
  return addMcfppKeywordTip(extra);
}

/** selector 文档 */
function addTokenSelector(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown(
    "基本类型 **selector** 表示一个目标选择器，储存为字符串。\n\n",
  );
  return addMcfppKeywordTip(extra);
}

/** inline 文档 */
function addTokenInline(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown("**inline** 用于声明一个函数为内联函数。\n\n");
  extra.appendMarkdown(
    "内联函数将函数体插入到调用处，从而避免函数调用开销。\n\n",
  );
  extra.appendMarkdown(
    "这同时意味着，在内联函数中，对变量的修改会影响到函数外部的变量。",
  );
  extra.appendCodeblock(
    "inline func add(a as int, b as int) -> int{\n  return a + b;\n}",
  );
  return addMcfppKeywordTip(extra);
}

/** override 文档 */
function addTokenOverride(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown(
    "**override** 用于声明一个函数重写其父类的同名函数。\n\n",
  );
  extra.appendMarkdown("签名需与父类同名方法完全一致。\n\n");
  extra.appendCodeblock(
    "override func add(a as int, b as int) -> int{\n  # code ...\n  return a + b;\n}",
  );
  return addMcfppKeywordTip(extra);
}

/** 增加 MCFPP 关键字说明 */
function addMcfppKeywordTip(extra: MarkdownString): MarkdownString {
  extra.appendMarkdown(
    "\n\n---\n\n此为 MCFPP 关键字，请参见：[MCFPP API](https://www.mcfpp.top/)\n\n",
  );
  return extra;
}
