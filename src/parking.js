module.exports = function parkingAnalyzer(month, year) {
  // this function will return an object that will contain the calculated answers
  let calculatedResults = {};

  // obtain access to array generation program
  let parse = require("./parse.js");

  // obtain a dataset to analyze, based on the requested search criteria:
  // first, create a list of valid data files for input
  let validMonth = [ "january", "february", "march", "april", "may" ];

  // NOTE NOTE NOTE:  replace with the real parking files
  let validParkingFiles = ["./data/parking_jan_2016.csv", "./data/parking_feb_2016.csv",
                           "./data/parking_mar_2016.csv", "./data/parking_april_2016.csv",
                           "./data/parking_may_2016.csv"];

  // let validParkingFiles = ["./simple_data/parking_feb_2016.csv"];

  // determine what input file to ask for
  let requestedDatafile;

  // change month to lowercase
  month = month.toLowerCase();

  if (month === validMonth[0]) {
    requestedDatafile = validParkingFiles[0];
    } else if (month === validMonth[1]) {
    requestedDatafile = validParkingFiles[1];
    } else if (month === validMonth[2]) {
      requestedDatafile = validParkingFiles[2];
    } else if (month === validMonth[3]) {
      requestedDatafile = validParkingFiles[3];
    } else {
      requestedDatafile = validParkingFiles[4];
    }

  // obtain and return the requested data file
  dataset = parse(requestedDatafile);

  // strip out the subarray that contains the labels
  dataset.splice(0, 1);

  // strip out the subarray at the end *if* it appears to be empty
  // NOTE:  for whatever reason, the evaluation:
  //            "if (dataet[dataset.length - 1] === ("" || undefined)
  //        ...failed to match, so it was necessary to look into the inner array's first element.
  if (dataset[dataset.length - 1][0] === "") {
    dataset.splice(dataset.length - 1, 1);
  }

  // Question 1:  "How many different types of parking tickets were issued?"
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

  // Question 2:  What was the most common violation type for a parking ticket?
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
    if (vcValues[i] === highestValue) {
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


  // Question 3:  What state license plate gets the most tickets?
  // first, loop over the dataset and extract the property string values, and
  // store into their own array
  let allStates = [];
  let stateIndex = 12; // index of the RP_PLATE_STATE
  for (let i = dataset.length - 1; i >= 0; i--) {
    allStates.push(dataset[i][stateIndex]);
  }

  // then create a count array to store the totals for each unique violation code
  let stateCount = {};
  for (let i = allStates.length - 1; i >= 0; i--) {
      let index = allStates[i]; // track which violation code we're currently looking at
      // if we've already counted this violation code, add one to the total,
      // otherwise, add a new property for that count and set the value to one
      stateCount[index] = stateCount[index] ? stateCount[index] + 1 : 1;
  }

  // first, create an array with the property names
  let stateNames = Object.keys(stateCount);

  // copy the totals into an array
  let stateCounts = [];
  stateNames.forEach(
    function copyValue(property){
      stateCounts.push(stateCount[property]);
    }
  );

  // determine the highest count of Violation codes
  let highestPlateValue = Math.max(...stateCounts);

  // determine which array indexes contain the highest value:
  let stateMatchingIndexes = []
  for (let i = stateCounts.length; i >= 0; i--) {
    if (stateCounts[i] == highestPlateValue) {
      stateMatchingIndexes.push(i);
    }
  }

  // copy the property/value for the highest value into the results object
  let arrayOfHighestStates = [];

  stateMatchingIndexes.forEach(
    function copyHighest(i){
      arrayOfHighestStates.push(stateNames[i])
    }
  );
  calculatedResults.arrayOfHighestStates = arrayOfHighestStates;

  return calculatedResults;
};
