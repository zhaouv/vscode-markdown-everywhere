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

exports.updateInjection = (rules) => {
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf-8' }));
    packageJson.contributes.grammars = getInjection(rules);
    packageJson.activationEvents = getActivation(rules);
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
};