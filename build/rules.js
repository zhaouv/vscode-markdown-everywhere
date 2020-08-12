const { languages } = require('./comments')
exports.rules = [
    {
        name: "triple-quote",
        beginRegExp: "\"\"\"\\s*\\[markdown\\]",
        endRegExp: "\"\"\"",
        languages: [
            ...languages.filter(l => JSON.stringify(l.comments.blockComment||"") === JSON.stringify(["\"\"\"", "\"\"\""])),
        ]
    },
    {
        name: "number-sign",
        beginRegExp: "#\\s*\\[markdown\\]",
        whileRegExp: "#",
        languages: [
            ...languages.filter(l => l.comments.lineComment === "#"),
            { name: "julia", source: "source.julia" },
        ]
    },
    {
        name: "number-sign-MD",
        whileRegExp: "# MD",
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
        languages: [
            ...languages.filter(l => l.comments.lineComment === "//"),
        ]
    },
    {
        name: "double-slash",
        beginRegExp: "//\\s*\\[markdown\\]",
        whileRegExp: "//",
        languages: [
            ...languages.filter(l => l.comments.lineComment === "//"),
        ]
    },
    {
        name: "double-slash-MD",
        whileRegExp: "// MD",
        languages: [
            ...languages.filter(l => JSON.stringify(l.comments.blockComment||"") === JSON.stringify(["/*","*/"])),
        ]
    }
]