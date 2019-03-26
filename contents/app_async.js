//app asynchronously
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

// filter
const filterArr = files.filter(x => x !== nameFile);
console.log(filterArr);

//error processing
if (filterArr.length === 0) console.log(`not files is ${dirName}`);

// test ascii and 

const arr = filterArr.map(x => {
  const newFile1 = path.join(dirName, x);
  fs.readFile(newFile1, (err, data) => {
    if (err) { console.error(err) }
    if (/\ufffd/.test(data) !== true) {
      fs.appendFileSync(newFile, data + '\n');
    }

  });
})

console.log('200 ok');