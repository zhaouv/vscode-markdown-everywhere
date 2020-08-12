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

const json = {
    quoteKey:false,
    stringify:(data,replacer,space,d)=>{
        d=~~d
        if (typeof space==typeof 0) {
            space=Array.from({length:space+1}).join(' ')
        }
        if (d<=0 || !space) {
            return JSON.stringify(data,replacer,space);
        }
        return json.json(JSON.parse(JSON.stringify(data,replacer)),d,space,'\n')
    },
    parse:JSON.parse,
    json:(data,d,space,pre)=>{
        if (d<=0) {
            if (!json.quoteKey) {
                return json.json(data,999,'','');
            }
            return JSON.stringify(data);
        }
        if (data instanceof Array) {
            if (data.length==0) {
                return '[]'
            }
            let texts = [];
            for (let v of data) {
                texts.push(space+json.json(v,d-1,space,pre+space));
            }
            return '['+pre+texts.join(','+pre)+pre+']';
        }
        if (data instanceof Object) {
            if (Object.keys(data).length==0) {
                return '{}'
            }
            let texts = [];
            for (let i in data) {
                if (!json.quoteKey && JSON.stringify(i)=='"'+i+'"') {
                    texts.push(space+i+': '+json.json(data[i],d-1,space,pre+space))
                } else {
                    texts.push(space+'"'+i+'": '+json.json(data[i],d-1,space,pre+space))
                }
            }
            return '{'+pre+texts.join(','+pre)+pre+'}';
        }
        return JSON.stringify(data);
    },
    d1:(data)=>json.stringify(data,null,4,1),
    l1:(data)=>console.log(json.stringify(data,null,4,1)),
    d2:(data)=>json.stringify(data,null,4,2),
    l2:(data)=>console.log(json.stringify(data,null,4,2)),
}
exports.json=json