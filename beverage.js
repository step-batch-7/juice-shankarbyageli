const performTransaction = require('./src/performTransaction.js').performTransaction;
const isValidInput = require('./src/inputValidation.js').isValidInput;

const main = function() {
  let userInput = process.argv.slice(2);
  let validArgs = isValidInput(userInput);
  if(validArgs.isValid) {
    performTransaction(userInput, validArgs.transactionDetails);
    return 0;
  }
  console.log("Invalid Option !")
};

main();