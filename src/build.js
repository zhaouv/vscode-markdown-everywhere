/* [markdown]
 * block comment starting with the start mark is markdown
 * this comment is the demo
 * whileRegExp is optional
 */
let blockRules = [
    {
        name: 'triple-quote',
        beginRegExp: '"""',
        endRegExp: ' ?"""',
        startMarkRegExp: '\\[markdown\\]',
        languages: [
            { name: 'python', source: 'python' },
        ]
    },
    {
        name: 'slash-star',
        beginRegExp: '/\\*',
        endRegExp: '\\*/',
        whileRegExp: '\\*',
        startMarkRegExp: '\\[markdown\\]',
        languages: [
            { name: 'ts', source: 'source.ts' },
            { name: 'c', source: 'source.c' },
            { name: 'cpp', source: 'source.cpp' },
            { name: 'csharp', source: 'source.csharp' },
        ]
    },
]
// [markdown]
// all connecting line-comment starting with the start mark is markdown
// this comment is the demo
let lineRulesWithStartMark = [
    {
        name: 'number-sign',
        RegExp: '#',
        startMarkRegExp: '\\[markdown\\]',
        languages: [
            { name: 'python', source: 'source.python' },
            { name: 'julia', source: 'source.julia' },
            { name: 'shell', source: 'source.shell' },
        ]
    },
    {
        name: 'double-slash',
        RegExp: '//',
        startMarkRegExp: '\\[markdown\\]',
        languages: [
            { name: 'js', source: 'source.js' },
            { name: 'ts', source: 'source.ts' },
            { name: 'c', source: 'source.c' },
            { name: 'cpp', source: 'source.cpp' },
            { name: 'csharp', source: 'source.csharp' },
        ]
    },
]
//MD all connecting line-comment starting with the start mark is markdown
//MD this comment is the demo
let lineRulesStartsWith = [
    {
        name: 'number-sign',
        RegExp: '#MD',
        languages: [
            { name: 'python', source: 'source.python' },
            { name: 'julia', source: 'source.julia' },
            { name: 'shell', source: 'source.shell' },
        ]
    },
    {
        name: 'double-slash',
        RegExp: '//MD',
        languages: [
            { name: 'js', source: 'source.js' },
            { name: 'ts', source: 'source.ts' },
            { name: 'c', source: 'source.c' },
            { name: 'cpp', source: 'source.cpp' },
            { name: 'csharp', source: 'source.csharp' },
        ]
    },
]