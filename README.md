# MCFPP Language Support for VS Code

**EN** | [CN](README_CN.md)

**[MCFPP](https://github.com/MinecraftFunctionPlusPlus/MCFPP)** is an object-oriented high-level programming language dedicated to simplifying Minecraft datapack development.

This project is a VS Code extension that adds language support for MCFPP to VS Code.

Like MCFPP itself, this extension is also in an early stage of development.

## Features

* ✅ Basic syntax highlighting based on TextMate
* ❕ LSP and more intelligent features (such as completion, go-to definition, ...)

## Notes

If you want to contribute to or study this project:

This project uses `mcfpp.tmLanguage.yaml` as the source file for writing TextMate rules, which is then compiled into `mcfpp.tmLanguage.json` via `js-yaml` for VS Code to read.

After modifying the source file, use the following command to update the output.

```bash
npx js-yaml syntaxes/mcfpp.tmLanguage.yaml > syntaxes/mcfpp.tmLanguage.json
```

Press F5 to launch the VS Code debug host.

## AI?

We have found a few traces of AI thinking in this project, along with plenty of human cursing.
