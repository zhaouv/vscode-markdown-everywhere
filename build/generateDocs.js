const fs = require('fs');
const path = require('path');
const { rules } = require('./rules');
const { getRuleType } = require('./util');


const generateSupportedListTable = () => {
    const entries = rules.map(rule =>
        `| ${rule.name} | ${getRuleType(rule)} | ${rule.example} | ${rule.languages.map(l=>l.name).join('<br>')} |`);
    return [
        '| Rule | Type | Example | Languages |',
        '|--|--|--|--|',
        entries.join('\n')
    ].join('\n');
};

exports.updateDocs = () => {
    const readmePath = path.join(__dirname, '..', 'README.md');
    let readme = fs.readFileSync(readmePath, { encoding: 'utf-8' });
    readme = readme.split('<!--Supported_List_Splitter-->');
    readme[1]='\n\n'+generateSupportedListTable()+'\n\n';
    readme = readme.join('<!--Supported_List_Splitter-->');
    fs.writeFileSync(readmePath, readme)
}; 