// obtain access to required files
let parse = require("./parse.js");
let parking = require(".parking.js");

// testing
// let testParse = parse("./simple_data/moving_jan_2016.csv");


// extract and store the command line options, if any.
let argument1, argument2;
if (process.argv[2]) {
  argument1 = process.argv[2];
} else {
  console.log("Please enter a month value that is contained in the dataset");
  return;
}

if (process.argv[3]) {
  argument2 = process.argv[3];
} else {
  console.log("Please enter a year value that is contained in the dataset");
  return;
}

// validate if the arguments are valid:
let validMonth = [ "January", "February", "March", "April", "May" ];
let validYear = "2016";

let argument1IsValid = false;

// verify if a matching/correct value for the *capitalized* Month was entered,
// and if so, treat as ok
for (let i = validMonth.length - 1; i >= 0; i--) {
  if(argument1 === validMonth[i]) {
    argument1IsValid = true;
    break;
  }
}

// verify if a *lowercase* Month was entered, and if so, treat as ok
for (let i = validMonth.length - 1; i >= 0; i--) {
  if(argument1 === validMonth[i].toLowerCase()) {
    argument1IsValid = true;
    break;
  }
}

// the month value was invalid
if (!argument1IsValid) {
  console.log("Month value invalid:  please enter a valid between January-May");
  return;
}

if (argument2 !== validYear) {
  console.log("Year value invalid:  please enter a valid year (currently: 2016)");
  return;
}

/* NOTE:  We are going to pass the month argument value, for example, as "January" or "january".
   The called functions will NOT be checking the upper/lower case of the month value at all
   (and it shouldn't matter we hope)
*/

// command-line arguments are now considered valid
