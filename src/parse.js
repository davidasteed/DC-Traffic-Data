
module.exports = function parseFile(inputFile) {
  // create a variable to access the Node system "fs" object
  let filesystem = require("fs");

  // read the file and store it as a "buffer"
  let fileToBuffer = filesystem.readFileSync(inputFile);

  // convert the "buffer" into a big string
  let bufferToBigString = fileToBuffer.toString();

  // read each row into an array of strings
  let arrayOfStrings = bufferToBigString.split('\n');

  // NOTE: Problem:  the "DESCRIPTION" field often contains one or more commas.
  // This causes our split to split the description (index 10)
  // across two indexes instead of one.  which pushes all of the subsequent
  // indexes farther "down" the array and makes a mess of subsequent calculations
  // NOTE:  This is a workaround!!:  we'll replace any quoted strings that contain a comma,
  // and replace them with the same string, minus the comma
  for (let i = arrayOfStrings.length - 1; i >= 0; i--) {
    let quotedString = arrayOfStrings[i].match(/\".*\,?.*\"/);
    if (quotedString) {
      let noCommaString = quotedString[0].replace(/\,/g, "");

      arrayOfStrings[i] = arrayOfStrings[i].replace(/\".*\,.*\"/ , noCommaString);
    }
  }

  // loop over each row and write that row into
  // a 2-dimensional "array of array of strings"
  let arrayOfArrays = [];
  arrayOfStrings.forEach(function writeStringToArray(inputArray) {
    arrayOfArrays.push(inputArray.split(","));
  });

  return arrayOfArrays;
};
