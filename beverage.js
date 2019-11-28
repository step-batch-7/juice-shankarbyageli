const getTransactionResult = require('./src/transaction').getTransactionResult;

const main = function() {
  let userInput = process.argv.slice(2);
  let date = new Date();
  let transactionResult = getTransactionResult(userInput, date);
  console.log(transactionResult.join('\n'));
};

main();