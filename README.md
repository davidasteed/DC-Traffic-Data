DC-Traffic-Data project:

David Steed, developer
The Iron Yard Feb 2017 Cohort

Synopsis:  using node.js server-side programming, read in traffic data files (.csv files) and analyze as requested by the customer.

Critical path:

1.  validate that the input file can be read into a buffer, then to a big string object, then to an array of strings, then to an array of array of strings. (parse.js)
  done
2.  validate that parse.js can be exported and run remotely
  done
3.  program flow:
  a.  user calls main.js with two arguments:
  ~/project-name/$ node main.js January 2016
        done
  b.  main.js stores these arguments, and will pass them to the analysis functions
      

  c.  main.js matches the desired filename as indicated by the month/year args (switch statement)
      - saves that filename in a variable

  d.  main.js calls parse.js using the matching filename as per the month/year args
      - and main.js stores the 2-dim array returned in a variable

  e.  main.js calls parking.js and passes the month/year args via "console.log = " (? maybe)
      - main.js prints the return value showing parking analysis for that month/year
      - alternatively:  just print from the parking.js

  f. main.js calls moving.js and does the same as step e.






  calls parse.js


  and provides two arguments for MONTH and YEAR, e.g.:
        ~/project-name/$ node main.js January 2016

        - first, get parse.js to read in these args

  b.  save the month/year choice as a "control" variable.  
