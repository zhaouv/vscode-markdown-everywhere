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


    let fff2=()=>{

        let {src,options}=args
        console.log(JSON.stringify( src.slice(0,40)))
        const lines = src.split(/\r?\n|\r\n?/);
        let lino = -1;
        let currentOffset = 0;
        
        while (++lino < lines.length) {
            let pa=null;
            let line = lines[lino];

            // MD fix equation, add more lines. fix offset for trace
            pa=/```math/
            if (pa.exec(line)){
                line=line.replace(pa,(m)=>'\n\n$$\n')
                currentOffset+=3
                options.offset.push([lino + currentOffset, currentOffset])
            }

            pa=/```/
            if (pa.exec(line)){
                line=line.replace(pa,(m)=>'\n$$\n\n')
                currentOffset+=3
                options.offset.push([lino + currentOffset, currentOffset])
            }

            pa=/``.*``/
            if (pa.exec(line)){
                line=line.replace(pa,(m)=>m.replace(/``/g,'$').replace(/\\\\/g,'\\'))
                // MD do not change number of lines, directly replace
            }

            // Please note that KaTeX can also cause line numbers to shift, which is not within the scope of this extension.

            lines[lino] = line;
        }
        return lines.join('\n');
        
    }

    var sss=fff2.toString().slice(7,-2).replace(/ +/g,' ')
    var ooo={"language":"julia","path":".*","beforeSource":sss}
    console.log(JSON.stringify(ooo))

    let fff3=()=>{

        // deprecated, use the preious one
        return args.src.replace(/```math/g,'$$$$\n').replace(/```/g,'\n$$$$').replace(/``/g,'$').replace(/\\\\/g,'\\')
        
    }
    var sss=fff3.toString().slice(7,-2).replace(/ +/g,' ')
    var ooo={"language":"julia","path":".*","beforeSource":sss}
    console.log(JSON.stringify(ooo))

    let fff4=()=>{

        let parts=args.src.split(/^(?=\.[\w ]+$)/m)
        function trimLeadingWhitespace(lines) {
            let minIndent = Infinity;
            for (const line of lines) {
                if(!line)continue
                const match = line.match(/^[\t ]*/);
                if (match) {
                    const indent = match[0].length;
                    if (indent < minIndent) {
                        minIndent = indent;
                    }
                }
            }
            if (minIndent === Infinity) {
                return [minIndent,lines];
            }
            const trimmedLines = lines.map(line => {
                return line.substring(minIndent);
            });
            return [minIndent,trimmedLines];
        }
        console.log(parts)
        for (let i in parts){
            const lines = parts[i].split(/\r?\n|\r\n?/);
            let [minIndent,trimmedLines]=trimLeadingWhitespace(lines.slice(1))
            if (minIndent !== Infinity && minIndent>0) {
                parts[i]='### '+lines[0].slice(1)+'\n'+trimmedLines.join('\n');
            }
        }
        console.log(parts)
        return parts.join('')
        
    }
    var sss=fff4.toString().slice(7,-2).replace(/ +/g,' ')
    var ooo={"language":"powershell","path":".*","beforeSource":sss}
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