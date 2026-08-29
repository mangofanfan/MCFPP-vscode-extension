# MCFPP VS Code 语言支持

[EN](README.md) | **CN**

**[MCFPP](https://github.com/MinecraftFunctionPlusPlus/MCFPP)** 是一个致力于简化 Minecraft
数据包开发的、面向对象的高级编程语言。

本项目是一个 VS Code 拓展，用于向 VS Code 添加对 MCFPP 语言的支持。

同 MCFPP 一样，本拓展也处于早期开发阶段。

## 功能

* ✅ 基于 TextMate 的基础语法高亮
* ❕ LSP 以及更多智能功能（如补全、跳转、……）

## 说明

如果你想参与或研究此项目的话：

本项目使用 `mcfpp.tmLanguage.yaml` 作为编写 TextMate 规则的源文件，然后通过 `js-yaml` 生成供
VS Code 读取的 `mcfpp.tmLanguage.json` 文件。

修改源文件后，使用以下命令更新产物。

```bash
npx js-yaml syntaxes/mcfpp.tmLanguage.yaml > syntaxes/mcfpp.tmLanguage.json
```

按下键盘上的 F5 以启动 VS Code 调试主机。

## AI？

我们在此项目中发现了少量的 AI 思考产生的痕迹，以及大量的人类骂街的声音。