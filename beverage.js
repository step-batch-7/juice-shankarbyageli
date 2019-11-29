const fs = require('fs');
const getTransactionResult = require('./src/transaction').getTransactionResult;

const main = function() {
  const userInput = process.argv.slice(2);
  const helperObj = {
    dataFile : process.env.JUICE_TRANSACTIONS_STORE_PATH || './transactions.json',
    isFileExists : fs.existsSync,
    readFile : fs.readFileSync,
    writer : fs.writeFileSync,
    date : process.env.NOW || new Date(),
  }
  const transactionResult = getTransactionResult(userInput, helperObj);
  console.log(transactionResult.join('\n'));
};

main();