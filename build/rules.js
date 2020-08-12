exports.rules = 
[
    {
        name: 'triple-quote',
        beginRegExp: '"""\\s*\\[markdown\\]',
        endRegExp: '"""',
        languages: [
            { name: 'python', source: 'source.python' },
        ]
    },
    {
        name: 'number-sign',
        beginRegExp: '#\\s*\\[markdown\\]',
        whileRegExp: '#',
        languages: [
            { name: 'python', source: 'source.python' },
            { name: 'julia', source: 'source.julia' },
            { name: 'shell', source: 'source.shell' },
        ]
    },
    {
        name: 'number-sign-MD',
        whileRegExp: '# MD',
        languages: [
            { name: 'python', source: 'source.python' },
            { name: 'julia', source: 'source.julia' },
            { name: 'shell', source: 'source.shell' },
        ]
    },
    {
        name: 'slash-star',
        beginRegExp: '/\\*\\s*\\[markdown\\]',
        whileRegExp: '\\*(?!/)',
        endRegExp: '\\*/',
        languages: [
            { name: 'js', source: 'source.js' },
            { name: 'ts', source: 'source.ts' },
            { name: 'c', source: 'source.c' },
            { name: 'cpp', source: 'source.cpp' },
            { name: 'csharp', source: 'source.csharp' },
        ]
    },
    {
        name: 'double-slash',
        beginRegExp: '//\\s*\\[markdown\\]',
        whileRegExp: '//',
        languages: [
            { name: 'js', source: 'source.js' },
            { name: 'ts', source: 'source.ts' },
            { name: 'c', source: 'source.c' },
            { name: 'cpp', source: 'source.cpp' },
            { name: 'csharp', source: 'source.csharp' },
        ]
    },
    {
        name: 'double-slash-MD',
        whileRegExp: '// MD',
        languages: [
            { name: 'js', source: 'source.js' },
            { name: 'ts', source: 'source.ts' },
            { name: 'c', source: 'source.c' },
            { name: 'cpp', source: 'source.cpp' },
            { name: 'csharp', source: 'source.csharp' },
        ]
    },
]