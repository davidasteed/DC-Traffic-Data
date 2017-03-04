function parkingAnalyzer(month, year) {

  // this function will return an object that will contain the calculated answers
  let calculatedResults = {};

  // obtain access to array generation program
  let parse = require("./parse.js");

  // obtain a dataset to analyze, based on the requested search criteria:
  // first, create a list of valid data files for input
  let validMonth = [ "January", "February", "March", "April", "May" ];

  // NOTE NOTE NOTE:  replace with the real parking files
  // let validParkingFiles = ["parking_jan_2016.csv", "parking_feb_2016.csv", "parking_mar_2016.csv",
  //                       "parking_april_2016.csv", "parking_may_2016.csv"];
  //
  let validParkingFiles = ["../simple_data/parking_feb_2016.csv"];

  // determine what input file to ask for
  let requestedDatafile;
  validMonth.forEach(
    function getFileName() {
      if (month === "February"){
        requestedDatafile = validParkingFiles[0];
      }
    }
  );

  // obtain and return the requested data file
  dataset = parse(requestedDatafile);

  // strip out the subarray that contains the labels
  dataset.splice(0, 1);

  // NOTE:  It is unknown why I have a empty subarray at the end of the parking array
  //        Deleting the last (and empty) subarray from the parking array
  dataset.splice(dataset.length - 1, 1);

  // Question 1:  "How many different types of parking tickets were issued?"
  // first, loop over the dataset and extract the property string values, and
  // store into their own array
  let allViolationCodes = [];
  let arrayIndex = 9; // the ninth index is the VIOLATION_CODE
  for (let i = dataset.length - 1; i >= 0; i--) {
    allViolationCodes.push(dataset[i][arrayIndex]);
  }

  console.log("allViolationCodes contains: ", allViolationCodes);
  console.log(allViolationCodes.length);

  // obtain a count of all unique instances of the violation codes
  //
  let frequency = [];
  // console.log("Before entering loop, allViolationCodes contains: " + allViolationCodes);
  // for (let i = allViolationCodes.length - 1; i >= 0; i--) {
  //
  // }

  console.log("The frequency array contains: ");
  console.log(frequency);




  // first, loop over each outer array (of tickets):
  // let arrayOfViolationCodes = [];
  // dataset.forEach(
  //   // then inside each ticket, copy the violation code to another array (arrayOfViolationCodes)
  //   function findElementNine(insideArray) {
  //     arrayOfViolationCodes.push(insideArray[9])
  //   }
  // );




// now we'll obtain a count of all unique instances of the violation codes
// let counts = [];

// console.log("Before entering loop, arrayOfViolationCodes contains: " + arrayOfViolationCodes);

// for (let i = arrayOfViolationCodes.length - 1; i >= 0; i--) {
//   let propertyName = arrayOfViolationCodes[i];
//   let value = arrayOfViolationCodes[i][value];
//   console.log(arrayOfViolationCodes[i]);
//   console.log(arrayOfViolationCodes[i][value]);

// for(var key in objects) {
//     var value = objects[key];
// }


  // counts[index] = counts[index] ? counts[index] + 1 : 1;
// }



// NOTE: this method makes counts an object...this causes problems later
//
// for (let i = arrayOfViolationCodes.length - 1; i >= 0; i--) {
//
//     let index = arrayOfViolationCodes[i];
//
//     // console.log("Iterating on index #" + i + ":");
//
//     // console.log("counts[" + index + "] is currently: " + counts[index]);
//     // if we've already counted this violation code, add one to the total,
//     // otherwise, add a new property for that count and set the value to one
//     counts[index] = counts[index] ? counts[index] + 1 : 1;
//
//     // console.log("after ternary stmt, counts[" + index + "] is now: " + counts[index]);
// }
//
//
// console.log("The counts array contains: ");
// console.log(counts);
// let totalUniqueViolationCodes = (Object.keys(counts)).length;
//
// console.log("The number of unique Violation Codes is: " + totalUniqueViolationCodes);

// Question 2:  What was the most common violation type for a parking ticket?

// get the names of the property names and store into an array
let namesOfUniqueViolationCodes = (Object.keys(counts));
console.log("The array of unique violation codes have the following property names: " + namesOfUniqueViolationCodes);

// get the values for each property and store into an array
let valuesOfUniqueViolationCodes;



for (let key in counts) {
  // valuesOfUniqueViolationCodes.push(counts[key]);
}


console.log("The array of unique violation codes have the following values: " + valuesOfUniqueViolationCodes);



let mostCommonViolationType = Math.max(...namesOfUniqueViolationCodes);
console.log("The most violation codes were of the following type: " + mostCommonViolationType);

// loop over the properties and find the max occurring values
let currentValue;

namesOfUniqueViolationCodes.forEach(
  function determineMaxValues(property){

  }
);


// console.log("The most violation codes were of the following type: " + counts[mostCommonViolationType]);

// let mostCommonViolationType = Math.max(...counts);
/*
var arr = [1, 2, 3];
var max = Math.max(...arr);
*/



// console.log("The most common violation type is: " + mostCommonViolationType);



// first, copy the object to an array so we can get the max value




// let mostCommonViolationType = Math.max(uniqueViolationCodes);

// function getMaxOfArray(numArray) {
//   Math.max.apply(null, numArray);
// }

// for (let i = uniqueViolationCodes.length - 1; i >= 0; i --) {
//
//   console.log("Loop iteration #" + i);
//   propertyValue = uniqueViolationCodes
//
//   mostCommonViolationType.push(uniqueViolationCodes.i);
//
// }



// console.log("The array now contains: " + mostCommonViolationType);







// determine the Violation Code that has the highest occurrence

// function getMaxOfArray()







// NOTE: testing
// console.log("The arrayOfViolationCodes has a length of " + arrayOfViolationCodes.length);
// console.log(arrayOfViolationCodes);

  return calculatedResults;
}
// NOTE:  testing
let testResults = parkingAnalyzer("February", "2016");
// console.log(testResults[0][9]);

// // NOTE:  this is testing
// console.log("The file to be requested is: " + requestedDatafile);
//
// let testResults = parse(requestedDatafile);
//
// console.log(testResults);

  //
  // let dataset = parse();
  //
  //
  //
  //
  //
  // var arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
  // var counts = {};
  //
  // for(var i = 0; i< arr.length; i++) {
  //     var num = arr[i];
  //     console.log("Loop iteration " + i + ":");
  //     console.log("num = " + num);
  //     console.log("counts[num] starts as: " + counts[num]);
  //
  //     counts[num] = counts[num] ? counts[num]+1 : 1;
  //     console.log("and now counts[num] = " + counts[num]);
  //     console.log("the contents of the counts object is " + counts[num]);
  //
  // }
  //
  // console.log("The counts object contains:");
  // console.log(counts[5]);
  // console.log(counts[2]);
  // console.log(counts[9]);
  // console.log(counts[4]);
  // }

// parkingAnalyzer("February", "2016");
