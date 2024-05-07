# LRH Directory Tree Generator

生成项目目录结构的命令行工具。

## 安装

```bash
npm install -g lrh-directory-tree
```

## 使用

在命令行中执行 generate-tree 命令来生成项目目录结构：

```bash
generate-tree
```

该命令将读取当前目录下的 .gitignore 文件，并生成目录结构，忽略其中定义的文件和文件夹。

## 注意事项

请确保在要生成目录结构的项目根目录中执行该命令。
如果没有 .gitignore 文件，将不会应用任何忽略规则。

## 许可证

This project is licensed under the ISC License - see the LICENSE.md file for details.
