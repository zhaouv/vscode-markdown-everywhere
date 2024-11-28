function printInjectJson() {
    
    let fff=()=>{

        let {src,options}=args
        const lines = src.split(/\r?\n|\r\n?/);
        let lino = -1;
        let currentOffset = 0;
        
        while (++lino < lines.length) {
            let pa=null;
            let line = lines[lino];

            // MD remove `\label`, do not change number of lines, directly replace
            line=line
            .replace(/\\label{.*?}/g,'')
            .replace(/\\chapter{(.*?)}/g,'# $1')
            .replace(/\\section{(.*?)}/g,'## $1')
            .replace(/\\subsection{(.*?)}/g,'### $1')
            .replace(/\\subsubsection{(.*?)}/g,'#### $1')
            .replace(/\\paragraph{(.*?)}/g,'##### $1')
            .replace(/\\subparagraph{(.*?)}/g,'##### $1')

            // MD fix equation, add 3 more lines. fix offset for trace
            pa=/\\begin{(equation|display|alignat|aligned|align|multline|flalign)}/
            if (pa.exec(line)){
                line=line.replace(pa,(m)=>'\n\n$$\n'+m)
                currentOffset+=3
                options.offset.push([lino + currentOffset, currentOffset])
            }

            // MD fix equation
            pa=/\\end{(equation|display|alignat|aligned|align|multline|flalign)}/
            if (pa.exec(line)){
                line=line.replace(pa,(m)=>m+'\n$$\n\n')
                currentOffset+=3
                options.offset.push([lino + currentOffset, currentOffset])
            }

            lines[lino] = line;
        }
        return lines.join('\r\n');
        
    }

    var sss=fff.toString().slice(7,-2).replace(/ +/g,' ')
    var ooo={"language":"latex","path":".*","beforeSource":sss}
    console.log(JSON.stringify(ooo))
    // src=a({src,options:this.options});
     
    for (const i of [1]) {
        a=1
        b=2
    }
    
    // [markdown]
    // # 1232
    // 123123123
    // 1567
    
    c=1

    // MD # title
    // MD content
    // MD + list
    
    d=1

    /* [markdown]
     * # title
     * content
     */

    e=1
}
printInjectJson()
/* 

// [markdown]
// # 1232
// 123123123
// 1567

c=1

// MD # title
// MD content
// MD + list

d=1

*/