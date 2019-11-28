const fs = require('fs');
const getTransactionResult = require('./src/transaction').getTransactionResult;

const main = function() {
  const userInput = process.argv.slice(2);
  const helperObj = {
    isFileExists : fs.existsSync,
    readFile : fs.readFileSync,
    writer : fs.writeFileSync,
    date : new Date(),
  }
  const transactionResult = getTransactionResult(userInput, helperObj);
  console.log(transactionResult.join('\n'));
};

main();