const assert = require('assert');
const insertTransaction = require("../src/utilities").insertTransaction;
const getSaveDetails = require("../src/utilities").getSaveDetails;
const getTransactionObj = require('../src/utilities').getTransactionObj;
const getEmpBeverageCount = require('../src/utilities').getEmpBeverageCount;
const getEmpBeverageDetails = require('../src/utilities').getEmpBeverageDetails;

describe("insertTransaction", function() {
  it("should add new Transaction to the non-existing empid", function() {
    let currentData = {};
    let newTransaction = {
      beverage : "watermelon",
      quantity : 1,
      date : new Date()
    };
    let expected = {
      12345 : {
        beverages : [
          {
            beverage : "watermelon",
            quantity : 1,
            date : new Date()
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
            date : new Date()
          }
        ]
      }
    };
    let newTransaction = {
      beverage : "watermelon",
      quantity : 1,
      date : new Date()
    };
    let expected = {
      12345 : {
        beverages : [
          {
            beverage : "Orange",
            quantity : 1,
            date : new Date()
          },
          {
            beverage : "watermelon",
            quantity : 1,
            date : new Date()
          }
        ]
      }
    };
    assert.deepStrictEqual(insertTransaction(12345, newTransaction, currentData), expected);
  });
});

describe("getSaveDetails", function() {
  it("should give details object from user input for save transaction", function() {
    let actual = getSaveDetails(["--save","--beverage","Orange","--empid","12345","--qty","2"]);
    let expected = {
      empid : "12345",
      beverage : "Orange",
      quantity : "2"
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getTransactionObj", function() {
  it("should get details of given transaction as object", function() {
    let actual = getTransactionObj({empid:12345, beverage:"Papaya", quantity:1});
    let expected = {
      beverage : "Papaya",
      quantity : 1,
      date : new Date()
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
            date : new Date()
          },
          {
            beverage : "watermelon",
            quantity : 1,
            date : new Date()
          }
    ];
    let actual = getEmpBeverageDetails(12345, transactions);
    let expected = [
      [12345, "Orange", 1, new Date()],
      [12345, "watermelon", 1, new Date()]
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
        date : new Date()
      },
      {
        beverage : "watermelon",
        quantity : 1,
        date : new Date()
      }
    ];
    let actual = getEmpBeverageCount(transactions);
    assert.strictEqual(actual, 2);
  });
});