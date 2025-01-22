const { getRuleType, LRSM, LRSW, MR, BR } = require('./util');

const fetchRelatedRule = (languageId, rules) => {
    return rules.filter(rule => rule.languages.filter(languages => languages.name === languageId).length);
}

// MD A bad implementation, just works
const ruleProcess = (rule, ruleIndex, lines, marks, output) => {
    const start_ = 0;
    const while_ = 1;
    const end_ = 2;
    const type = getRuleType(rule);
    let lino = -1;
    let state = start_;
    if (type === LRSW) state = while_;

    // ~~!!rule.beginRegExp + ~~!!rule.whileRegExp + ~~!!rule.endRegExp;
    //     '110': () => LRSM,
    //     '010': () => LRSW,
    //     '111': () => MR,
    //     '101': () => BR,
    let nextState = (state, type, success) => {
        if (type === LRSW) return while_;
        if (success) {
            if (state === start_ && type === LRSM) return while_;
            if (state === start_ && type === MR) return while_;
            if (state === start_ && type === BR) return end_;
            if (state === while_) return while_;
            if (state === end_) return start_;
        } else {
            if (state === start_) return start_;
            if (state === while_ && type === LRSM) return start_;
            if (state === while_ && type === MR) return --lino, end_;
            if (state === end_ && type === MR) return while_;
            if (state === end_ && type === BR) return end_;
        }
    }

    const beginRegExp = type !== BR ? new RegExp(`^\\s*(${rule.beginRegExp || '...'}) ?`) : new RegExp(`^(${rule.beginRegExp}) ?$`);
    const whileRegExp = new RegExp(`^\\s*(${rule.whileRegExp || '...'}) ?`);
    const endRegExp = type !== BR ? new RegExp(`^\\s*(${rule.endRegExp || '...'}) ?`) : new RegExp(`^(${rule.endRegExp}) ?$`);

    while (lino < lines.length - 1) {
        lino++;
        if (marks[lino] >= 0) continue;
        const line = lines[lino];
        if (state === start_) {
            let success = beginRegExp.exec(line);
            if (success) {
                marks[lino] = ruleIndex;
            }
            state = nextState(state, type, success);
        } else if (state === while_) {
            let success = whileRegExp.exec(line);
            if (success) {
                marks[lino] = ruleIndex;
                // MD remove the start mark and get content
                output[lino] = line.slice(success[0].length);
            }
            state = nextState(state, type, success);
        } else {
            let success = endRegExp.exec(line);
            if (success) {
                marks[lino] = ruleIndex;
            } else {
                if (type === BR) {
                    marks[lino] = ruleIndex;
                    // MD the hole line is content for `BR` when not matching `endRegExp`
                    output[lino] = line;
                }
            }
            state = nextState(state, type, success);
        }
    }
    1
}

const postProcessSource = (languageId, savedRules, lines, marks, output, options) => {
    // MD do nothing
    if (options.code === 0) {
        return
    }
    // MD keep source  
    // MD fenced or \<details>\<summary>
    if (options.code === 1 || options.code === 3) {
        let previousOffsetMap={}
        if(options.offset.length){
            // console.log(options.offset)
            let previousOffset=0
            for(let [k,v] of options.offset){
                previousOffsetMap[k-v]=v-previousOffset
                previousOffset=v
            }
        }
        options.offset = []
        let startStr = '``` ' + languageId + '\r\n';
        let endStr = '\r\n```';
        let startOffset = 1;
        let endOffset = 1;
        if (options.code === 3) {
            startStr = '\r\n<details><summary></summary>\r\n\r\n' + startStr;
            startOffset += 3;
            endStr = endStr + '\r\n</details>\r\n'
            endOffset += 2;
        }
        let lino = -1;
        while (lino < lines.length - 1) {
            lino++;
            if (marks[lino] >= 0) continue;
            const line = lines[lino];
            if (/^\s*$/.exec(line)) {
                marks[lino] = lino === 0 ? savedRules.length : marks[lino - 1];
                // continue;
            }
        }
        /** offset of data-line */
        let currentOffset = 0;
        lino = -1;
        while (lino < lines.length - 1) {
            lino++;
            if (previousOffsetMap[lino]) {
                currentOffset+=previousOffsetMap[lino]
                options.offset.push([lino + currentOffset, currentOffset])
            }
            if (marks[lino] >= 0) continue;
            const line = lines[lino];
            let used = false;
            // MD The number of lines will be more, and finally the preview and the source code will be staggered  
            // MD start fenced code
            if (lino === 0 || marks[lino - 1] >= 0) {
                output[lino] = startStr + line;
                used = true;
                currentOffset += startOffset;
            }
            if (lino === lines.length - 1 || marks[lino + 1] >= 0) {
                // MD end fenced code
                if (!used) output[lino] = line + endStr;
                // MD single-line code
                else output[lino] = startStr + line + endStr;
                currentOffset += endOffset;
                used = true;
            }
            if (!used) {
                output[lino] = line;
            } else {
                options.offset.push([lino + currentOffset, currentOffset])
            }
        }
        return
    }
    // MD splitter
    if (options.code === 2) {
        let lino = -1;
        while (lino < lines.length - 1) {
            lino++;
            if (marks[lino] >= 0 || lino === 0) continue;
            if (marks[lino - 1] >= 0) {
                output[lino] = '<hr>'
            }
        }
        return
    }
}

