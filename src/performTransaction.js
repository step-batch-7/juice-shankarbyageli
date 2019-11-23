const fs = require('fs');
const readTransactions = require('./utilities').readTransactions;
const getSaveDetails = require('./utilities').getSaveDetails;
const getTransactionObj = require('./utilities').getTransactionObj;
const insertTransaction = require('./utilities').insertTransaction;
const getEmpBeverageDetails = require('./utilities').getEmpBeverageDetails;
const getEmpBeverageCount = require('./utilities').getEmpBeverageCount;
const printSavedTransaction = require('./utilities').printSavedTransaction;
const printQueryResult = require('./utilities').printQueryResult;

const performTransaction = function(userInput) {
  let transaction = userInput[0];
  let currentRecords = readTransactions('./transactions.json');
  if(transaction == "--save") {
    transaction = performSaveTransaction(currentRecords, userInput);
    transaction = JSON.stringify(transaction);
    fs.writeFileSync('./transactions.json',transaction,'utf8');
  } else {
    transaction = performQueryTransaction(userInput);
  }
};

const performSaveTransaction = function(currentRecords, userInput) {
  let transactionDetails = getSaveDetails(userInput);
  let transactionObj = getTransactionObj(transactionDetails);
  currentRecords = insertTransaction(transactionDetails.empid, transactionObj, currentRecords);
  printSavedTransaction(transactionDetails.empid, transactionObj);
  return currentRecords;
};

const performQueryTransaction = function(userInput) {
  let empid = userInput[2];
  let currentRecords = readTransactions('./transactions.json');
  if(Object.keys(currentRecords).includes(empid)) {
    let beverageDetails = currentRecords[empid]["beverages"];
    let queryResult = getEmpBeverageDetails(empid, beverageDetails);
    let beverageCount = getEmpBeverageCount(beverageDetails);
    printQueryResult(queryResult, beverageCount);
    return 0;
  }
  return 0;
};

exports.performTransaction = performTransaction;