const getGroupedArguments = require('../src/inputValidation').getGroupedArguments;
const isValidArgs = require('../src/inputValidation').isValidArgs;
const parseTransactionDetails = require('../src/inputValidation').parseTransactionDetails;
const parseInput = require('../src/inputValidation').parseInput;
const isValidOptions = require('../src/inputValidation').isValidOptions;
const isRequiredArgsAvailable = require('../src/inputValidation').isRequiredArgsAvailable;
const assert = require('assert');

describe("isValidArgs", function() {
  it("should validate cmd Arguments with beverage option", function() {
    assert.strictEqual(isValidArgs(["--beverage","orange"]), true);
  });

  it("should validate cmd Arguments with empid option", function() {
    assert.strictEqual(isValidArgs(["--empid","25a"]), false);
    assert.strictEqual(isValidArgs(["--empid","25340"]), true);
  });

  it("should validate cmd Arguments with quantity option", function() {
    assert.strictEqual(isValidArgs(["--qty","3"]), true);
    assert.strictEqual(isValidArgs(["--qty","x"]), false);
  });

  it("should validate cmd Arguments with date option", function() {
    assert.strictEqual(isValidArgs(["--date","2019-11-27"]), true);
    assert.strictEqual(isValidArgs(["--date","2019-15-27"]), false);
  });
});

describe("parseInput", function() {
  it("should validate and return arguments object", function() {
    let input = ['--save','--beverage','orange','--empid','1234','--qty','2'];
    let actual = parseInput(input);
    let expected = {isValid : true, 
      transactionDetails : {'--beverage':'orange','--empid':'1234','--qty':'2'}
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should validate invalid input", function() {
    let input = ['--check','--date','2019-12-12'];
    let actual = parseInput(input);
    let expected = {
      isValid: false,
      transactionDetails: {
        '--date': '2019-12-12'
      }
    }
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isValidOptions", function() {
  it("should validate valid input", function() {
    let validOptions = {
      '--save' : ['--beverage','--empid','--qty'],
      '--query' : ['--empid','--date']
    };
    let input = [['--beverage','orange'],['--empid','1234'],['--qty','2']];
    let actual = isValidOptions('--save', input, validOptions);
    assert.strictEqual(actual, true);
  });

  it("should validate invalid input", function() {
    let validOptions = {
      '--save' : ['--beverage','--empid','--qty'],
      '--query' : ['--empid','--date']
    };
    let input = [['--beverage','orange'],['--qty','2']];
    let actual = isValidOptions('--query', input, validOptions);
    assert.strictEqual(actual, false);
  })
});

describe("isRequiredArgsAvailable", function() {
  it("should check if required args available for save option", function() {
    let validOptions = {
      '--save' : ['--beverage','--empid','--qty'],
      '--query' : ['--empid','--date']
    };
    let details = {
      '--empid' : 1234,
      '--date' : 2012-12-20
    };
    let actual = isRequiredArgsAvailable('--query', details, validOptions);
    assert.strictEqual(actual, true);
  });

  it("should check if required args available for save option", function() {
    let validOptions = {
      '--save' : ['--beverage','--empid','--qty'],
      '--query' : ['--empid','--date']
    };
    let details = {
      '--empid' : 1234,
      '--qty' : 2
    };
    let actual = isRequiredArgsAvailable('--save', details, validOptions);
    assert.strictEqual(actual, false);
  });
});

describe("parseTransactionDetails", function() {
  it("should add new key-value pair to existing obj", function() {
    let argument = ["key","value"];
    let actual = parseTransactionDetails(argument);
    let expected = {key : "value"};
    assert.deepStrictEqual(actual, expected);
  });

  it("should add value to existing key", function() {
    let argument = ["key","newValue"];
    let actual = parseTransactionDetails(argument);
    let expected = {key : "newValue"};
    assert.deepStrictEqual(actual, expected);
  });
});