exports.processSource = (languageId, rules, src, options) => {
    if (options.code === 4) {
        return src;
    }
    let savedRules = fetchRelatedRule(languageId, rules);
    if (savedRules.length === 0) {
        return src;
    }
    const lines = src.split(/\r?\n|\r\n?/);
    const marks = Array.from(lines).map(v => -1);
    const output = Array.from(lines).map(v => ' ');
    savedRules.forEach((rule, i) => ruleProcess(rule, i, lines, marks, output));
    postProcessSource(languageId, savedRules, lines, marks, output, options);
    return output.join('\r\n');
}

exports.processResult = (languageId, ret, options) => {
    if (options.offset.length === 0) {
        return ret;
    }
    const lines = ret.split(/\r?\n|\r\n?/);
    // console.log(ret.split(/\r?\n|\r\n?/))
    // console.log(options)
    let lino = -1;
    let offsetI = 0;
    let offsetV = 0;
    const offset = [[0, 0]].concat(options.offset);
    while (++lino < lines.length) {
        const line = lines[lino];
        let match = /^(<(?:><|[^><])*?data-line=")(\d+)/.exec(line);
        if (match) {
            const dl = ~~match[2];
            while (offsetI < offset.length && offset[offsetI][0] <= dl) {
                offsetV = -offset[offsetI++][1];
            }
            lines[lino] = match[1] + (offsetV + dl) + line.slice(match[0].length);
        }
    }
    return lines.join('\r\n');
}

// generated from highlightDemo/test.js
exports.defaultPreviewInjects=[
    {"language":"latex","path":".*","beforeSource":" let {src,options}=args\n const lines = src.split(/\\r?\\n|\\r\\n?/);\n let lino = -1;\n let currentOffset = 0;\n \n while (++lino < lines.length) {\n let pa=null;\n let line = lines[lino];\n\n // MD remove `\\label`, do not change number of lines, directly replace\n line=line\n .replace(/\\\\label{.*?}/g,'')\n .replace(/\\\\chapter{(.*?)}/g,'# $1')\n .replace(/\\\\section{(.*?)}/g,'## $1')\n .replace(/\\\\subsection{(.*?)}/g,'### $1')\n .replace(/\\\\subsubsection{(.*?)}/g,'#### $1')\n .replace(/\\\\paragraph{(.*?)}/g,'##### $1')\n .replace(/\\\\subparagraph{(.*?)}/g,'##### $1')\n\n // MD fix equation, add 3 more lines. fix offset for trace\n pa=/\\\\begin{(equation|display|alignat|aligned|align|multline|flalign)}/\n if (pa.exec(line)){\n line=line.replace(pa,(m)=>'\\n\\n$$\\n'+m)\n currentOffset+=3\n options.offset.push([lino + currentOffset, currentOffset])\n }\n\n // MD fix equation\n pa=/\\\\end{(equation|display|alignat|aligned|align|multline|flalign)}/\n if (pa.exec(line)){\n line=line.replace(pa,(m)=>m+'\\n$$\\n\\n')\n currentOffset+=3\n options.offset.push([lino + currentOffset, currentOffset])\n }\n\n lines[lino] = line;\n }\n return lines.join('\\r\\n');\n \n "},
    {"language":"julia","path":".*","beforeSource":" let {src,options}=args\n console.log(JSON.stringify( src.slice(0,40)))\n const lines = src.split(/\\r?\\n|\\r\\n?/);\n let lino = -1;\n let currentOffset = 0;\n \n while (++lino < lines.length) {\n let pa=null;\n let line = lines[lino];\n\n // MD fix equation, add more lines. fix offset for trace\n pa=/```math/\n if (pa.exec(line)){\n line=line.replace(pa,(m)=>'\\n\\n$$\\n')\n currentOffset+=3\n options.offset.push([lino + currentOffset, currentOffset])\n }\n\n pa=/```/\n if (pa.exec(line)){\n line=line.replace(pa,(m)=>'\\n$$\\n\\n')\n currentOffset+=3\n options.offset.push([lino + currentOffset, currentOffset])\n }\n\n pa=/``.*``/\n if (pa.exec(line)){\n line=line.replace(pa,(m)=>m.replace(/``/g,'$').replace(/\\\\\\\\/g,'\\\\'))\n // MD do not change number of lines, directly replace\n }\n\n // Please note that KaTeX can also cause line numbers to shift, which is not within the scope of this extension.\n\n lines[lino] = line;\n }\n return lines.join('\\n');\n \n "},
    {"language":"powershell","path":".*","beforeSource":" let parts=args.src.split(/^(?=\\.[\\w ]+$)/m)\n function trimLeadingWhitespace(lines) {\n let minIndent = Infinity;\n for (const line of lines) {\n if(!line)continue\n const match = line.match(/^[\\t ]*/);\n if (match) {\n const indent = match[0].length;\n if (indent < minIndent) {\n minIndent = indent;\n }\n }\n }\n if (minIndent === Infinity) {\n return [minIndent,lines];\n }\n const trimmedLines = lines.map(line => {\n return line.substring(minIndent);\n });\n return [minIndent,trimmedLines];\n }\n console.log(parts)\n for (let i in parts){\n const lines = parts[i].split(/\\r?\\n|\\r\\n?/);\n let [minIndent,trimmedLines]=trimLeadingWhitespace(lines.slice(1))\n if (minIndent !== Infinity && minIndent>0) {\n parts[i]='### '+lines[0].slice(1)+'\\n'+trimmedLines.join('\\n');\n }\n }\n console.log(parts)\n return parts.join('')\n \n "}
]