const fs = require("fs");

const cleanupContent = (content) => {
    return content.toLowerCase()
                  .replace(/[^\w\s]/gi, '')
                  .replace(/\n/g, ' ')
                  .replace(/[ ]+/g, ' ');
}

const getRankedWordCombos = (storyStr) => {
    let key;
    let map = {};
    let storyArr = cleanupContent(storyStr).split(' ');
    for (let i = 0; i < storyArr.length - 2; i++) {
        key = `${storyArr[i]}_${storyArr[i+1]}_${storyArr[i+2]}`;
        map[key] = map[key] ? map[key] + 1: 1;
    }

    let topCombos = Object.keys(map).sort((a,b) => map[b] - map[a]).map(combo => {
        return {
            combo,
            count: map[combo]
        }
    }).slice(0,100);

    return topCombos;
}

const readFile = (file) => {
    return new Promise((resolve,reject)=>{
        fs.readFile(file, 'utf8', (err, content) => {
            if (err) {
                reject(err);
            }

            resolve(getRankedWordCombos(content));
        });
    });      
};


module.exports = {
    cleanupContent,
    readFile,
    getRankedWordCombos
};