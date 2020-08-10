let blockRules = [
    {
        name: 'triple-quote',
        beginRegExp: '"""',
        endRegExp: ' ?"""',
        languages: [
            { name: 'python', source: 'python' },
        ]
    },
    {
        name: 'slash-star',
        beginRegExp: '/\\*',
        endRegExp: ' ?\\*/',
        languages: [
            { name: 'ts', source: 'source.ts' },
            { name: 'c', source: 'source.c' },
            { name: 'cpp', source: 'source.cpp' },
            { name: 'csharp', source: 'source.csharp' },
        ]
    },
]

let lineRules = [
    {
        name: 'sharp',
        RegExp: '#',
        languages: [
            { name: 'python', source: 'source.python', beginRegExp: '(?<=(?:^|\\G)(?:#\\s*%%\\s*\\[markdown\\]|#\\s*<markdowncell>)\\s*)$', endRegExp: '(^|\\G)(?=[^#\\s]|#\\s*%%|\\s+\\S)' },
            { name: 'julia', source: 'source.julia' },
            { name: 'shell', source: 'source.shell' },
        ]
    },
    {
        name: 'double-slash',
        RegExp: '//',
        languages: [
            { name: 'js', source: 'source.js' },
            { name: 'ts', source: 'source.ts' },
            { name: 'c', source: 'source.c' },
            { name: 'cpp', source: 'source.cpp' },
            { name: 'csharp', source: 'source.csharp' },
        ]
    },
]
