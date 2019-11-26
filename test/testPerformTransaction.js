const assert = require('assert');
const performSaveTransaction = require('../src/performTransaction.js').performSaveTransaction;
const performQueryTransaction = require('../src/performTransaction').performQueryTransaction;
const performTransaction = require('../src/performTransaction').performTransaction;

describe("performSaveTransaction", function() {
    it("should add new Transaction to the non-existing empid", function() {
      let date = new Date().toJSON();
      let currentData = {};
      let newTransaction = {
        "--beverage" : "watermelon",
        "--qty" : 1,
        "--empid" : 12345
      };
      let expected = [
        'Transaction Recorded:',
        'Employee ID, Beverage, Quantity, Date',
        `12345,watermelon,1,${date}`
      ];
      let actual = performSaveTransaction(currentData, newTransaction, date);
      assert.deepStrictEqual(actual, expected);
  });
});

describe("performQueryTranasaction", function() {
  it("should return details of given employee in array", function() {
    let date = new Date().toJSON();
    let currentData = {
      12345 : {
        beverages : [
          {
            beverage : "Orange",
            quantity : 1,
            date : date
          }
        ]
      }
    };
    let newTransaction = {
      "--empid" : 12345
    };
    let actual = performQueryTransaction(currentData, newTransaction);
    let expected = [
      'Employee ID, Beverage, Quantity, Date',
      `12345,Orange,1,${date}`,
      'total : 1 juices'
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("performTransaction", function() {
  it("should perform save transaction", function() {
    let date = new Date().toJSON();
    let currentData = {};
    let newTransaction = {
      "--beverage" : "watermelon",
      "--qty" : 1,
      "--empid" : 12345
    };
    let expected = [
      'Transaction Recorded:',
      'Employee ID, Beverage, Quantity, Date',
      `12345,watermelon,1,${date}`
    ];
    let actual = performTransaction('--save', newTransaction, new Date().toJSON());
    assert.deepStrictEqual(actual, expected);
  });
});