const fs = require('fs');
const path = require('path');
const { getRuleType } = require('./util');

const getInjection = (rules) => {
    return rules.map(rule => ({
        injectTo: rule.languages
            .map(language => Array.isArray(language.source) ? language.source : [language.source])
            .reduce((a, b) => a.concat(b)),
        scopeName: `comment.markdown-cell-inject.${rule.name}.${getRuleType(rule)}`,
        path: `./syntaxes/${rule.name}.json`,
        embeddedLanguages: {
            "meta.embedded.block.everywhere.md": "markdown"
        }
    }));
};

const getActivation = (rules) => {
    return [...(new Set(rules
        .map(rule => rule.languages.map(language => "onLanguage:" + language.name))
        .reduce((a, b) => a.concat(b))
    ))];
}

const getWhen = (rules) => {
    return [...(new Set(rules
        .map(rule => rule.languages.map(language => "editorLangId == '" + language.name + "' && !notebookEditorFocused"))
        .reduce((a, b) => a.concat(b))
    ))].join(' || ');
}

exports.updateInjection = (rules) => {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf-8' }));
    packageJson.contributes.grammars = getInjection(rules);
    packageJson.activationEvents = getActivation(rules);
    const when = getWhen(rules);
    packageJson.contributes.menus["editor/title"][0].when = when;
    packageJson.contributes.menus.commandPalette[0].when = when;
    // packageJson.contributes.keybindings[0].when = when;

    // * comment the previous line is to fix issue #3.
    // * https://github.com/zhaouv/vscode-markdown-everywhere/issues/3
    // * it is difficult to understand such a statement will trigger a max call stack which freezes vscode, when other extensions are also activated (ex. Markdown Preview Enhanced / Markdown All-In-One).
    // * the statement can work if only this extension activated.

    // * editorLangId == 'coffeescript' && !notebookEditorFocused || editorLangId == 'dockerfile' && !notebookEditorFocused || editorLangId == 'git-commit' && !notebookEditorFocused || editorLangId == 'git-rebase' && !notebookEditorFocused || editorLangId == 'diff' && !notebookEditorFocused || editorLangId == 'ignore' && !notebookEditorFocused || editorLangId == 'properties' && !notebookEditorFocused || editorLangId == 'makefile' && !notebookEditorFocused || editorLangId == 'perl' && !notebookEditorFocused || editorLangId == 'perl6' && !notebookEditorFocused || editorLangId == 'powershell' && !notebookEditorFocused || editorLangId == 'python' && !notebookEditorFocused || editorLangId == 'r' && !notebookEditorFocused || editorLangId == 'ruby' && !notebookEditorFocused || editorLangId == 'shellscript' && !notebookEditorFocused || editorLangId == 'yaml' && !notebookEditorFocused || editorLangId == 'cython' && !notebookEditorFocused || editorLangId == 'julia' && !notebookEditorFocused || editorLangId == 'cmake' && !notebookEditorFocused || editorLangId == 'c' && !notebookEditorFocused || editorLangId == 'cpp' && !notebookEditorFocused || editorLangId == 'csharp' && !notebookEditorFocused || editorLangId == 'css' && !notebookEditorFocused || editorLangId == 'go' && !notebookEditorFocused || editorLangId == 'groovy' && !notebookEditorFocused || editorLangId == 'hlsl' && !notebookEditorFocused || editorLangId == 'java' && !notebookEditorFocused || editorLangId == 'javascriptreact' && !notebookEditorFocused || editorLangId == 'javascript' && !notebookEditorFocused || editorLangId == 'json' && !notebookEditorFocused || editorLangId == 'jsonc' && !notebookEditorFocused || editorLangId == 'less' && !notebookEditorFocused || editorLangId == 'objective-c' && !notebookEditorFocused || editorLangId == 'objective-cpp' && !notebookEditorFocused || editorLangId == 'php' && !notebookEditorFocused || editorLangId == 'rust' && !notebookEditorFocused || editorLangId == 'scss' && !notebookEditorFocused || editorLangId == 'shaderlab' && !notebookEditorFocused || editorLangId == 'sql' && !notebookEditorFocused || editorLangId == 'swift' && !notebookEditorFocused || editorLangId == 'typescript' && !notebookEditorFocused || editorLangId == 'typescriptreact' && !notebookEditorFocused || editorLangId == 'antlr' && !notebookEditorFocused || editorLangId == 'fsharp' && !notebookEditorFocused || editorLangId == 'qasm-lang' && !notebookEditorFocused || editorLangId == 'matlab' && !notebookEditorFocused || editorLangId == 'bibtex' && !notebookEditorFocused || editorLangId == 'tex' && !notebookEditorFocused || editorLangId == 'latex' && !notebookEditorFocused
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
};