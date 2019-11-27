const performTransaction = require('./src/transaction.js').performTransaction;
const validateInput = require('./src/inputValidation.js').validateInput;

const main = function() {
  let userInput = process.argv.slice(2);
  let option = userInput[0];
  let transactionResult = ["Invalid Option !"];
  let transaction = validateInput(userInput);
  if(transaction.isValid) {
    let details = transaction.details;
    transactionResult = performTransaction(option, details, new Date().toJSON());
  }
  console.log(transactionResult.join('\n'));
};

main();