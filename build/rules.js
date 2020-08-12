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
            { name: "julia", source: "source.julia" },
        ]
    },
    {
        name: "number-sign-MD",
        whileRegExp: "# MD",
        example: "# MD # title<br># MD content<br>",
        languages: [
            ...languages.filter(l => l.comments.lineComment === "#"),
            { name: "julia", source: "source.julia" },
        ]
    },
    {
        name: "slash-star",
        beginRegExp: "/\\*\\s*\\[markdown\\]",
        whileRegExp: "\\*(?!/)",
        endRegExp: "\\*/",
        example: "/* [markdown]<br>&nbsp;* # title<br>&nbsp;* content<br>&nbsp;*/<br>",
        languages: [
            ...languages.filter(l => l.comments.lineComment === "//"),
        ]
    },
    {
        name: "double-slash",
        beginRegExp: "//\\s*\\[markdown\\]",
        whileRegExp: "//",
        example: "// [markdown]<br>// # title<br>// content<br>",
        languages: [
            ...languages.filter(l => l.comments.lineComment === "//"),
        ]
    },
    {
        name: "double-slash-MD",
        whileRegExp: "// MD",
        example: "// MD # title<br>// MD content<br>",
        languages: [
            ...languages.filter(l => JSON.stringify(l.comments.blockComment||"") === JSON.stringify(["/*","*/"])),
        ]
    }
]