const performTransaction = require('./src/performTransaction.js').performTransaction;
const isValidInput = require('./src/inputValidation.js').isValidInput;

const main = function() {
  let userInput = process.argv.slice(2);
  let validArgs = isValidInput(userInput);
  let result = ["Invalid Option !"];
  if(validArgs.isValid) {
    result = performTransaction(userInput[0], validArgs.transactionDetails, new Date().toJSON());
  }
  console.log(result.join('\n'));
};

main();