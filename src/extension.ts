import * as vscode from "vscode";
import {
  getJavaPath,
  isJavaUsable,
  startLanguageServer,
  stopLanguageServer,
} from "./language-server";
import path from "path";

// 扩展激活时
export function activate(context: vscode.ExtensionContext) {
  console.info("MCFPP extension loaded. Ciallo ~(∠·ω< )⌒★");

  // 注册命令
  vscode.commands.registerCommand("mcfpp.command.testJavaExecutable", () => {
    const javaPath = getJavaPath();
    if (javaPath) {
      if (isJavaUsable(javaPath)) {
        vscode.window.showInformationMessage(
          "MCFPP 扩展成功验证当前 Java 可用。",
        );
      }
    }
  });

  // 启动语言服务器
  const javaPath = getJavaPath();
  if (javaPath) {
    if (isJavaUsable(javaPath)) {
      startLanguageServer(
        javaPath,
        context.asAbsolutePath(
          path.join("server", "mcfpp-language-server.jar"),
        ),
      );
    }
  }
}

// 扩展停用时
export function deactivate() {
  stopLanguageServer();
}
