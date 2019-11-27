const assert = require('assert');
const insertTransaction = require("../src/utilities").insertTransaction;
const getTransactionObj = require('../src/utilities').getTransactionObj;
const getBeverageDetails = require('../src/utilities').getBeverageDetails;
const readTransactions = require('../src/utilities').readTransactions;

describe("insertTransaction", function() {
  it("should add new Transaction to the non-existing empid", function() {
    let date = new Date().toJSON();
    let currentData = {};
    let newTransaction = {
      beverage : "watermelon",
      quantity : 1,
      date : date
    };
    let expected = {
      12345 : {
        beverages : [
          {
            beverage : "watermelon",
            quantity : 1,
            date : date,
            empid : 12345
          }
        ]
      }
    };
    assert.deepEqual(insertTransaction(12345, newTransaction, currentData), expected);
  });

  it("should add new transaction to the existing empid", function() {
    let date = new Date().toJSON();
    let currentData = {
      12345 : {
        beverages : [
          {
            beverage : "Orange",
            quantity : 1,
            date : date,
            empid : 12345
          }
        ]
      }
    };
    let newTransaction = {
      beverage : "watermelon",
      quantity : 1,
      date : date,
    };
    let expected = {
      12345 : {
        beverages : [
          {
            beverage : "Orange",
            quantity : 1,
            date : date,
            empid : 12345
          },
          {
            beverage : "watermelon",
            quantity : 1,
            date : date,
            empid : 12345
          }
        ]
      }
    };
    assert.deepStrictEqual(insertTransaction(12345, newTransaction, currentData), expected);
  });
});

describe("getTransactionObj", function() {
  it("should get details of given transaction as object", function() {
    let date = new Date();
    let actual = getTransactionObj({ '--empid': '25340', '--beverage': 'mango', '--qty': '2' }, date);
    let expected = {
      beverage : "mango",
      quantity : '2',
      date : date
    }
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getBeverageDetails", function() {
  it("should give beverage details and count of given emp details", function() {
    let date = new Date();
    let transactions = [
      {
        beverage : "Orange",
        quantity : 1,
        date : date,
        empid : 1234
      },
      {
        beverage : "watermelon",
        quantity : 1,
        date : date,
        empid : 1234
      }
    ];
    let actual = getBeverageDetails(transactions);
    let expected = {
      beverageDetails : [[1234,"Orange",1,date],[1234,"watermelon",1,date]],
      beverageCount : 2
    }
    assert.deepStrictEqual(actual, expected);
  });
});

describe("readTransactions", function() {
  it("should read file and return contents if present", function() {
    const fileExists = function(filepath) {
      assert.strictEqual(filepath, "filepath");
      return true;
    }
    const readFile = function(path) {
      assert.strictEqual(path, "filepath");
      return '{"key" : "value"}';
    }
    let actual = readTransactions('filepath', fileExists, readFile);
    let expected = {key : "value"};
    assert.deepStrictEqual(actual, expected);
  });

  it("should return empty object for non-existing file", function() {
    const fileExists = function(filepath) {
      assert.strictEqual(filepath, "filepath");
      return false;
    }
    const readFile = function(path) {
      assert.strictEqual(path, "filepath");
      return '{}';
    }
    let actual = readTransactions('filepath', fileExists, readFile);
    let expected = {};
    assert.deepStrictEqual(actual, expected);
  });
});