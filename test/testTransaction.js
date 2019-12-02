const assert = require('chai').assert;
const { performSaveTransaction,
  performQueryTransaction,
  getTransactionResult,
  getFilteredRecords 
} = require('../src/transaction');

describe('performSaveTransaction', function() {
  it('should add new Transaction to the non-existing empid', function() {
    const date = new Date();
    const currentData = [];
    const newTransaction = {
      '--empid': 12345,
      '--beverage': 'watermelon',
      '--qty': 1,
    };
    const expected = [
      'Transaction Recorded:',
      'Employee ID, Beverage, Quantity, Date',
      `12345,watermelon,1,${date.toJSON()}`
    ];
    const writer = function() {
      return ;
    }
    const actual = performSaveTransaction(currentData, newTransaction, writer, 'path', date);
    assert.deepStrictEqual(actual, expected);
  });
});

describe('performQueryTranasaction', function() {
  it('should return details of given employee in array', function() {
    const date = new Date().toJSON();
    const currentData = [
      {
        empid : 12345,
        beverage: 'Orange',
        quantity: 1,
        date: date
      }
    ];
    const newTransaction = {
      '--empid': 12345
    };
    const actual = performQueryTransaction(currentData, newTransaction);
    const expected = [
      'Employee ID, Beverage, Quantity, Date',
      `12345,Orange,1,${date}`,
      'Total : 1 Juice'
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('getFilteredRecords', function() {
  it('should give details of given emp id', function() {
    const date = new Date().toJSON();
    const records = [
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
    const actual = getFilteredRecords(records, {empid : 12345});
    const expected = [
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
    const date = new Date().toJSON();
    const records = [
      {
        empid : 12345,
        beverage: 'Orange',
        quantity: 1,
        date: date
      }
    ];
    const actual = getFilteredRecords(records, {empid : 25340});
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });

  it('should filter the records based on the date', function() {
    const date = new Date();
    const records = [
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
    const actual = getFilteredRecords(records, {date : date});
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

  it('should filter the given records based on beverage', function(){
    const date = new Date().toJSON();
    const records = [
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
    const actual = getFilteredRecords(records, {beverage : 'Orange'});
    const expected = [
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
    const input = ['--save','--beverage','orange','--name','ravi'];
    const actual = getTransactionResult(input, {});
    const expected = ['Invalid Options !']
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
    const input = ['--save','--beverage','orange','--empid','1234','--qty','2'];
    const actual = getTransactionResult(input, helper);
    const expected = [
      'Transaction Recorded:',
      'Employee ID, Beverage, Quantity, Date',
      `1234,orange,2,${helper.date.toJSON()}`
    ];
    assert.deepStrictEqual(actual, expected);
  });
});