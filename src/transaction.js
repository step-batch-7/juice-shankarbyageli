const fs = require('fs');
const readTransactions = require('./utilities').readTransactions;
const writeIntoTransactions = require('./utilities').writeIntoTransactions;
const parseInput = require('./inputValidation').parseInput;
const getTransactionObj = require('./utilities').getTransactionObj;
const insertTransaction = require('./utilities').insertTransaction;
const getBeverageDetails = require('./utilities').getBeverageDetails;
const getSavedPrintFormat = require('./utilities').getSavedPrintFormat;
const getQueryResultFormat = require('./utilities').getQueryResultFormat;

const getDetailsOfGivenID = function(records, empid) {
  let selectedEmpRecords = [];
  for(employeeId in records) {
    let empID = empid || employeeId;
    if(employeeId == empID) {
      selectedEmpRecords = selectedEmpRecords.concat(records[employeeId]);
    }
  }
  return selectedEmpRecords;
};

const getFilteredRecords = function(selectedEmpRecords, date, beverage) {
  let selected = selectedEmpRecords.filter(function(record) {
    date = date || record.date;
    beverage = beverage || record.beverage;
    let filterDate = new Date(date).toLocaleDateString();
    let isGivenBeverage = record.beverage === beverage;
    return (filterDate == new Date(record.date).toLocaleDateString() && isGivenBeverage);
  });  
  return selected;
};

const performSaveTransaction = function(currentRecords, transactionDetails, date) {
  let empid = transactionDetails['--empid'];
  let transactionObj = getTransactionObj(transactionDetails, date);
  currentRecords = insertTransaction(empid, transactionObj, currentRecords);
  writeIntoTransactions('./transactions.json', currentRecords, fs.writeFileSync);
  return getSavedPrintFormat(empid, transactionObj);
};

const performQueryTransaction = function(currentRecords, transaction) {
  let selectedEmpRecords = [];
  let empId = transaction['--empid'];
  let date = transaction['--date'];
  let beverage = transaction['--beverage'];
  selectedEmpRecords = getDetailsOfGivenID(currentRecords, empId);
  let selectedRecords = getFilteredRecords(selectedEmpRecords, date, beverage);
  let {beverageDetails, beverageCount} = getBeverageDetails(selectedRecords);
  return getQueryResultFormat(beverageDetails, beverageCount);
};

const getTransactionResult = function(userInput, date) {
  let option = userInput[0];
  let {isValid, transactionDetails} = parseInput(userInput);
  if(isValid) {
    let records = readTransactions('./transactions.json', fs.existsSync ,fs.readFileSync);
    return option === '--save' ? performSaveTransaction(records, transactionDetails, date) :
      performQueryTransaction(records, transactionDetails);
  }
  let invalidMsg = ["Invalid Options !"];
  return invalidMsg;
};

exports.performSaveTransaction = performSaveTransaction;
exports.performQueryTransaction = performQueryTransaction;
exports.getFilteredRecords = getFilteredRecords;
exports.getDetailsOfGivenID = getDetailsOfGivenID;
exports.getTransactionResult = getTransactionResult;