const performTransaction = require('./src/performTransaction.js').performTransaction;
const isValidInput = require('./src/inputValidation.js').isValidInput;

const main = function() {
  let userInput = process.argv.slice(2);
  let result = ["Invalid Option !"];
  let validArgs = isValidInput(userInput);
  if(validArgs.isValid) {
    let transactionDetails = validArgs.transactionDetails;
    result = performTransaction(userInput[0], transactionDetails, new Date().toJSON());
  }
  console.log(result.join('\n'));
};

main();