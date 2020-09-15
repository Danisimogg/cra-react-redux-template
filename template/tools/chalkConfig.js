// Centralized configuration for chalk, which is used to add color to console.log statements.
let chalk = require('chalk');
const chalkError = chalk.red;
const chalkWarning = chalk.yellow;
const chalkProcessing = chalk.blue;
const chalkSuccess = chalk.green;
module.exports = {
  chalkSuccess, chalkProcessing,
  chalkWarning, chalkError
}
