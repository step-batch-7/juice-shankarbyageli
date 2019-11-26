const assert = require("assert");
const performSaveTransaction = require("../src/performTransaction.js").performSaveTransaction;
const performQueryTransaction = require("../src/performTransaction").performQueryTransaction;
const performTransaction = require("../src/performTransaction").performTransaction;
const getFilteredRecords = require("../src/performTransaction").getFilteredRecords;
const getDetailsOfGivenID = require("../src/performTransaction").getDetailsOfGivenID;
const addEmpIdToDetails = require("../src/performTransaction").addEmpIdToDetails;

describe("performSaveTransaction", function() {
  it("should add new Transaction to the non-existing empid", function() {
    let date = new Date().toJSON();
    let currentData = {};
    let newTransaction = {
      "--beverage": "watermelon",
      "--qty": 1,
      "--empid": 12345
    };
    let expected = [
      "Transaction Recorded:",
      "Employee ID, Beverage, Quantity, Date",
      `12345,watermelon,1,${date}`
    ];
    let actual = performSaveTransaction(currentData, newTransaction, date);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getFilteredRecords", function() {
  it("should filter given records by given filter", function() {
    let date = new Date().toJSON();
    let records = [
      {
        beverage: "mango",
        quantity: 1,
        date: date,
        empid: 12345
      },
      {
        beverage: "orange",
        quantity: 1,
        date: date,
        empid: 12345
      }
    ];
    let actual = getFilteredRecords(records, date);
    let expected = [
      {
        beverage: "mango",
        quantity: 1,
        date: date,
        empid: 12345
      },
      {
        beverage: "orange",
        quantity: 1,
        date: date,
        empid: 12345
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("performQueryTranasaction", function() {
  it("should return details of given employee in array", function() {
    let date = new Date().toJSON();
    let currentData = {
      12345: {
        beverages: [
          {
            beverage: "Orange",
            quantity: 1,
            date: date
          }
        ]
      }
    };
    let newTransaction = {
      "--empid": 12345
    };
    let actual = performQueryTransaction(currentData, newTransaction);
    let expected = [
      "Employee ID, Beverage, Quantity, Date",
      `12345,Orange,1,${date}`,
      "total : 1 juices"
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("performTransaction", function() {
  it("should perform save transaction", function() {
    let date = new Date().toJSON();
    let currentData = {};
    let newTransaction = {
      "--beverage": "watermelon",
      "--qty": 1,
      "--empid": 12345
    };
    let expected = [
      "Transaction Recorded:",
      "Employee ID, Beverage, Quantity, Date",
      `12345,watermelon,1,${date}`
    ];
    let actual = performTransaction(
      "--save",
      newTransaction,
      new Date().toJSON()
    );
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getDetailsOfGivenId", function() {
  it("should give details of given emp id", function() {
    let date = new Date().toJSON();
    let records = {
      12345: {
        beverages: [
          {
            beverage: "Orange",
            quantity: 1,
            date: date
          }
        ]
      }
    };
    let actual = getDetailsOfGivenID(records, 12345);
    let expected = [
      {
        beverage: "Orange",
        quantity: 1,
        date: date,
        empid: 12345
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should not give details of empid if doesn't exist", function() {
    let date = new Date().toJSON();
    let records = {
      12345: {
        beverages: [
          {
            beverage: "Orange",
            quantity: 1,
            date: date
          }
        ]
      }
    };
    let actual = getDetailsOfGivenID(records, 25340);
    let expected = [];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("addEmpIdToDetails", function() {
  it("should add emp id to beverage details", function() {
    let date = new Date().toJSON();
    let records = {
      12345: {
        beverages: [
          {
            beverage: "Orange",
            quantity: 1,
            date: date
          }
        ]
      }
    };
    let actual = addEmpIdToDetails(records, 12345);
    let expected = {
      12345: {
        beverages: [
          {
            beverage: "Orange",
            quantity: 1,
            date: date,
            empid: 12345
          }
        ]
      }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should not modify records if empid doesn't exist", function() {
    let records = {};
    let actual = addEmpIdToDetails(records, 12345);
    let expected = {};
    assert.deepStrictEqual(actual, expected);
  });
});
