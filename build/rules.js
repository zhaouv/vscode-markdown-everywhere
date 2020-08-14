const { languages } = require('./comments')
exports.rules = [
    {
        name: "triple-quote",
        beginRegExp: "\"\"\"\\s*\\[markdown\\]",
        endRegExp: "\"\"\"",
        example: "\"\"\" [markdown]<br># title<br>content<br>\"\"\"",
        languages: [
            { name: "python", source: "source.python" }
        ]
    },
    {
        name: "number-sign-MD",
        whileRegExp: "# MD",
        example: "# MD # title<br># MD content<br>",
        languages: [
            { name: "coffeescript", source: "source.coffee" },
            { name: "dockerfile", source: "source.dockerfile" },
            { name: "git-commit", source: "text.git-commit" },
            { name: "git-rebase", source: "text.git-rebase" },
            { name: "diff", source: "source.diff" },
            { name: "ignore", source: "source.ignore" },
            { name: "properties", source: "source.ini" },
            { name: "makefile", source: "source.makefile" },
            { name: "perl", source: "source.perl" },
            { name: "perl6", source: "source.perl.6" },
            { name: "powershell", source: "source.powershell" },
            { name: "python", source: "source.python" },
            { name: "r", source: "source.r" },
            { name: "ruby", source: "source.ruby" },
            { name: "shellscript", source: "source.shell" },
            { name: "yaml", source: "source.yaml" },
            { name: "cython", source: "source.cython" },
            { name: "julia", source: "source.julia" },
            { name: "cmake", source: "source.cmake" }
        ]
    },
    {
        name: "number-sign",
        beginRegExp: "#\\s*\\[markdown\\]",
        whileRegExp: "#",
        example: "# [markdown]<br># # title<br># content<br>",
        languages: [
            { name: "coffeescript", source: "source.coffee" },
            { name: "dockerfile", source: "source.dockerfile" },
            { name: "git-commit", source: "text.git-commit" },
            { name: "git-rebase", source: "text.git-rebase" },
            { name: "diff", source: "source.diff" },
            { name: "ignore", source: "source.ignore" },
            { name: "properties", source: "source.ini" },
            { name: "makefile", source: "source.makefile" },
            { name: "perl", source: "source.perl" },
            { name: "perl6", source: "source.perl.6" },
            { name: "powershell", source: "source.powershell" },
            { name: "python", source: "source.python" },
            { name: "r", source: "source.r" },
            { name: "ruby", source: "source.ruby" },
            { name: "shellscript", source: "source.shell" },
            { name: "yaml", source: "source.yaml" },
            { name: "cython", source: "source.cython" },
            { name: "julia", source: "source.julia" },
            { name: "cmake", source: "source.cmake" }
        ]
    },
    {
        name: "slash-star",
        beginRegExp: "/\\*\\s*\\[markdown\\]",
        whileRegExp: "\\*(?!/)",
        whileSymbol: "*",
        endRegExp: "\\*/",
        example: "/* [markdown]<br>&nbsp;* # title<br>&nbsp;* content<br>&nbsp;*/<br>",
        languages: [
            { name: "c", source: "source.c" },
            { name: "cpp", source: "source.cpp" },
            { name: "csharp", source: "source.cs" },
            { name: "css", source: "source.css" },
            { name: "go", source: "source.go" },
            { name: "groovy", source: "source.groovy" },
            { name: "hlsl", source: "source.hlsl" },
            { name: "java", source: "source.java" },
            { name: "javascriptreact", source: "source.js.jsx" },
            { name: "javascript", source: "source.js" },
            { name: "json", source: "source.json" },
            { name: "jsonc", source: "source.json.comments" },
            { name: "less", source: "source.css.less" },
            { name: "objective-c", source: "source.objc" },
            { name: "objective-cpp", source: "source.objcpp" },
            { name: "php", source: "text.html.php" },
            { name: "rust", source: "source.rust" },
            { name: "scss", source: "source.css.scss" },
            { name: "shaderlab", source: "source.shaderlab" },
            { name: "sql", source: "source.sql" },
            { name: "swift", source: "source.swift" },
            { name: "typescript", source: "source.ts" },
            { name: "typescriptreact", source: "source.tsx" },
            { name: "antlr", source: "source.antlr" }
        ]
    },
    {
        name: "double-slash-MD",
        whileRegExp: "// MD",
        example: "// MD # title<br>// MD content<br>",
        languages: [
            { name: "c", source: "source.c" },
            { name: "cpp", source: "source.cpp" },
            { name: "csharp", source: "source.cs" },
            { name: "fsharp", source: "source.fsharp" },
            { name: "go", source: "source.go" },
            { name: "groovy", source: "source.groovy" },
            { name: "hlsl", source: "source.hlsl" },
            { name: "java", source: "source.java" },
            { name: "javascriptreact", source: "source.js.jsx" },
            { name: "javascript", source: "source.js" },
            { name: "json", source: "source.json" },
            { name: "jsonc", source: "source.json.comments" },
            { name: "less", source: "source.css.less" },
            { name: "objective-c", source: "source.objc" },
            { name: "objective-cpp", source: "source.objcpp" },
            { name: "php", source: "text.html.php" },
            { name: "rust", source: "source.rust" },
            { name: "scss", source: "source.css.scss" },
            { name: "shaderlab", source: "source.shaderlab" },
            { name: "swift", source: "source.swift" },
            { name: "typescript", source: "source.ts" },
            { name: "typescriptreact", source: "source.tsx" },
            { name: "antlr", source: "source.antlr" },
            { name: "qasm-lang", source: "source.qasm" }
        ]
    },
    {
        name: "double-slash",
        beginRegExp: "//\\s*\\[markdown\\]",
        whileRegExp: "//",
        example: "// [markdown]<br>// # title<br>// content<br>",
        languages: [
            { name: "c", source: "source.c" },
            { name: "cpp", source: "source.cpp" },
            { name: "csharp", source: "source.cs" },
            { name: "fsharp", source: "source.fsharp" },
            { name: "go", source: "source.go" },
            { name: "groovy", source: "source.groovy" },
            { name: "hlsl", source: "source.hlsl" },
            { name: "java", source: "source.java" },
            { name: "javascriptreact", source: "source.js.jsx" },
            { name: "javascript", source: "source.js" },
            { name: "json", source: "source.json" },
            { name: "jsonc", source: "source.json.comments" },
            { name: "less", source: "source.css.less" },
            { name: "objective-c", source: "source.objc" },
            { name: "objective-cpp", source: "source.objcpp" },
            { name: "php", source: "text.html.php" },
            { name: "rust", source: "source.rust" },
            { name: "scss", source: "source.css.scss" },
            { name: "shaderlab", source: "source.shaderlab" },
            { name: "swift", source: "source.swift" },
            { name: "typescript", source: "source.ts" },
            { name: "typescriptreact", source: "source.tsx" },
            { name: "antlr", source: "source.antlr" },
            { name: "qasm-lang", source: "source.qasm" }
        ]
    },
    {
        name: "percentage-MD",
        whileRegExp: "% MD",
        example: "% MD # title<br>% MD content<br>",
        languages: [
            { name: "matlab", source: "source.matlab" },
            { name: "bibtex", source: "text.bibtex" },
            { name: "tex", source: "text.tex" },
            { name: "latex", source: "text.latex" }
        ]
    },
    {
        name: "percentage",
        beginRegExp: "%\\s*\\[markdown\\]",
        whileRegExp: "%",
        example: "% [markdown]<br>% # title<br>% content<br>",
        languages: [
            { name: "matlab", source: "source.matlab" },
            { name: "bibtex", source: "text.bibtex" },
            { name: "tex", source: "text.tex" },
            { name: "latex", source: "text.latex" }
        ]
    },
    {
        name: "number-sign-double-percentage",
        beginRegExp: "#\\s*%%\\s*(?:\\[markdown\\]|<markdowncell>)",
        whileRegExp: "#(?!\\s*%%)",
        whileSymbol: "#",
        example: "# %% [markdown]<br># # title<br># content<br>",
        languages: [
            { name: "python", source: "source.python" }
        ]
    }
]