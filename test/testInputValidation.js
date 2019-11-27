const validateInput = require('../src/inputValidation').validateInput;
const getGroupedArguments = require('../src/inputValidation').getGroupedArguments;
const isValidArgs = require('../src/inputValidation').isValidArgs;
const isValidEmpid = require('../src/inputValidation').isValidEmpid;
const isValidQuantity = require('../src/inputValidation').isValidQuantity;
const isValidDate = require('../src/inputValidation').isValidDate;
const parseDetails = require('../src/inputValidation').parseDetails;
const isValidOptions = require('../src/inputValidation').isValidOptions;
const isRequiredArgsAvailable = require('../src/inputValidation').isRequiredArgsAvailable;
const assert = require('assert');

describe("testIsValidArgs", function() {
  it("should validate cmd Arguments", function() {
    assert.strictEqual(isValidArgs(["--beverage","orange"]), true);
    assert.strictEqual(isValidArgs(["--empid","25a"]), false);
    assert.strictEqual(isValidArgs(["--qty","3"]), true);
    assert.strictEqual(isValidArgs(["--empid","1234"]), true);
  });
});

describe("validateInput", function() {
  it("should validate and return arguments object", function() {
    let input = ['--save','--beverage','orange','--empid','1234','--qty','2'];
    let actual = validateInput(input);
    let expected = {isValid : true, details : {'--beverage':'orange','--empid':'1234','--qty':'2'}}
    assert.deepStrictEqual(actual, expected);
  });

  it("should validate invalid input", function() {
    let input = ['--check','--date','2019-12-12'];
    let actual = validateInput(input);
    let expected = {
      isValid: false,
      details: {
        '--date': '2019-12-12'
      }
    }
    assert.deepStrictEqual(actual, expected);
  });
});

describe("testGetGroupedArgs", function() {
  it("should group the given arguments", function() {
    let args = ['--beverage','orange','--empid','1234','--qty','2'];
    let expected = [["--beverage","orange"],["--empid",1234],['--qty',2]];
    let actual = getGroupedArguments(args);
    assert.deepEqual(actual, expected);

    args = ['--empid','123'];
    actual = getGroupedArguments(args);
    expected = [['--empid','123']];
    assert.deepEqual(actual, expected);
  });
});

describe("isValidOptions", function() {
  it("should validate valid input", function() {
    let input = [['--beverage','orange'],['--empid','1234'],['--qty','2']];
    let actual = isValidOptions('--save',input);
    assert.strictEqual(actual, true);
  });

  it("should validate invalid input", function() {
    let input = [['--beverage','orange'],['--qty','2']];
    let actual = isValidOptions('--query',input);
    assert.strictEqual(actual, false);
  })
});

describe("isRequiredArgsAvailable", function() {
  it("should check if required args available for save option", function() {
    let details = {
      '--empid' : 1234,
      '--date' : 2012-12-20
    };
    let actual = isRequiredArgsAvailable('--query',details);
    assert.strictEqual(actual, true);
  });

  it("should check if required args available for save option", function() {
    let details = {
      '--empid' : 1234,
      '--qty' : 2
    };
    let actual = isRequiredArgsAvailable('--save',details);
    assert.strictEqual(actual, false);
  });
});

describe("parseDetails", function() {
  it("should add new key-value pair to existing obj", function() {
    let argument = ["key","value"];
    let actual = parseDetails({}, argument);
    let expected = {key : "value"};
    assert.deepStrictEqual(actual, expected);
  });

  it("should add value to existing key", function() {
    let argument = ["key","newValue"];
    let actual = parseDetails({key : "value"}, argument);
    let expected = {key : "newValue"};
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isValidEmpid", function() {
  it("should validate employee id", function() {
    assert.strictEqual(isValidEmpid('123'), true);
    assert.strictEqual(isValidEmpid('-12'), false);
    assert.strictEqual(isValidEmpid('a123'), false);
    assert.strictEqual(isValidEmpid('12345'), true);
  });
});

describe("isValidDate", function() {
  it("should validate date", function() {
    assert.strictEqual(isValidDate('2012-12-12'), true);
    assert.strictEqual(isValidDate('2010-14-5'), false);
    assert.strictEqual(isValidDate('a123'), false);
    assert.strictEqual(isValidDate('10-10-2012'), true);
  });
});

describe("isValidQuantity", function() {
  it("should validate employee id", function() {
    assert.strictEqual(isValidQuantity('1'), true);
    assert.strictEqual(isValidQuantity('-1'), false);
    assert.strictEqual(isValidQuantity('a1'), false);
    assert.strictEqual(isValidQuantity('0'), false);
  });
});