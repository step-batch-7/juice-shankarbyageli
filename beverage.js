const fs = require('fs');
const {getDataStorePath, getDate} = require('./src/config');
const getTransactionResult = require('./src/transaction').getTransactionResult;

const main = function() {
  const userInput = process.argv.slice(2);
  const helperObj = {
    dataFile : getDataStorePath(process.env),
    isFileExists : fs.existsSync,
    readFile : fs.readFileSync,
    writer : fs.writeFileSync,
    date : getDate(process.env)
  }
  const transactionResult = getTransactionResult(userInput, helperObj);
  console.log(transactionResult.join('\n'));
};

main();