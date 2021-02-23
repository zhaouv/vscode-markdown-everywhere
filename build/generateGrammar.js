const fs = require('fs');
const path = require('path');
const { RULETYPE, getRuleType, encodeRegExp, LRSM } = require('./util');

const grammarTemplates = {};

const loadTemplates = () => {
    const dir = path.join(__dirname, '..', 'template');
    RULETYPE.forEach(type => {
        grammarTemplates[type] = fs.readFileSync(path.join(dir, type + '.json'), { encoding: 'utf-8' });
    });
}

const renderTemplate = (rule, tpl) => {
    let output = tpl;
    let rule_ = {};
    for (const key in rule) {
        if (!/\w+RegExp|name/.test(key)) continue;
        rule_['__' + key + '__'] = encodeRegExp(rule[key]);
    }
    let injectionAtom = s => 'L:' + s + ' -string -comment -meta.embedded.block.everywhere.md'
    if (getRuleType(rule) == LRSM) {
        // [#2](https://github.com/zhaouv/vscode-markdown-everywhere/issues/2#issuecomment-766083395)
        // LRSM do not work in some language
        // remove `-comment` after `-string` to fix 
        // Introducing side effects: the LRSM rules are also highlighted in block comment
        injectionAtom = s => 'L:' + s + ' -string -meta.embedded.block.everywhere.md'
    }
    rule_['__languages__'] = rule.languages.map(language => {
        const sources = Array.isArray(language.source) ? language.source : [language.source];
        return sources.map(injectionAtom).join(', ');
    }).join(', ');
    for (const key in rule_) {
        output = output.split(key).join(rule_[key]);
    }
    return output;
}

exports.updateGrammars = (rules) => {
    loadTemplates();
    let types = rules.map(rule => getRuleType(rule));
    const outDir = path.join(__dirname, '..', 'syntaxes');
    rules.forEach((rule, i) => {
        let type = types[i];
        fs.writeFileSync(
            path.join(outDir, rule.name + '.json'),
            renderTemplate(rule, grammarTemplates[type]));
    });
};