//app synchronously 

const fs = require("fs");
const path = require("path");

const dirName = process.argv[2];
const nameFile = "contents.txt";

//error processing
process.on("uncaughtException", err => {
  console.log(`${err}`);
});
if (dirName === undefined) {
  return console.error(
    "need to enter argument (folder path)example: '../ contrnts / ......'"
  );
};

//full folder + name files
const newFile = path.join(dirName, nameFile);

// new file and new folder
if (!fs.existsSync(dirName)) {
  fs.mkdirSync(dirName);
  console.log("add folder");
}
if (!fs.existsSync(newFile)) {
  fs.writeFileSync(newFile, "");
  console.log("add file");
}

// ls file  => files
const files = fs.readdirSync(dirName);

// test file ascii
const filterArr = files.filter(x => {
  if (x !== nameFile) {
    const newFile1 = path.join(dirName, x);
    const resFile = fs.readFileSync(newFile1).toString();    
    if (/\ufffd/.test(resFile) !== true) return x;
  }
});

console.log(filterArr);

// not files in folder
if (filterArr.length === 0) console.log(`not files in folder:${dirName}`);

//
const arr = filterArr.map(x => {
  const newFile1 = path.join(dirName, x);
  const resFile = fs.readFileSync(newFile1).toString();
  fs.appendFileSync(newFile, resFile + "\n");
  return resFile;
});
console.log(arr);

