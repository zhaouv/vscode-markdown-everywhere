const vscode = require("vscode");
const { rules } = require('./rules');
const { getRuleType } = require('./util');

/** @param {import('vscode').ExtensionContext} context */
function activate(context) {

    vscode.languages.setLanguageConfiguration('markdown', {
        onEnterRules: [
            {
                beforeText: /^\s*# .*/,
                afterText: /.*$/,
                action: {
                    indentAction: 0,
                    appendText: '# '
                }
            }
        ]
    });

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
exports.activate = activate;