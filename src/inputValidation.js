const isValidInput = function(userInput) {
  let getValidInput = {};
  if(isValidOptionAndCount(userInput)) {
    let options = {
      '--save' : ['--beverage','--empid','--qty'],
      '--query' : ['--empid']
    };
    let groupedArgs = getGroupedArguments(userInput.slice(1));
    getValidInput.transactionDetails = groupedArgs.reduce(parseDetails, {});
    getValidInput.isValid = options[userInput[0]].every(function(option) {
      return Object.keys(getValidInput.transactionDetails).includes(option);
    });
    return getValidInput;
  }
  return getValidInput;
};

const parseDetails = function(details, argument) {
  let option = argument[0];
  details[option] = argument[1];
  return details;
};

const isValidOptionAndCount = function(inputArgs) {
  let option = inputArgs[0];
  let noOfArgs = inputArgs.length;
  let argsCount = {
    '--save' : 7,
    '--query' : 3
  };
  return Object.keys(argsCount).includes(option) && noOfArgs == argsCount[option];
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

const isValidArgs = function(cmdArg) {
  let option = cmdArg[0];
  let value = cmdArg[1];
  const options = {
    "--beverage" : isValidBeverage,
    "--empid" : isValidEmpid,
    "--qty" : isValidQuantity
  };
  
  if(["--beverage", "--empid", "--qty"].includes(option)) {
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

exports.isValidInput = isValidInput;
exports.getGroupedArguments = getGroupedArguments;
exports.isValidOptionAndCount = isValidOptionAndCount;
exports.isValidArgs = isValidArgs;
exports.isValidEmpid = isValidEmpid;
exports.isValidQuantity = isValidQuantity;
exports.parseDetails = parseDetails;