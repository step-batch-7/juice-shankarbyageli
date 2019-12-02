const getBeverageDetails = function(queryResult) {
  const beverageDetails = queryResult.map(function(row) {
    return [row.empid, row.beverage, row.quantity, row.date];
  });
  const beverageCount = queryResult.reduce(function(total, row) {
    return total + (+row.quantity);
  }, 0);
  return {beverageDetails, beverageCount};
};

const getTransactionObj = function(transaction, date) {
  const transactionObj = {
    empid : transaction['--empid'],
    beverage : transaction['--beverage'],
    quantity : transaction['--qty'],
    date : date
  }
  return transactionObj;
};

const writeIntoTransactions = function(filePath, records, fileWriter) {
  const transaction = JSON.stringify(records);
  fileWriter(filePath, transaction, 'utf8');
}

const insertTransaction = function(transactionObj, records) {
  records.push(transactionObj);
  return records;
};

const readTransactions = function(filepath, fileExists, readFile) {
  if(!fileExists(filepath)) {
    return JSON.parse('[]');
  }
  const transactions = readFile(filepath,'utf8');
  return JSON.parse(transactions);
};

exports.readTransactions = readTransactions;
exports.insertTransaction = insertTransaction;
exports.getTransactionObj = getTransactionObj;
exports.getBeverageDetails = getBeverageDetails;
exports.writeIntoTransactions = writeIntoTransactions;