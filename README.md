# Markdown Everywhere

> finished but not published yet

Embed and highlight markdown everywhere.

> todo: and preview

demo.png...

Extending from my pr in [vscode-python](https://github.com/microsoft/vscode-python) ([issue](https://github.com/microsoft/vscode-python/issues/4356)/[pr](https://github.com/microsoft/vscode-python/pull/13359)).

## Supported List

(note that some languages require that you install an VS Code extension that provides a grammar for that language)

<!--Supported_List_Splitter-->

| Rule | Type | Example | Languages |
|--|--|--|--|
| triple-quote | BR | """ [markdown]<br># title<br>content<br>""" | python |
| number-sign | LRSM | # [markdown]<br># # title<br># content<br> | coffeescript<br>dockerfile<br>git-commit<br>git-rebase<br>diff<br>ignore<br>properties<br>makefile<br>perl<br>perl6<br>powershell<br>python<br>r<br>ruby<br>shellscript<br>yaml<br>julia |
| number-sign-MD | LRSW | # MD # title<br># MD content<br> | coffeescript<br>dockerfile<br>git-commit<br>git-rebase<br>diff<br>ignore<br>properties<br>makefile<br>perl<br>perl6<br>powershell<br>python<br>r<br>ruby<br>shellscript<br>yaml<br>julia |
| slash-star | MR | /* [markdown]<br>&nbsp;* # title<br>&nbsp;* content<br>&nbsp;*/<br> | c<br>cpp<br>csharp<br>fsharp<br>go<br>groovy<br>hlsl<br>java<br>javascriptreact<br>javascript<br>json<br>jsonc<br>less<br>objective-c<br>objective-cpp<br>php<br>rust<br>scss<br>shaderlab<br>swift<br>typescript<br>typescriptreact |
| double-slash | LRSM | // [markdown]<br>// # title<br>// content<br> | c<br>cpp<br>csharp<br>fsharp<br>go<br>groovy<br>hlsl<br>java<br>javascriptreact<br>javascript<br>json<br>jsonc<br>less<br>objective-c<br>objective-cpp<br>php<br>rust<br>scss<br>shaderlab<br>swift<br>typescript<br>typescriptreact |
| double-slash-MD | LRSW | // MD # title<br>// MD content<br> | c<br>cpp<br>csharp<br>css<br>go<br>groovy<br>hlsl<br>java<br>javascriptreact<br>javascript<br>json<br>jsonc<br>less<br>objective-c<br>objective-cpp<br>php<br>rust<br>scss<br>shaderlab<br>sql<br>swift<br>typescript<br>typescriptreact |

<!--Supported_List_Splitter-->


## Rules

There are 4 types of rules, corresponding to 4 implementations

**LRSM**  
line rule with a start mark  
`beginRegExp`+`whileRegExp`

```js
// [markdown]
// some connecting normal line-comment 
// starts with a start mark (which is normaly a line-comment)
```

**LRSW**  
line rule starts with the mark  
`whileRegExp`
```js
// MD connecting line-comment
// MD each line starts with the mark
```

**MR**  
mixed rule  
`beginRegExp`+`whileRegExp`+`endRegExp`  
> May introduce incorrect rendering, for example, use `*/` as markdown content in the follow demo
```js
/* [markdown]
 * block comment starts with a start mark
 * and each line starts with the mark
 * and finally a end mark
 */
```

**BR**  
block rule  
`beginRegExp`+`endRegExp`  
> May introduce incorrect rendering, for example, use `"""` as markdown content in the follow demo
```python
""" [markdown]
block comment starts with a start mark
and finally a end mark
"""
```