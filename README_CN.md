# MCFPP VS Code 语言支持

[EN](README.md) | **CN**

**[MCFPP](https://github.com/MinecraftFunctionPlusPlus/MCFPP)** 是一个致力于简化 Minecraft
数据包开发的、面向对象的高级编程语言。

本项目是一个 VS Code 扩展，用于向 VS Code 添加对 MCFPP 语言的支持。

同 MCFPP 一样，本扩展也处于早期开发阶段。尽量在 2026 / 9 结束前使此扩展可用。

已经可以在 [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=MangoFanFanw.mcfpp)
获取此扩展。

## 功能

* ✅ 基于 TextMate 的基础语法高亮
* ✅ 内嵌语言服务器
* ❕ 更多智能功能

## 说明

扩展内包含大小为 80M 的 MCFPP 语言服务器，这会导致打包大小较大。目前没有相应的解决方法，请见谅。

克隆此项目后，安装依赖，按下键盘上的 F5 以启动 VS Code 调试主机。

### 基础高亮

本项目使用 `mcfpp.tmLanguage.yaml` 作为编写 TextMate 规则的源文件，然后通过 `js-yaml` 生成供
VS Code 读取的 `mcfpp.tmLanguage.json` 文件。

修改源文件后，使用以下命令更新产物。

```bash
npx js-yaml syntaxes/mcfpp.tmLanguage.yaml > syntaxes/mcfpp.tmLanguage.json
```

### 语言服务器

语言服务器位于 **[这里](https://github.com/Alumopper/mcfpp-language-support/)**。本扩展包含一个从此处构建得到的
mcfpp-language-server.jar。

运行语言服务器需要 Java 21 及以上的运行时。

扩展提供 `mcfpp.java.executablePath` 配置键来指定 Java 运行时，也会尝试从环境变量查找 Java 路径。

## AI？

我们在此项目中发现了少量的 AI 思考产生的痕迹，以及大量的人类骂街的声音。