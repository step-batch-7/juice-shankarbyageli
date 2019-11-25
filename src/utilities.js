const fs = require('fs');
const parseDetails = require('./inputValidation').parseDetails;

const printQueryResult = function(queryResult, beverageCount) {
  console.log("Employee ID, Beverage, Quantity, Date");
  console.log(queryResult.join('\n'), '\ntotal : ' + beverageCount + ' juices');
};

const printSavedTransaction = function(empid, transaction) {
  console.log("Transaction Recorded:");
  console.log("Employee ID, Beverage, Quantity, Date");
  console.log(empid+','+transaction.beverage+','+transaction.quantity+',',transaction.date);
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

const insertTransaction = function(empid, transactionObj, records) {
  if(!Object.keys(records).includes(String(empid))) {
    records[empid] = {};
    records[empid]["beverages"] = [];
  }
  records[empid]["beverages"].push(transactionObj);
  return records;
};

const readTransactions = function(filename) {
  if(!fs.existsSync(filename,'utf8')) {
    fs.writeFileSync(filename,'{}','utf8');
  }
  let transactions = fs.readFileSync(filename,'utf8');
  transactions = JSON.parse(transactions);
  return transactions;
};

exports.readTransactions = readTransactions;
exports.insertTransaction = insertTransaction;
exports.getTransactionObj = getTransactionObj;
exports.getEmpBeverageCount = getEmpBeverageCount;
exports.getEmpBeverageDetails = getEmpBeverageDetails;
exports.printQueryResult = printQueryResult;
exports.printSavedTransaction = printSavedTransaction;