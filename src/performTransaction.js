const fs = require('fs');
const readTransactions = require('./utilities').readTransactions;
const writeIntoTransactions = require('./utilities').writeIntoTransactions;
const getTransactionObj = require('./utilities').getTransactionObj;
const insertTransaction = require('./utilities').insertTransaction;
const getEmpBeverageDetails = require('./utilities').getEmpBeverageDetails;
const getEmpBeverageCount = require('./utilities').getEmpBeverageCount;
const getSavedPrintFormat = require('./utilities').getSavedPrintFormat;
const getQueryResultFormat = require('./utilities').getQueryResultFormat;

const performTransaction = function(option, transaction, date) {
  let currentRecords = readTransactions('./transactions.json', fs.existsSync ,fs.readFileSync);
  let result = [];
  if(option == "--save") {
    result = performSaveTransaction(currentRecords, transaction, date);
  } else {
    result = performQueryTransaction(currentRecords, transaction);
  }
  return result;
};

const performSaveTransaction = function(currentRecords, transactionDetails, date) {
  let empid = transactionDetails['--empid'];
  let transactionObj = getTransactionObj(transactionDetails, date);
  currentRecords = insertTransaction(empid, transactionObj, currentRecords);
  writeIntoTransactions(currentRecords);
  return getSavedPrintFormat(empid, transactionObj);
};

const performQueryTransaction = function(currentRecords, transaction) {
  let result = ["No beverage details for this empid"];
  let empid = transaction['--empid'];
  if(Object.keys(currentRecords).includes(String(empid))) {
    let beverageDetails = currentRecords[empid]["beverages"];
    let queryResult = getEmpBeverageDetails(empid, beverageDetails);
    let beverageCount = getEmpBeverageCount(beverageDetails);
    result = getQueryResultFormat(queryResult, beverageCount);
  }
  return result;
};

exports.performTransaction = performTransaction;
exports.performSaveTransaction = performSaveTransaction;
exports.performQueryTransaction = performQueryTransaction;