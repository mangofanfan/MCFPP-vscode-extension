# MCFPP Language Support for VS Code

**EN** | [CN](README_CN.md)

**[MCFPP](https://github.com/MinecraftFunctionPlusPlus/MCFPP)** is an object-oriented high-level programming language dedicated to simplifying Minecraft datapack development.

This project is a VS Code extension that adds language support for MCFPP to VS Code.

Like MCFPP itself, this extension is also in an early stage of development. We aim to make this extension usable by the end of September 2026.

This extension is already available on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=MangoFanFanw.mcfpp).

## Features

* ✅ Basic syntax highlighting based on TextMate
* ✅ Built-in language server
* ❕ More intelligent features

## Notes

After cloning this project, install the dependencies and press F5 to launch the VS Code debug host.

### Basic Highlighting

This project uses `mcfpp.tmLanguage.yaml` as the source file for writing TextMate rules, which is then compiled into `mcfpp.tmLanguage.json` via `js-yaml` for VS Code to read.

After modifying the source file, use the following command to update the output.

```bash
npx js-yaml syntaxes/mcfpp.tmLanguage.yaml > syntaxes/mcfpp.tmLanguage.json
```

### Language Server

The language server is located **[here](https://github.com/Alumopper/mcfpp-language-support/)**. This extension ships an `mcfpp-language-server.jar` built from it.

A Java 21 or newer runtime is required to run the language server.

The extension provides the `mcfpp.java.executablePath` configuration key to specify the Java runtime, and it will also try to locate the Java path from environment variables.

## AI?

We have found a few traces of AI thinking in this project, along with plenty of human cursing.
