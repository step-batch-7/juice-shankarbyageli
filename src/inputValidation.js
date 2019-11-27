const parseInput = function(userInput) {
  let option = userInput[0];
  let validOptions = {
    '--save' : ['--beverage','--empid','--qty'],
    '--query' : ['--empid','--date']
  };
  let transactionDetails = parseTransactionDetails(userInput.slice(1));
  let isValid = isValidOptions(option, Object.entries(transactionDetails), validOptions) && 
    isRequiredArgsAvailable(option, transactionDetails, validOptions);
  return {isValid, transactionDetails};
};

const parseTransactionDetails = function(cmdArgs) {
  let groupedArgs = {};
  for(let index = 0;index < cmdArgs.length; index += 2) {
    groupedArgs[cmdArgs[index]] = cmdArgs[index + 1];
  }
  return groupedArgs;
};

const isValidBeverage = function(beverage) {
  return beverage.length > 0;
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
  return options[option](value);
};

const isValidOptions = function(option, groupedArgs, validOptions) {
  if(Object.keys(validOptions).includes(option)) {
    return groupedArgs.every(function(argument) {
      let userOption = argument[0];
      return validOptions[option].includes(userOption) && isValidArgs(argument);
    })
  }
  return false;
};

const isRequiredArgsAvailable = function(option, details, validOptions) {
  let requiredOptions = {
    '--save' : validOptions[option].every(isOptionExists(details)),
    '--query' : validOptions[option].some(isOptionExists(details))
  };
  return requiredOptions[option];
};

const isOptionExists = function(details) {
  return function(userOption) {
    return Object.keys(details).includes(userOption);
  }
};

exports.parseInput = parseInput;
exports.isValidArgs = isValidArgs;
exports.parseTransactionDetails = parseTransactionDetails;
exports.isValidOptions = isValidOptions;
exports.isRequiredArgsAvailable = isRequiredArgsAvailable;