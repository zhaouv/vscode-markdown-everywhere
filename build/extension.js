const vscode = require('vscode');
const { rules } = require('./rules');
const { getRuleType } = require('./util');

const getLanguageConfiguration = (rules) => {
    let symbols = rules.filter(rule => rule.whileSymbol || rule.whileRegExp).map(rule => {
        let enterRule = (space) => ({
            beforeText: new RegExp('^\\s*' + JSON.stringify(rule.whileRegExp).slice(1, -1) + space + '.*'),
            afterText: /.*$/,
            action: {
                indentAction: 0,
                appendText: (rule.whileSymbol || rule.whileRegExp) + space
            }
        });
        return Array.from({ length: 13 }).map((v, i) => enterRule(Array.from({ length: 13 + 1 - i }).join(' ')));
    });
    return { onEnterRules: symbols.reduce((a, b) => a.concat(b)) };
}


/** @param {import('vscode').ExtensionContext} context */
exports.activate = function (context) {

    // todo: change to suit rule
    // it is a prototype here
    vscode.languages.setLanguageConfiguration('markdown', getLanguageConfiguration(rules));

    let vscodeMarkdownRender = {
        /** @type {(src) => String} */
        processSource: function (src) {
            let editor = vscode.window.activeTextEditor;
            if (!editor) {
                return src;
            }
            let languageId = editor.document.languageId;
            this.languageId = languageId;
            console.log(languageId)
            return src;
        },
        processResult: v => v,
        languageId: '',
    };


    let injectRender = (md) => {
        vscodeMarkdownRender.md = md;
        const parse = md.parse;
        md.parse = (src, env) => {
            return parse.call(md, vscodeMarkdownRender.processSource(src), env);
        };
        const rendererRender = md.renderer.render;
        md.renderer.render = (tokens, options, env) => {
            return vscodeMarkdownRender.processResult(rendererRender.call(md.renderer, tokens, options, env));
        };
        return md;
    };

    context.subscriptions.push(vscode.commands.registerCommand('markdown-everywhere.showPreviewToSide', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        vscode.commands.executeCommand('markdown.showPreviewToSide');
    }));

    return { extendMarkdownIt: injectRender };
}