const util = require("./util/util");
const fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const displayResult = (topRanked, filePath) => {
  if(filePath) {
    console.log(`---------------${filePath} results--------------------`);
  }
  topRanked.forEach(combo => {
    console.log(`${combo.combo.split('_').join(' ')} - ${combo.count}`);
  });
}

const mainStreamStdin = () => {
  let storyStr = '';
  rl.on('line', (line) => {
      storyStr += line + ' ';
  });

  rl.on('close', () => {
    displayResult(util.getRankedWordCombos(storyStr));
  });
}

const main = () => {
    if(process.argv.length <= 2) {
      return;
    }

    let files = [];
    for (let i = 2; i < process.argv.length; i++) {
      files = [...files, process.argv[i]];
    }

    const promises = files.map(file => {
      return util.readFile(file);
    });

    Promise.all(promises).then((result) => {
      files.forEach((file, i) => {
        displayResult(result[i], file);
      })
    });
}

// extra credit
const mainStream = () => {
  if(process.argv.length <= 2) {
    return;
  }

  let files = [];
  for (let i = 2; i < process.argv.length; i++) {
    let file = process.argv[i];
    files = [...files, file];
  }

  if(process.argv.includes('scaleMe')) {
    files.pop();
    for (let i = 0; i < 100; i++) {
      files = [...files, 'mocks/moby_dick.txt'];
    }
  }

  files.forEach((file) => {
    let stream = fs.createReadStream(`${__dirname}/${file}`);
    let storyStr = '';
    stream.on('data', (line) => {
        storyStr += line + ' ';
    });

    stream.on('close', () => {
      displayResult(util.getRankedWordCombos(storyStr), file);
    });
  });  
}

// main();
mainStream(); //extra credit
mainStreamStdin();