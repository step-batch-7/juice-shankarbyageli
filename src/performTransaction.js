const fs = require('fs');
const readTransactions = require('./utilities').readTransactions;
const getTransactionObj = require('./utilities').getTransactionObj;
const insertTransaction = require('./utilities').insertTransaction;
const getEmpBeverageDetails = require('./utilities').getEmpBeverageDetails;
const getEmpBeverageCount = require('./utilities').getEmpBeverageCount;
const printSavedTransaction = require('./utilities').printSavedTransaction;
const printQueryResult = require('./utilities').printQueryResult;

const performTransaction = function(userInput, transaction) {
  let option = userInput[0];
  let currentRecords = readTransactions('./transactions.json');
  if(option == "--save") {
    transaction = performSaveTransaction(currentRecords, transaction);
    transaction = JSON.stringify(transaction);
    fs.writeFileSync('./transactions.json',transaction,'utf8');
  } else {
    transaction = performQueryTransaction(transaction);
  }
};

const performSaveTransaction = function(currentRecords, transactionDetails) {
  let transactionObj = getTransactionObj(transactionDetails, new Date());
  currentRecords = insertTransaction(transactionDetails["--empid"], transactionObj, currentRecords);
  printSavedTransaction(transactionDetails['--empid'], transactionObj);
  return currentRecords;
};

const performQueryTransaction = function(transaction) {
  let empid = transaction['--empid'];
  let currentRecords = readTransactions('./transactions.json');
  if(Object.keys(currentRecords).includes(empid)) {
    let beverageDetails = currentRecords[empid]["beverages"];
    let queryResult = getEmpBeverageDetails(empid, beverageDetails);
    let beverageCount = getEmpBeverageCount(beverageDetails);
    printQueryResult(queryResult, beverageCount);
    return 0;
  }
  console.log("Details for this empid don't exist");
};

exports.performTransaction = performTransaction;