const LRSM = 'LRSM';
const LRSW = 'LRSW';
const MR = 'MR';
const BR = 'BR';
exports.LRSM = LRSM;
exports.LRSW = LRSW;
exports.MR = MR;
exports.BR = BR;
exports.RULETYPE = [LRSM, LRSW, MR, BR];

exports.getRuleType = (rule) => {
    let check = '' + ~~!!rule.beginRegExp + ~~!!rule.whileRegExp + ~~!!rule.endRegExp;
    // Will throw an error if the input is not of any kind
    return ((check_) => ({
        '110': () => LRSM,
        '010': () => LRSW,
        '111': () => MR,
        '101': () => BR,
    }[check_]))(check)();
}