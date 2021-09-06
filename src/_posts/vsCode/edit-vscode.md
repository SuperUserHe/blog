---
layout: post
title: "🔨vsCode"
date: 2018-06-09
category: Coding
tags: 
  - 编辑器
---

## 隐藏工作区中的node_modules文件夹
`主菜单:文件>首选项>用户设置`
```json
"files.exclude": {
    "node_modules/": true
}
```
[How do I hide certain files from the sidebar in Visual Studio Code?](https://stackoverflow.com/questions/30140112/how-do-i-hide-certain-files-from-the-sidebar-in-visual-studio-code/30142299#30142299)

## 插件
-  [Atom One Dark Theme](https://marketplace.visualstudio.com/items?itemName=akamud.vscode-theme-onedark)
-  [Flat UI](https://marketplace.visualstudio.com/items?itemName=lkytal.FlatUI)
-  [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)
-  [One Monokai Theme](https://marketplace.visualstudio.com/items?itemName=azemoh.one-monokai)
-  [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
-  [cssrem](https://github.com/cipchk/vscode-cssrem/blob/master/README.zh-CN.md)
-  [Document This](https://marketplace.visualstudio.com/items?itemName=joelday.docthis)
-  [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-  [Full React/React Native/React Router/Redux/GraphQL/ES7/Testing/PropTypes snippets](https://marketplace.visualstudio.com/items?itemName=walter-ribeiro.full-react-snippets)
-  [language-stylus](https://marketplace.visualstudio.com/items?itemName=sysoev.language-stylus)
-  [open in browser](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser)
-  [Sass](https://marketplace.visualstudio.com/items?itemName=robinbentley.sass-indented)
-  [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
-  [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
-  [VSCode Great Icons](https://marketplace.visualstudio.com/items?itemName=emmanuelbeziat.vscode-great-icons)
-  [Vue 2 Snippets](https://marketplace.visualstudio.com/items?itemName=hollowtree.vue-snippets)
-  [小程序助手](https://marketplace.visualstudio.com/items?itemName=debian001.app-migrator)

## 默认设置
```json
{
    "workbench.colorTheme": "One Dark Pro",
    "window.zoomLevel": 0,
    "workbench.iconTheme": "vscode-great-icons",
    "editor.fontFamily": "Fira Code",
    "editor.fontLigatures": true,
    "files.exclude": {
        "node_modules/": true
    },
    "editor.tabSize": 2,
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    "explorer.confirmDelete": false,
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",{
            "language": "vue",
            "autoFix": true
        },"html",
        "vue"
    ],
    "files.associations": {
        "*.vue ": "vue"
    },
    "search.location": "sidebar"
}
```

## [手把手教你用Vscode Debugger调试代码](http://shooterblog.site/2018/05/19/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E7%94%A8Vscode%20Debugger%E8%B0%83%E8%AF%95%E4%BB%A3%E7%A0%81/#%E4%BD%A0%E6%83%B3%E5%9C%A8%E5%93%AA%E8%B0%83%E8%AF%95%EF%BC%9F%F0%9F%98%8F)

