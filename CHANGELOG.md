# Change Log

## 0.0.16 (2024-11-28)

Fix LSMR rules bug `The following first line will be highlighted as comment` [#24](https://github.com/zhaouv/vscode-markdown-everywhere/issues/24) [#25](https://github.com/zhaouv/vscode-markdown-everywhere/issues/25)
> Still remain in some languages such as LaTeX and MATLAB. Fixed for python/julia/rust/...

## 0.0.15 (2024-05-13)

Add settings `preview-mode-language` to set preview mode for respective languages.

Add `raw` preview mode (for working with the following feature)

Add feature **preview-mode-inject**. Do some actions in parsing, only support to do some replacing before parse markdown to html now.

## 0.0.14 (2024-04-13)

Add feature **Setting to open preview automatically for listed languages**. Thank [cdfa](https://github.com/cdfa) for implementing this feature. [#14](https://github.com/zhaouv/vscode-markdown-everywhere/issues/14)

Add some rules for Haskell and Purescript and Rust. [#13](https://github.com/zhaouv/vscode-markdown-everywhere/issues/13)

## 0.0.13 (2024-04-11)

Add feature **Extract Markdown** Convert selection into Markdown format according to the rules and preview mode, place it into the clipboard..([#12](https://github.com/zhaouv/vscode-markdown-everywhere/issues/12))

## 0.0.12 (2021-02-23)

add more languages in rule `number-sign-double-percentage` ([#4](https://github.com/zhaouv/vscode-markdown-everywhere/issues/4))

fix LRSM do not work in some language. Introducing side effects: the LRSM rules are also highlighted in block comment. ([#2](https://github.com/zhaouv/vscode-markdown-everywhere/issues/2#issuecomment-766083395))

## 0.0.11 (2021-02-05)

fix keybindings setting which may freeze the editor ([#3](https://github.com/zhaouv/vscode-markdown-everywhere/issues/3))

## 0.0.10 (2020-08-31)

fix bug for BR & MR' beginRegExp endRegExp

## 0.0.9 (2020-08-20)

improve when `/\s+/.test(whileSymbol)`  
support block rule `\s+"""`  
use json in rules.js to help user modify rules  
fix the break -MD folded preview  

## 0.0.8 (2020-08-18)

improve `when-clause-contexts`, preview-icon does not appears any where  

fix the offset of `data-line`, which is related to the correspondence of lines of code and preview.  

fix bugs
+ start mark in comment  
+ block rule with indent  

## 0.0.7 (2020-08-17)

add folded mode for preview

## 0.0.6 (2020-08-15)

fix spelling error  
update document  

## 0.0.5 (2020-08-14)

fix bug in "Build Rules"

fix bug when beginRegExp equals to endRegExp

## 0.0.4 (2020-08-14)

fix bug in "Enhancing-typing"

## 0.0.2 (2020-08-13)
+ Initial Release

## 0.0.1 (2020-08-10)
+ Initial Project