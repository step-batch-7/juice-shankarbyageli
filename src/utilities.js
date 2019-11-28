const getQueryResultFormat = function(details, beverageCount) {
  let heading = "Employee ID, Beverage, Quantity, Date";
  details = details.join('\n');
  let total = `total : ${beverageCount} juices`;
  return [heading, details, total];
};

const getSavedPrintFormat = function(empid, transaction) {
  let recorded = "Transaction Recorded:";
  let heading = "Employee ID, Beverage, Quantity, Date";
  let detail = `${empid},${transaction.beverage},${transaction.quantity},${transaction.date}`;
  return [recorded, heading, detail];
};

const getBeverageDetails = function(queryResult) {
  let beverageDetails = queryResult.map(function(row) {
    return [row.empid, row.beverage, row.quantity, row.date];
  });
  let beverageCount = queryResult.reduce(function(total, row) {
    return total + (+row.quantity);
  }, 0);
  return {beverageDetails, beverageCount};
};

const getTransactionObj = function(transaction, date) {
  let transactionObj = {
    beverage : transaction["--beverage"],
    quantity : transaction["--qty"],
    empid : transaction["--empid"],
    date : date.toJSON()
  }
  return transactionObj;
};

const writeIntoTransactions = function(filePath, records, fileWriter) {
  let transaction = JSON.stringify(records);
  fileWriter(filePath, transaction, 'utf8');
}

const insertTransaction = function(empid, transactionObj, records) {
  if(!Object.keys(records).includes(String(empid))) {
    records[empid] = [];
  }
  records[empid].push(transactionObj);
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
exports.getBeverageDetails = getBeverageDetails;
exports.getQueryResultFormat = getQueryResultFormat;
exports.getSavedPrintFormat = getSavedPrintFormat;
exports.writeIntoTransactions = writeIntoTransactions;