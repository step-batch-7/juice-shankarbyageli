const fs = require('fs');
const parseDetails = require('./inputValidation').parseDetails;

const getQueryResultFormat = function(queryResult, beverageCount) {
  let heading = "Employee ID, Beverage, Quantity, Date";
  let result = `${queryResult.join('\n')}` 
  let total = `total : ${beverageCount} juices`;
  return [heading, result, total];
};

const getSavedPrintFormat = function(empid, transaction) {
  let recorded = "Transaction Recorded:";
  let heading = "Employee ID, Beverage, Quantity, Date";
  let detail = `${empid},${transaction.beverage},${transaction.quantity},${transaction.date}`;
  return [recorded, heading, detail];
}

const getEmpBeverageDetails = function(empid, beverageDetails) {
  let queryResult = beverageDetails.map(function(detail) {
    return [empid, detail.beverage, detail.quantity, detail.date];
  }, []);
  return queryResult;
};

const getEmpBeverageCount = function(beverageDetails) {
  let beverageCount = beverageDetails.reduce(function(totalBeverages, detail) {
    return totalBeverages += Number(detail.quantity);
  }, 0);
  return beverageCount;
};

const getTransactionObj = function(transaction, date) {
  let transactionObj = {
    beverage : transaction["--beverage"],
    quantity : transaction["--qty"],
    date : date
  }
  return transactionObj;
};

const writeIntoTransactions = function(records) {
  let transaction = JSON.stringify(records);
  fs.writeFileSync('./transactions.json', transaction, 'utf8');
}

const insertTransaction = function(empid, transactionObj, records) {
  if(!Object.keys(records).includes(String(empid))) {
    records[empid] = {};
    records[empid]["beverages"] = [];
  }
  records[empid]["beverages"].push(transactionObj);
  return records;
};

const readTransactions = function(filepath, fileExists, readFile) {
  if(!fileExists(filepath)) {
    return JSON.parse('{}');
  }
  let transactions = readFile(filepath,'utf8');
  return JSON.parse(transactions);
};

exports.readTransactions = readTransactions;
exports.insertTransaction = insertTransaction;
exports.getTransactionObj = getTransactionObj;
exports.getEmpBeverageCount = getEmpBeverageCount;
exports.getEmpBeverageDetails = getEmpBeverageDetails;
exports.getQueryResultFormat = getQueryResultFormat;
exports.getSavedPrintFormat = getSavedPrintFormat;
exports.writeIntoTransactions = writeIntoTransactions;