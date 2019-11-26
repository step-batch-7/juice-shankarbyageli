const validateInput = function(userInput) {
  let transaction = {};
  let groupedArgs = getGroupedArguments(userInput.slice(1));
  transaction.isValid = (groupedArgs != 0);
  transaction.isValid = ["--save","--query"].includes(userInput[0]);
  transaction.details = groupedArgs.reduce(parseDetails, {});
  return transaction;
};

const parseDetails = function(details, argument) {
  let option = argument[0];
  details[option] = argument[1];
  return details;
};

const isValidBeverage = function(beverage) {
  return true;
};

const isValidEmpid = function(empid) {
  let id = Number(empid);
  return id > 0;
};

const isValidQuantity = function(qty) {
  let quantity = Number(qty);
  return quantity > 0;
};

const isValidDate = function(date) {
  date = new Date(date);
  return date != 'Invalid Date';
};

const isValidArgs = function(cmdArg) {
  let option = cmdArg[0];
  let value = cmdArg[1];
  const options = {
    "--beverage" : isValidBeverage,
    "--empid" : isValidEmpid,
    "--qty" : isValidQuantity,
    "--date" : isValidDate
  };
  
  if(["--beverage", "--empid", "--qty", "--date"].includes(option)) {
    return options[option](value);
  }
};

const getGroupedArguments = function(cmdArgs) {
  let cmdGroups = [];
  for(let index = 0;index < cmdArgs.length; index += 2) {
    cmdGroups.push(cmdArgs.slice(index, index + 2));
  }
  if(cmdGroups.every(isValidArgs)) {
    return cmdGroups;
  }
  return [];
};

exports.validateInput = validateInput;
exports.getGroupedArguments = getGroupedArguments;
exports.isValidArgs = isValidArgs;
exports.isValidEmpid = isValidEmpid;
exports.isValidQuantity = isValidQuantity;
exports.isValidDate = isValidDate;
exports.parseDetails = parseDetails;