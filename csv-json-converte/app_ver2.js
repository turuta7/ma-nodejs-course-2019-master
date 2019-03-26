const fs = require('fs');
const path = require('path');
const readline = require('readline');


const csvFile = path.resolve(__dirname, './file.txt');
const jsonFile = path.resolve(__dirname, './new1.json');


const stream = fs.createReadStream(csvFile);
const stream2 = fs.createWriteStream(jsonFile);


stream.on('open', () => {
    console.log('open');
})

const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});

let firstLine, nextLine;
let data = {};
let koma = true;
rl.on('line', (line) => {
    if (!firstLine) {
        firstLine = line.split(',');
        stream2.write('[');
        return
    }
    nextLine = line.split(',');
    for (let i = 0; i < firstLine.length; i++) {
        data[firstLine[i]] = nextLine[i];
    };

    if (koma === true) {
        stream2.write(`${JSON.stringify(data)}`);
        koma = false
        return
    }
    stream2.write(`,${JSON.stringify(data)}`);
})

stream.on('end', () => {
    stream2.write(']')
    console.log('end');
});
