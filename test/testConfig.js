const assert = require('chai').assert;
const config = require('../src/config');
const getDataStorePath = config.getDataStorePath;
const getDate = config.getDate;

describe("getDateStorePath", function() {
  it("should give data store path set in the env", function() {
    const actual = getDataStorePath({JUICE_TRANSACTION_DATA_STORE : './juice_transactions.json'});
    const expected = './juice_transactions.json';
    assert.strictEqual(actual, expected);
  });

  it("should give default path if data store path is not set", function() {
    const actual = getDataStorePath({});
    const expected = './transactions.json';
    assert.strictEqual(actual, expected);
  });
});

describe("getDate", function() {
  it("should give date configured in config file", function() {
    const actual = getDate({NOW : '2019-11-30'});
    const expected = new Date('2019-11-30');
    assert.deepStrictEqual(actual, expected);
  });

  it("should give current date if date is not configured", function() {
    const actual = getDate({});
    const expected = new Date();
    assert.deepStrictEqual(actual, expected);
  })
});