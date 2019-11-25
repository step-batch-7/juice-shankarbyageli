const performTransaction = require('./src/performTransaction.js').performTransaction;
const validateInput = require('./src/inputValidation.js').validateInput;

const main = function() {
  let userInput = process.argv.slice(2);
  if(validateInput(userInput)) {
    performTransaction(userInput);
    return 0;
  }
  console.log("Invalid Option !")
};

main();