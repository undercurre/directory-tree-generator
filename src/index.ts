#!/usr/bin/env node

import fs from "fs";
import path from "path";
import ignore, { Ignore } from "ignore";
import chalk from "chalk";

function readGitignore(dir: string) {
  try {
    const gitignoreContent = fs.readFileSync(
      path.join(dir, ".gitignore"),
      "utf8"
    );
    return ignore().add(gitignoreContent);
  } catch (err) {
    // 如果没有找到.gitignore文件，返回一个忽略无任何内容的处理器
    return ignore();
  }
}

function generateDirectoryTree(
  dir: string,
  baseDir: string,
  ignoreHandler: Ignore,
  prefix = ""
) {
  const files = fs.readdirSync(dir);
  let result = "";

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(dir, files[i]);
    const relativePath = path.relative(baseDir, filePath); // 获取相对于 baseDir 的相对路径
    if (ignoreHandler.ignores(relativePath)) continue; // 使用相对路径检查是否被忽略

    const isLast = i === files.length - 1;
    const localPrefix = isLast ? "└─ " : "├─ ";
    const stat = fs.statSync(filePath);

    result += `${prefix}${localPrefix}${files[i]}\n`;

    if (stat.isDirectory()) {
      const newPrefix = isLast ? "    " : "│   ";
      result += generateDirectoryTree(
        filePath,
        baseDir,
        ignoreHandler,
        prefix + newPrefix
      );
    }
  }

  return result;
}

// 使用当前工作目录
const rootDir = process.cwd();
const ignoreHandler = readGitignore(rootDir);
const directoryTree = generateDirectoryTree(rootDir, rootDir, ignoreHandler);
console.log(chalk.green.bold(directoryTree));

// 选择性地将结果写入到一个Markdown文件
fs.writeFileSync("dir_tree.md", directoryTree);
