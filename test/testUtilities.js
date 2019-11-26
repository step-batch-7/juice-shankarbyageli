const assert = require('assert');
const insertTransaction = require("../src/utilities").insertTransaction;
const getTransactionObj = require('../src/utilities').getTransactionObj;
const getEmpBeverageCount = require('../src/utilities').getEmpBeverageCount;
const getEmpBeverageDetails = require('../src/utilities').getEmpBeverageDetails;
const readTransactions = require('../src/utilities').readTransactions;

describe("insertTransaction", function() {
  it("should add new Transaction to the non-existing empid", function() {
    let currentData = {};
    let newTransaction = {
      beverage : "watermelon",
      quantity : 1,
      date : 10
    };
    let expected = {
      12345 : {
        beverages : [
          {
            beverage : "watermelon",
            quantity : 1,
            date : 10
          }
        ]
      }
    };
    assert.deepStrictEqual(insertTransaction(12345, newTransaction, currentData), expected);
  });

  it("should add new transaction to the existing empid", function() {
    let currentData = {
      12345 : {
        beverages : [
          {
            beverage : "Orange",
            quantity : 1,
            date : '9-9-19'
          }
        ]
      }
    };
    let newTransaction = {
      beverage : "watermelon",
      quantity : 1,
      date : '9-9-19'
    };
    let expected = {
      12345 : {
        beverages : [
          {
            beverage : "Orange",
            quantity : 1,
            date : '9-9-19'
          },
          {
            beverage : "watermelon",
            quantity : 1,
            date : '9-9-19'
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

describe("getEmpBeverageDetails", function() {
  it("should give beverage details of non-existing empid", function() {
    let actual = getEmpBeverageDetails(12345, []);
    let expected = [];
    assert.deepStrictEqual(actual, expected);
  });

  it("should give beverage details given empid", function() {
    let transactions = [
      {
        beverage : "Orange",
        quantity : 1,
        date : '5-5-19'
      },
      {
        beverage : "watermelon",
        quantity : 1,
        date : '6-11-19'
      }
    ];

    let actual = getEmpBeverageDetails(12345, transactions);
    let expected = [
      [12345, "Orange", 1, '5-5-19'],
      [12345, "watermelon", 1, '6-11-19']
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getEmpBeverageCount", function() {
  it("should give beverage count for non-existing beverages", function() {
    assert.strictEqual(getEmpBeverageCount([]),0)
  });

  it("should give beverage count of employee id", function() {
    let transactions = [
      {
        beverage : "Orange",
        quantity : 1,
        date : '1-1-19'
      },
      {
        beverage : "watermelon",
        quantity : 1,
        date : '1-1-19'
      }
    ];
    let actual = getEmpBeverageCount(transactions);
    assert.strictEqual(actual, 2);
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