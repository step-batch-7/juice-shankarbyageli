const validateInput = require('../src/inputValidation').validateInput;
const getGroupedArguments = require('../src/inputValidation').getGroupedArguments;
const isValidArgs = require('../src/inputValidation').isValidArgs;
const isValidOptionAndCount = require('../src/inputValidation').isValidOptionAndCount;
const isValidEmpid = require('../src/inputValidation').isValidEmpid;
const isValidQuantity = require('../src/inputValidation').isValidQuantity;
const assert = require('assert');

describe("testIsValidArgs", function() {
  it("should validate cmd Arguments", function() {
    assert.strictEqual(isValidArgs(["--beverage","orange"]), true);
    assert.strictEqual(isValidArgs(["--empid","25a"]), false);
    assert.strictEqual(isValidArgs(["--qty","3"]), true);
    assert.strictEqual(isValidArgs(["--empid","1234"]), true);
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