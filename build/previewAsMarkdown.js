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

    const beginRegExp = new RegExp(`^\\s*(${rule.beginRegExp || '...'}) ?`);
    const whileRegExp = new RegExp(`^\\s*(${rule.whileRegExp || '...'}) ?`);
    const endRegExp = new RegExp(`^\\s*(${rule.endRegExp || '...'}) ?`);

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
    options.offset = [];
    // MD do nothing
    if (options.code === 0) {
        return
    }
    // MD keep source  
    // MD fenced or \<details>\<summary>
    if (options.code === 1 || options.code === 3) {
        let startStr = '``` ' + languageId + '\r\n';
        let endStr = '\r\n```';
        let startOffset = 1;
        let endOffset = 1;
        if (options.code === 3) {
            startStr = '<details><summary></summary>\r\n\r\n' + startStr;
            startOffset += 2;
            endStr = endStr + '\r\n</details>'
            endOffset += 1;
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
