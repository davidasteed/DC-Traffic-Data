module.exports = function movingAnalyzer(month, year) {
  // this function will return an object that will contain the calculated answers
  let calculatedResults = {};

  // obtain access to array generation program
  let parse = require("./parse.js");

  // obtain a dataset to analyze, based on the requested search criteria:
  // first, create a list of valid data files for input
  let validMonth = [ "january", "february", "march", "april", "may" ];

  let validMovingFiles = ["./data/moving_jan_2016.csv", "./data/moving_feb_2016.csv",
                          "./data/moving_mar_2016.csv", "./data/moving_april_2016.csv",
                          "./data/moving_may_2016.csv"];

  // // NOTE: testing
  // let validMovingFiles = ["./simple_data/moving_jan_2016.csv"]

  // determine what input file to ask for
  let requestedDatafile;

  // change month to lowercase
  month = month.toLowerCase();
  
  if (month === validMonth[0]) {
    requestedDatafile = validMovingFiles[0];
    } else if (month === validMonth[1]) {
    requestedDatafile = validMovingFiles[1];
    } else if (month === validMonth[2]) {
      requestedDatafile = validMovingFiles[2];
    } else if (month === validMonth[3]) {
      requestedDatafile = validMovingFiles[3];
    } else {
      requestedDatafile = validMovingFiles[4];
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

  //
  // pre-work to answer question 1:
  //
  // store the different types of moving violation tickets that were issued
  // first, loop over the dataset and extract the property string values, and
  // store into their own array
  let allViolationCodes = [];
  let arrayIndex = 17; // index for VIOLATION_CODE
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

  // Question 1:  What was the most common violation type for a moving violation?
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

  // Question 2:  skip the "What state license plate gets the most tickets?" per instructor

  //
  // Question 3: "What is the average fine amount?"
  //
  // store all fine amounts into an array
  let allFines = [];
  let fineIndex = 10; // the index for the FINEAMT
  for (let i = dataset.length - 1; i >= 0; i--) {
    allFines.push(dataset[i][fineIndex]);
  }

  // calculate the average
  let sumFines = 0;
  allFines.forEach(
    function getAverage(oneFine){
      // don't write empty values
      if (oneFine) {
      sumFines += parseInt(oneFine);
      }
    }
  );
  let averageFines = sumFines / allFines.length;

  // store in the results object
  calculatedResults.averageFines = averageFines;


  // Question 4:  "What was the total income from photo citations (tickettype = "Photo")?"
  // The violation code is T120 (index 17)
  // we'll loop over the dataset and when there is a match for index 17 = 'T120',
  // we'll add the fine amount (index 10) to an array
  let sumPhotoCitations = 0;
  let vcCodeIndex = 17;
  let vcFineIndex = 10;

  dataset.forEach(
    function sumFines(row) {
      if (row[vcCodeIndex] === 'T120') {
        sumPhotoCitations += parseInt(row[vcFineIndex]);
      }
    }
  );

  // store in the results object
  calculatedResults.incomePhotoCitations = sumPhotoCitations;

  // Questioh 5: "What was the total income from all moving violations?"
  // loop over the dataset and sum up all moving violations
  let sumAllFines = 0;
  dataset.forEach(
    function addAllFines(row) {
      if (row[vcFineIndex]) {
        sumAllFines += parseInt(row[vcFineIndex]);
      }
    }
  );

  // store in the results object
  calculatedResults.movingViolationIncome = sumAllFines;
  return calculatedResults;
};
