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
    packageJson.contributes.keybindings[0].when = when;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
};