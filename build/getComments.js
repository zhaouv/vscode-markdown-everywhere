// node ./build/getComments
// a single-shot script, generate comments.js

// to run this script, you should change the path
const { json } = require('./util')
const p3 = "C:/Users/ZhaoUV/AppData/Local/Programs/Microsoft VS Code/resources/app/extensions/"
const fs = require('fs')

let arr=fs.readdirSync(p3).map(p=>{
    const rootDir = p3+p+'/'
    const packageJSONPath = rootDir+'package.json';
    let output=[]
    if (!fs.existsSync(packageJSONPath)) {
        return output
    }
    const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath,{encoding:'utf-8'}))
    // return packageJSON
    const po=packageJSON
    if (!(po.contributes && po.contributes.languages && po.contributes.grammars)) {
        return output
    }
    let languages={}
    po.contributes.grammars.forEach(l => {
        if (!(l.language && l.scopeName)) {
            return
        }
        languages[l.language]=l.scopeName
    })
    po.contributes.languages.forEach(l => {
        if (!(l.id && l.configuration && languages[l.id])) {
            return
        }
        // some json is not standard json format
        const configuration = eval('('+fs.readFileSync(rootDir+l.configuration,{encoding:'utf-8'})+')')
        output.push({name:l.id,comments:configuration.comments,source:languages[l.id]})
    });
    return output
}).reduce((a,b)=>a.concat(b))

// console.log(arr);
// fs.writeFileSync('ignore/packages.json',JSON.stringify(arr,null,4))
fs.writeFileSync('ignore/comments.js',json.stringify(arr,null,4,2))