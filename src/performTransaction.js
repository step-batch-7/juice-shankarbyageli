const fs = require('fs');
const readTransactions = require('./utilities').readTransactions;
const writeIntoTransactions = require('./utilities').writeIntoTransactions;
const getTransactionObj = require('./utilities').getTransactionObj;
const insertTransaction = require('./utilities').insertTransaction;
const getBeverageDetails = require('./utilities').getBeverageDetails;
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
  let selectedEmpRecords = [];
  let empId = transaction['--empid'];
  let date = transaction['--date'];
  for(employeeId in currentRecords) {
    let empid = empId || employeeId;
    currentRecords[employeeId]["beverages"].foremployeeId(function(record) {
      record.empid = employeeId;
    })
    if(employeeId == empid) {
      selectedEmpRecords = selectedEmpRecords.concat(currentRecords[employeeId]["beverages"]);
    }
  }
  let selectedRecords = getFilteredRecords(selectedEmpRecords, date);
  let {beverageDetails, beverageCount} = getBeverageDetails(selectedRecords);
  return getQueryResultFormat(beverageDetails, beverageCount);
};

const getFilteredRecords = function(selectedEmpRecords, date) {
  let selected = selectedEmpRecords.filter(function(subrecord) {
    let recordDate = date || subrecord.date;
    date = new Date(recordDate).toLocaleDateString();
    return (date == new Date(subrecord.date).toLocaleDateString());
  });  
  return selected;
}

exports.performTransaction = performTransaction;
exports.performSaveTransaction = performSaveTransaction;
exports.performQueryTransaction = performQueryTransaction;
exports.getFilteredRecords = getFilteredRecords;