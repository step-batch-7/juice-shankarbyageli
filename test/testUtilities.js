const assert = require('chai').assert;
const insertTransaction = require('../src/utilities').insertTransaction;
const getTransactionObj = require('../src/utilities').getTransactionObj;
const getBeverageDetails = require('../src/utilities').getBeverageDetails;
const readTransactions = require('../src/utilities').readTransactions;
const writeIntoTransactions = require('../src/utilities').writeIntoTransactions;

describe('insertTransaction', function() {
  it('should add new Transaction to the non-existing empid', function() {
    const date = new Date().toJSON();
    const currentData = [];
    const newTransaction = {
      empid : 12345,
      beverage : 'watermelon',
      quantity : 1,
      date : date
    };
    const expected = [
      {
        empid : 12345,
        beverage : 'watermelon',
        quantity : 1,
        date : date
      }
    ];
    assert.deepEqual(insertTransaction(newTransaction, currentData), expected);
  });

  it('should add new transaction to the existing empid', function() {
    const date = new Date().toJSON();
    const currentData = [
      {
        empid : 12345,
        beverage : 'Orange',
        quantity : 1,
        date : date
      }
    ];
    const newTransaction = {      
      empid : 12345,
      beverage : 'watermelon',
      quantity : 1,
      date : date,
    };
    const expected = [
      {
        empid : 12345,
        beverage : 'Orange',
        quantity : 1,
        date : date,
      },
      {
        empid : 12345,
        beverage : 'watermelon',
        quantity : 1,
        date : date
      }
    ];
    assert.deepStrictEqual(insertTransaction(newTransaction, currentData), expected);
  });
});

describe('getTransactionObj', function() {
  it('should get details of given transaction as object', function() {
    const date = new Date();
    const actual = getTransactionObj({ '--empid': '25340', '--beverage': 'mango', '--qty': '2' }, date);
    const expected = {
      beverage : 'mango',
      quantity : '2',
      empid : '25340',
      date : date
    }
    assert.deepStrictEqual(actual, expected);
  });
});

describe('getBeverageDetails', function() {
  it('should give beverage details and count of given emp details', function() {
    const date = new Date();
    const transactions = [
      {
        beverage : 'Orange',
        quantity : 1,
        date : date,
        empid : 1234
      },
      {
        beverage : 'watermelon',
        quantity : 1,
        date : date,
        empid : 1234
      }
    ];
    const actual = getBeverageDetails(transactions);
    const expected = {
      beverageDetails : [[1234,'Orange',1,date],[1234,'watermelon',1,date]],
      beverageCount : 2
    }
    assert.deepStrictEqual(actual, expected);
  });
});

describe('readTransactions', function() {
  it('should read file and return contents if present', function() {
    const fileExists = function(filepath) {
      assert.strictEqual(filepath, 'filepath');
      return true;
    }
    const readFile = function(path) {
      assert.strictEqual(path, 'filepath');
      return '{"key" : "value"}';
    }
    const actual = readTransactions('filepath', fileExists, readFile);
    const expected = {key : 'value'};
    assert.deepStrictEqual(actual, expected);
  });

  it('should return empty object for non-existing file', function() {
    const fileExists = function(filepath) {
      assert.strictEqual(filepath, 'filepath');
      return false;
    }
    const readFile = function(path) {
      assert.strictEqual(path, 'filepath');
      return '[]';
    }
    const actual = readTransactions('filepath', fileExists, readFile);
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('writeIntoTransactions', function() {
  it('should write the new transaction in the file', function() {
    const fileWriter = function(filePath, content) {
      assert.equal(filePath, 'somepath');
      assert.equal(content, '{"key":"value"}');
    }
    const actual = writeIntoTransactions('somepath', {key : 'value'}, fileWriter);
  });
});