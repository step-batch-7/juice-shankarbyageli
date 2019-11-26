const isValidInput = require('../src/inputValidation').isValidInput;
const getGroupedArguments = require('../src/inputValidation').getGroupedArguments;
const isValidArgs = require('../src/inputValidation').isValidArgs;
const isValidOptionAndCount = require('../src/inputValidation').isValidOptionAndCount;
const isValidEmpid = require('../src/inputValidation').isValidEmpid;
const isValidQuantity = require('../src/inputValidation').isValidQuantity;
const parseDetails = require('../src/inputValidation').parseDetails;
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
    let actual = isValidInput(input);
    let expected = {isValid : true, transactionDetails : {'--beverage':'orange','--empid':'1234','--qty':'2'}}
    assert.deepStrictEqual(actual, expected);
  });

  it("should validate invalid input", function() {
    let input = ['--check','--empid','1234'];
    let actual = isValidInput(input);
    let expected = {};
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

  it("should not group invalid arguments", function() {
    let args = ['--emp',1234];
    let expected = [];
    let actual = getGroupedArguments(args);
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isValidOptionCount", function() {
  it("should validate option and argument count", function() {
    let args = ['--save','--beverage','orange','--empid','1234','--qty','2'];
    let actual = isValidOptionAndCount(args);
    assert.strictEqual(actual, true);

    args = ['--query','--empid','123','qty','1'];
    actual = isValidOptionAndCount(args);
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

describe("isValidQuantity", function() {
  it("should validate employee id", function() {
    assert.strictEqual(isValidQuantity('1'), true);
    assert.strictEqual(isValidQuantity('-1'), false);
    assert.strictEqual(isValidQuantity('a1'), false);
    assert.strictEqual(isValidQuantity('0'), false);
  });
});