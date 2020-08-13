const fs = require('fs');
const path = require('path');
const { getRuleType } = require('./util');


const generateSupportedListTable = (rules) => {
    const entries = rules.map(rule =>
        `| ${rule.name} | ${getRuleType(rule)} | ${rule.example} | ${rule.languages.map(l=>l.name).join('<br>')} |`);
    return [
        '| Rule | Type | Example | Languages |',
        '|--|--|--|--|',
        entries.join('\n')
    ].join('\n');
};

exports.updateDocs = (rules) => {
    const readmePath = path.join(__dirname, '..', 'README.md');
    let readme = fs.readFileSync(readmePath, { encoding: 'utf-8' });
    readme = readme.split('<!--Supported_List_Splitter-->');
    readme[1]='\n\n'+generateSupportedListTable(rules)+'\n\n';
    readme = readme.join('<!--Supported_List_Splitter-->');
    fs.writeFileSync(readmePath, readme)
}; 