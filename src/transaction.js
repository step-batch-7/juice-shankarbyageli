const { readTransactions, 
  writeIntoTransactions, 
  getTransactionObj, 
  insertTransaction,
  getBeverageDetails, 
} = require('./transactionLib');

const { getSavedPrintFormat,
  getQueryResultFormat 
} = require('./utilities');

const parseInput = require('./inputValidation').parseInput;

const doesDateMatch = function(date, givenDate) {
  givenDate = new Date(givenDate || date).toLocaleDateString();
  date = new Date(date).toLocaleDateString();
  return date == givenDate;
};

const doesEmpidMatch = function(empid, givenEmpid) {
  givenEmpid = givenEmpid || empid;
  return givenEmpid == empid;
};

const doesBeverageMatch = function(beverage, givenBeverage) {
  givenBeverage = givenBeverage || beverage;
  return givenBeverage == beverage;
};

const getFilteredRecords = function(records, filters) {
  return records.filter(function(record) {
    const isSameEmpid = doesEmpidMatch(record.empid, filters.empid);
    const isSameDate = doesDateMatch(record.date, filters.date);
    const isSameBeverage = doesBeverageMatch(record.beverage, filters.beverage);
    return isSameEmpid && isSameDate && isSameBeverage;
  });
};

const performSaveTransaction = function(currentRecords, transactionDetails, writer, dataFile, date) {
  const transactionObj = getTransactionObj(transactionDetails, date);
  currentRecords = insertTransaction(transactionObj, currentRecords);
  writeIntoTransactions(dataFile, currentRecords, writer);
  return getSavedPrintFormat(transactionObj);
};

const performQueryTransaction = function(currentRecords, transaction) {
  const empid = transaction['--empid'];
  const date = transaction['--date'];
  const beverage = transaction['--beverage'];
  const filteredRecords = getFilteredRecords(currentRecords, {empid, date, beverage});
  const {beverageDetails, beverageCount} = getBeverageDetails(filteredRecords);
  return getQueryResultFormat(beverageDetails, beverageCount);
};

const getTransactionResult = function(userInput, helperObj) {
  const option = userInput[0];
  const {isValid, transactionDetails} = parseInput(userInput);
  if(isValid) {
    const records = readTransactions(helperObj.dataFile, helperObj.isFileExists ,helperObj.readFile);
    return option === '--save' ? performSaveTransaction(
      records, 
      transactionDetails,
      helperObj.writer,
      helperObj.dataFile,
      helperObj.date
    ) : performQueryTransaction(records, transactionDetails);
  }
  const invalidMsg = ['Invalid Options !'];
  return invalidMsg;
};

exports.performSaveTransaction = performSaveTransaction;
exports.performQueryTransaction = performQueryTransaction;
exports.getTransactionResult = getTransactionResult;
exports.getFilteredRecords = getFilteredRecords;