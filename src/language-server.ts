import { spawnSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { LanguageClient } from "vscode-languageclient/node";

let client: LanguageClient | null = null;

/**
 * 显示带「打开设置」按钮的错误提示，引导用户修改 Java 路径设置。
 */
function showJavaConfigError(message: string): void {
  vscode.window.showErrorMessage(message, "打开设置").then((choice) => {
    if (choice === "打开设置") {
      vscode.commands.executeCommand(
        "workbench.action.openSettings",
        "mcfpp.java.executablePath",
      );
    }
  });
}

/**
 *
 * 获取 Java 可执行程序路径。
 *
 * 解析顺序：扩展设置 → JAVA_HOME 环境变量（拼接 bin/java）→ PATH 中的 "java"。
 * 不检查 Java 可用性与版本，由 isJavaUsable 在实际运行时校验。
 */
function getJavaPath(): string {
  const javaPath = vscode.workspace
    .getConfiguration("mcfpp")
    .get("java.executablePath") as string | undefined;

  if (javaPath) {
    return javaPath;
  }

  // JAVA_HOME 指向 JDK/JRE 根目录，可执行文件位于其 bin 子目录
  const javaHome = process.env.JAVA_HOME;
  if (javaHome) {
    return path.join(
      javaHome,
      "bin",
      process.platform === "win32" ? "java.exe" : "java",
    );
  }

  // 交由 PATH 解析；若 PATH 中也没有 java，会在实际运行时报出明确错误
  return "java";
}

/**
 *
 * 检查提供的 Java 可执行文件路径是否可用，以及 Java 版本是否 >= 21。
 *
 * 检查失败时显示错误信息。
 *
 * @param javaPath Java 可执行文件路径
 * @returns 布尔值
 */
function isJavaUsable(javaPath: string): boolean {
  const result = spawnSync(javaPath, ["-version"], {
    // "java -version" 的版本信息输出在 stderr，需捕获用于解析版本号
    stdio: ["ignore", "ignore", "pipe"],
    windowsHide: true,
    timeout: 10_000, // 防止进程挂起时无限阻塞扩展宿主
  });

  // 启动失败（路径不存在、无权限等）不会抛异常，而是写入 result.error
  if (result.error) {
    showJavaConfigError(
      `MCFPP 扩展无法启动 Java（${result.error.message}），请检查 Java 可执行文件位置。`,
    );
    return false;
  }

  if (result.status !== 0) {
    const reason =
      result.status === null
        ? `进程被信号 ${result.signal ?? "unknown"} 终止`
        : `退出码 ${result.status}`;
    showJavaConfigError(
      `MCFPP 扩展检测 Java 可用性失败（${reason}），请检查 Java 可执行文件位置。`,
    );
    return false;
  }

  // 解析版本号，如 'openjdk version "21.0.8"'，旧式格式如 'java version "1.8.0_442"'
  const versionText = result.stderr?.toString() ?? "";
  const match = /version "(\d+)(?:\.(\d+))?/.exec(versionText);
  let major = match ? Number.parseInt(match[1], 10) : Number.NaN;
  if (major === 1 && match?.[2]) {
    // 兼容旧版本号方案：1.8.x 实际为 Java 8
    major = Number.parseInt(match[2], 10);
  }

  if (Number.isNaN(major)) {
    showJavaConfigError(
      "MCFPP 扩展无法解析 Java 版本，请检查 Java 可执行文件位置。",
    );
    return false;
  }

  if (major < 21) {
    showJavaConfigError(
      `MCFPP 语言服务器需要 Java 21 及以上，当前检测到 Java ${major}，请设置正确的 Java 可执行文件位置。`,
    );
    return false;
  }

  return true;
}

/**
 *
 * 启动语言服务器
 */
function startLanguageServer(javaPath: string, jarPath: string) {
  // jar 缺失时提前给出明确提示，避免语言客户端晦涩的启动失败
  if (!fs.existsSync(jarPath)) {
    vscode.window.showErrorMessage(
      `MCFPP 扩展未找到语言服务器 jar（${jarPath}），请重新安装扩展。`,
    );
    return;
  }

  // 构建参数并拉起服务
  const serverOptions = {
    run: { command: javaPath, args: ["-jar", jarPath] },
    debug: { command: javaPath, args: ["-jar", jarPath, "--verbose"] },
  };
  const clientOptions = {
    documentSelector: [{ scheme: "file", language: "mcfpp" }],
    outputChannelName: "MCFPP Language Server",
  };

  const newClient = new LanguageClient(
    "mcfpp",
    "MCFPP Language Server",
    serverOptions,
    clientOptions,
  );
  client = newClient;

  // LanguageClient 构造后不会自动启动，必须显式调用 start()
  void newClient.start().catch((err: unknown) => {
    console.error("MCFPP language server 启动失败：", err);
    vscode.window.showErrorMessage(
      `MCFPP 语言服务器启动失败：${err instanceof Error ? err.message : String(err)}`,
    );
  });
}

async function stopLanguageServer(): Promise<void> {
  if (client) {
    await client.stop();
    client = null;
    console.info("MCFPP language server 已关闭。");
  }
}

export { getJavaPath, isJavaUsable, startLanguageServer, stopLanguageServer };
