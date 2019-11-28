const assert = require('chai').assert;
const performSaveTransaction = require('../src/transaction.js').performSaveTransaction;
const performQueryTransaction = require('../src/transaction').performQueryTransaction;
const getTransactionResult = require('../src/transaction').getTransactionResult;
const filterByEmpId = require('../src/transaction').filterByEmpId;
const filterByBeverage = require('../src/transaction').filterByBeverage;
const filterByDate = require('../src/transaction').filterByDate;

describe('performSaveTransaction', function() {
  it('should add new Transaction to the non-existing empid', function() {
    let date = new Date();
    let currentData = [];
    let newTransaction = {
      '--empid': 12345,
      '--beverage': 'watermelon',
      '--qty': 1,
    };
    let expected = [
      'Transaction Recorded:',
      'Employee ID, Beverage, Quantity, Date',
      `12345,watermelon,1,${date.toJSON()}`
    ];
    const writer = function() {
      return ;
    }
    let actual = performSaveTransaction(currentData, newTransaction, writer, date);
    assert.deepStrictEqual(actual, expected);
  });
});

describe('performQueryTranasaction', function() {
  it('should return details of given employee in array', function() {
    let date = new Date().toJSON();
    let currentData = [
      {
        empid : 12345,
        beverage: 'Orange',
        quantity: 1,
        date: date
      }
    ];
    let newTransaction = {
      '--empid': 12345
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

describe('filterByEmpId', function() {
  it('should give details of given emp id', function() {
    let date = new Date().toJSON();
    let records = [
      {
        empid : 12345,
        beverage: 'Orange',
        quantity: 1,
        date: date,
      },
      {
        empid : 25340,
        beverage : 'Mango',
        quantity : 1,
        date : date
      }
    ];
    let actual = filterByEmpId(records, 12345);
    let expected = [
      {
        beverage: 'Orange',
        quantity: 1,
        date: date,
        empid: 12345
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it("should not give details of empid if doesn't exist", function() {
    let date = new Date().toJSON();
    let records = [
      {
        empid : 12345,
        beverage: 'Orange',
        quantity: 1,
        date: date
      }
    ];
    let actual = filterByEmpId(records, 25340);
    let expected = [];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('filterByDate', function() {
  it('should filter the records based on the date', function() {
    let date = new Date();
    let records = [
      {
        empid : 12345,
        beverage: 'Orange',
        quantity: 1,
        date: date,
      },
      {
        empid : 25340,
        beverage : 'Mango',
        quantity : 1,
        date : new Date('2019-10-11')
      }
    ];
    const actual = filterByDate(records, date);
    const expected = [
      {
        empid : 12345,
        beverage: 'Orange',
        quantity: 1,
        date: date,
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('filterByBeverage', function() {
  it('should filter the given records based on beverage', function(){
    let date = new Date().toJSON();
    let records = [
      {
        empid : 12345,
        beverage: 'Orange',
        quantity: 1,
        date: date
      },
      {
        empid : 12345,
        beverage: 'Mango',
        quantity: 1,
        date: date
      }
    ];
    let actual = filterByBeverage(records, 'Orange');
    let expected = [
      {
        empid : 12345,
        beverage: 'Orange',
        quantity: 1,
        date: date
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('getTransactionResult', function() {
  it('should handle invalid transaction', function() {
    let input = ['--save','--beverage','orange','--name','ravi'];
    let actual = getTransactionResult(input, {});
    let expected = ['Invalid Options !']
    assert.deepStrictEqual(actual, expected);
  });

  it('should perform given transaction for valid input', function() {
    const helper = {
      isFileExists : function() {
        return;
      },
      writer : function() {
        return;
      },
      date : new Date()
    };
    let input = ['--save','--beverage','orange','--empid','1234','--qty','2'];
    let actual = getTransactionResult(input, helper);
    let expected = [
      'Transaction Recorded:',
      'Employee ID, Beverage, Quantity, Date',
      `1234,orange,2,${helper.date.toJSON()}`
    ];
    assert.deepStrictEqual(actual, expected);
  });
});