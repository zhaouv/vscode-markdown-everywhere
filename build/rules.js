const { languages } = require('./comments')
exports.rules = [
    {
        name: "triple-quote",
        beginRegExp: "\"\"\"\\s*\\[markdown\\]",
        endRegExp: "\"\"\"",
        example: "\"\"\" [markdown]<br># title<br>content<br>\"\"\"",
        languages: [
            ...languages.filter(l => JSON.stringify(l.comments.blockComment||"") === JSON.stringify(["\"\"\"", "\"\"\""])),
        ]
    },
    {
        name: "number-sign",
        beginRegExp: "#\\s*\\[markdown\\]",
        whileRegExp: "#",
        example: "# [markdown]<br># # title<br># content<br>",
        languages: [
            ...languages.filter(l => l.comments.lineComment === "#"),
            { name: "cython", source: "source.cython" },
            { name: "julia", source: "source.julia" },
            { name: "cmake", source: "source.cmake" },
        ]
    },
    {
        name: "number-sign-MD",
        whileRegExp: "# MD",
        example: "# MD # title<br># MD content<br>",
        languages: [
            ...languages.filter(l => l.comments.lineComment === "#"),
            { name: "cython", source: "source.cython" },
            { name: "julia", source: "source.julia" },
            { name: "cmake", source: "source.cmake" },
        ]
    },
    {
        name: "slash-star",
        beginRegExp: "/\\*\\s*\\[markdown\\]",
        whileRegExp: "\\*(?!/)",
        endRegExp: "\\*/",
        example: "/* [markdown]<br>&nbsp;* # title<br>&nbsp;* content<br>&nbsp;*/<br>",
        languages: [
            ...languages.filter(l => JSON.stringify(l.comments.blockComment||"") === JSON.stringify(["/*","*/"])),
            { name: "antlr", source: "source.antlr" },
        ]
    },
    {
        name: "double-slash",
        beginRegExp: "//\\s*\\[markdown\\]",
        whileRegExp: "//",
        example: "// [markdown]<br>// # title<br>// content<br>",
        languages: [
            ...languages.filter(l => l.comments.lineComment === "//"),
            { name: "antlr", source: "source.antlr" },
            { name: "qasm-lang", source: "source.qasm" },
        ]
    },
    {
        name: "double-slash-MD",
        whileRegExp: "// MD",
        example: "// MD # title<br>// MD content<br>",
        languages: [
            ...languages.filter(l => l.comments.lineComment === "//"),
            { name: "antlr", source: "source.antlr" },
            { name: "qasm-lang", source: "source.qasm" },
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
            { name: "latex", source: "text.latex" },
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
            { name: "latex", source: "text.latex" },
        ]
    },
]