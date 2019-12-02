exports.getDataStorePath = function(env) {
  return env.JUICE_TRANSACTION_DATA_STORE || './transactions.json';
};

exports.getDate = function(env) {
  const stubbedDate = new Date(env.NOW);
  const hasValidStubbedDate = !isNaN(stubbedDate.getTime());
  return hasValidStubbedDate ? stubbedDate : new Date();
};