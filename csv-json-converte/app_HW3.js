const fs = require("fs");
const path = require("path");
const readline = require("readline");

const fileCsvIn = process.argv[2];
const fileJsonOut = process.argv[3] || `${fileCsvIn}.json`;
const separator = process.argv[4] || ",";

//error processing
process.on("uncaughtException", err => {
    console.log(`${err}`);
});
if (!fileCsvIn) {
	console.error("need to enter argument (.csv)");
}

//full folder + name files
const csvFile = path.resolve(__dirname, fileCsvIn);
const jsonFile = path.resolve(__dirname, fileJsonOut);

//stream
const stream = fs.createReadStream(csvFile);
const streamWrite = fs.createWriteStream(jsonFile);


stream.on("open", () => {
	console.log("open");
});

const rl = readline.createInterface({
	input: stream,
	crlfDelay: Infinity
});

console.time("metka");

let firstLine, nextLine;
let koma = true;
rl.on("line", (line) => {
	if (!firstLine) {
		firstLine = line.split(separator);
		streamWrite.write("[") ;
		return;
	}
	nextLine = line.split(separator);
	let data = "";
//new line 
	for (let i = 0; i < firstLine.length; i++) {
		if (!data) {
			data += `"${firstLine[i]}":"${nextLine[i]}"`;
		} else data += `,"${firstLine[i]}":"${nextLine[i]}"`;
	}

	if (koma === true) {
		streamWrite.write(`{${data}}`);
		koma = false;
		return;
	};
	streamWrite.write(`,{${data}}`);
});
stream.on("end", () => {
	streamWrite.write("]");
	console.timeEnd("metka");
	console.log("end");
});


