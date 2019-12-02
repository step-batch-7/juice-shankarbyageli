const getQueryResultFormat = function(details, beverageCount) {
  const heading = 'Employee ID, Beverage, Quantity, Date';
  details = details.join('\n');
  const total = `Total : ${beverageCount} ${beverageCount == 1 ? 'Juice' : 'Juices'}`;
  return [heading, details, total];
};

const getSavedPrintFormat = function(transaction) {
  const recorded = 'Transaction Recorded:';
  const heading = 'Employee ID, Beverage, Quantity, Date';
  const detail = `${transaction.empid},${transaction.beverage},${transaction.quantity},${transaction.date.toJSON()}`;
  return [recorded, heading, detail];
};

exports.getQueryResultFormat = getQueryResultFormat;
exports.getSavedPrintFormat = getSavedPrintFormat;