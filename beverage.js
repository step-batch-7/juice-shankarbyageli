const performTransaction = require('./src/performTransaction.js').performTransaction;

const main = function() {
  let userInput = process.argv.slice(2);
  performTransaction(userInput);
};

main();