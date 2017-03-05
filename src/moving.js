module.exports = function movingAnalyzer(month, year) {
  // this function will return an object that will contain the calculated answers
  let calculatedResults = {};

  // obtain access to array generation program
  let parse = require("./parse.js");

  // obtain a dataset to analyze, based on the requested search criteria:
  // first, create a list of valid data files for input
  let validMonth = [ "January", "February", "March", "April", "May" ];

  // NOTE NOTE NOTE:  replace with the real moving files
  // let validMovingFiles = ["moving_jan_2016.csv", "moving_feb_2016.csv", "moving_mar_2016.csv",
  //                       "moving_april_2016.csv", "moving_may_2016.csv"];
  //
  let validMovingFiles = ["./simple_data/moving_jan_2016.csv"];

  // determine what input file to ask for
  let requestedDatafile;
  validMonth.forEach(
    function getFileName() {
      if (month === "February"){
        requestedDatafile = validMovingFiles[0];
      }
    }
  );

  // obtain and return the requested data file
  dataset = parse(requestedDatafile);

  // strip out the subarray that contains the labels
  dataset.splice(0, 1);

  // NOTE:  It is unknown why I have a empty subarray at the end of the moving array
  //        Deleting the last (and empty) subarray from the moving array
  dataset.splice(dataset.length - 1, 1);

  // Question 1:  "How many different types of moving tickets were issued?"
  // first, loop over the dataset and extract the property string values, and
  // store into their own array
  let allViolationCodes = [];
  let arrayIndex = 9; // the ninth index is the VIOLATION_CODE
  for (let i = dataset.length - 1; i >= 0; i--) {
    allViolationCodes.push(dataset[i][arrayIndex]);
  }

  // then create a count array to store the totals for each unique violation code
  let counts = {};
  for (let i = allViolationCodes.length - 1; i >= 0; i--) {
      let index = allViolationCodes[i]; // track which violation code we're currently looking at
      // if we've already counted this violation code, add one to the total,
      // otherwise, add a new property for that count and set the value to one
      counts[index] = counts[index] ? counts[index] + 1 : 1;
  }

  let totalUniqueViolationCodes = (Object.keys(counts)).length;

  // copy the calculated answer for Question #1 to the results object
  calculatedResults.totalUniqueViolationCodes = totalUniqueViolationCodes;

  // Question 2:  What was the most common violation type for a moving ticket?
  // first, create an array with the property names
  let vcNames = Object.keys(counts);

  // copy the totals into an array
  let vcValues = [];
  vcNames.forEach(
    function copyValue(property){
      vcValues.push(counts[property]);
    }
  );

  // determine the highest count of Violation codes
  let highestValue = Math.max(...vcValues);

  // determine which array indexes contain the highest value:
  let matchingIndexes = []
  for (let i = vcValues.length; i >= 0; i--) {
    if (vcValues[i] == highestValue) {
      matchingIndexes.push(i);
    }
  }

  // copy the property/value for the highest value into the results object
  let arrayOfHighest = [];

  matchingIndexes.forEach(
    function copyHighest(i){
      arrayOfHighest.push(vcNames[i])
    }
  );
  calculatedResults.mostCommonViolationType = arrayOfHighest;

  // Question 3:  skip the license plates for moving data per instructor

  return calculatedResults;
};
