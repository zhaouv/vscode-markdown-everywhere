const fs = require('fs');
const path = require('path');
const { rules } = require('./rules');
const { RULETYPE, getRuleType } = require('./util');

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
        rule_['__' + key + '__'] = JSON.stringify(rule[key]).slice(1, -1);
    }
    rule_['__languages__'] = rule.languages.map(language => {
        const sources = Array.isArray(language.source) ? language.source : [language.source];
        return sources.map(s => 'L:' + s).join(', ');
    }).join(', ');
    for (const key in rule_) {
        output = output.split(key).join(rule_[key]);
    }
    return output;
}

exports.updateGrammars = () => {
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