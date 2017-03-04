
module.exports = function parseFile(inputFile) {
  // create a variable to access the Node system "fs" object
  let filesystem = require("fs");

  // read the file and store it as a "buffer"
  let fileToBuffer = filesystem.readFileSync(inputFile);

  // convert the "buffer" into a big string
  let bufferToBigString = fileToBuffer.toString();

  // read each row into an array of strings
  let arrayOfStrings = bufferToBigString.split('\n');

  // loop over each row and write that row into
  // a 2-dimensional "array of array of strings"
  let arrayOfArrays = [];
  arrayOfStrings.forEach(function writeStringToArray(inputArray) {
    arrayOfArrays.push(inputArray.split(","));
  });

  // NOTE:  testing
  // console.log(arrayOfArrays);

  return arrayOfArrays;
};
