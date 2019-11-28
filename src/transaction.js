const readTransactions = require('./utilities').readTransactions;
const writeIntoTransactions = require('./utilities').writeIntoTransactions;
const parseInput = require('./inputValidation').parseInput;
const getTransactionObj = require('./utilities').getTransactionObj;
const insertTransaction = require('./utilities').insertTransaction;
const getBeverageDetails = require('./utilities').getBeverageDetails;
const getSavedPrintFormat = require('./utilities').getSavedPrintFormat;
const getQueryResultFormat = require('./utilities').getQueryResultFormat;

const filterByEmpId = function(records, empid) {
  if(!empid) {
    return records;
  }
  return records.filter(function(record) {
    return empid === record.empid;
  });
};

const filterByDate = function(records, date) {
  if(!date) {
    return records;
  }
  return records.filter(function(record) {
    let filterDate = new Date(date).toLocaleDateString();
    return filterDate === new Date(record.date).toLocaleDateString();
  });
};

const filterByBeverage = function(records, beverage) {
  if(!beverage) {
    return records;
  }
  return records.filter(function(record) {
    return record.beverage === beverage
  });
};

const performSaveTransaction = function(currentRecords, transactionDetails, writer, date) {
  let transactionObj = getTransactionObj(transactionDetails, date);
  currentRecords = insertTransaction(transactionObj, currentRecords);
  writeIntoTransactions('./transactions.json', currentRecords, writer);
  return getSavedPrintFormat(transactionObj);
};

const performQueryTransaction = function(currentRecords, transaction) {
  let empId = transaction['--empid'];
  let date = transaction['--date'];
  let beverage = transaction['--beverage'];
  let empidFilteredRecords = filterByEmpId(currentRecords, empId);
  let dateFilteredRecords = filterByDate(empidFilteredRecords, date);
  let beverageFilteredRecords = filterByBeverage(dateFilteredRecords, beverage);
  let {beverageDetails, beverageCount} = getBeverageDetails(beverageFilteredRecords);
  return getQueryResultFormat(beverageDetails, beverageCount);
};

const getTransactionResult = function(userInput, helperObj) {
  let option = userInput[0];
  let {isValid, transactionDetails} = parseInput(userInput);
  if(isValid) {
    let records = readTransactions('./transactions.json', helperObj.isFileExists ,helperObj.readFile);
    return option === '--save' ? performSaveTransaction(
      records, 
      transactionDetails,
      helperObj.writer, 
      helperObj.date
    ) : performQueryTransaction(records, transactionDetails);
  }
  let invalidMsg = ['Invalid Options !'];
  return invalidMsg;
};

exports.performSaveTransaction = performSaveTransaction;
exports.performQueryTransaction = performQueryTransaction;
exports.getTransactionResult = getTransactionResult;
exports.filterByEmpId = filterByEmpId;
exports.filterByDate = filterByDate;
exports.filterByBeverage = filterByBeverage;