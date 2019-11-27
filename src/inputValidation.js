const validateInput = function(userInput) {
  let transaction = {};
  let option = userInput[0];
  let groupedArgs = getGroupedArguments(userInput.slice(1));
  transaction.details = groupedArgs.reduce(parseDetails, {});
  transaction.isValid = isValidOptions(option, groupedArgs) && isRequiredArgsAvailable(option, transaction.details);
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
  return options[option](value);
};

const getGroupedArguments = function(cmdArgs) {
  let groupedArgs = [];
  for(let index = 0;index < cmdArgs.length; index += 2) {
    groupedArgs.push(cmdArgs.slice(index, index + 2));
  }
  return groupedArgs;
};

const isValidOptions = function(option, groupedArgs) {
  let validOptions = {
    '--save' : ['--beverage','--empid','--qty'],
    '--query' : ['--empid','--date']
  };
  if(Object.keys(validOptions).includes(option)) {
    return groupedArgs.every(function(argument) {
      let userOption = argument[0];
      return validOptions[option].includes(userOption) && isValidArgs(argument);
    })
  }
  return false;
};

const isRequiredArgsAvailable = function(option, details) {
  let validOptions = {
    '--save' : ['--beverage','--empid','--qty'],
    '--query' : ['--empid','--date']
  };
  let isArgsAvailable = false;
  if(option === '--save') {
    isArgsAvailable = validOptions[option].every(function(userOption) {
      return Object.keys(details).includes(userOption);
    })
  }
  if(option === '--query') {    
    isArgsAvailable = validOptions[option].some(function(userOption) {
      return Object.keys(details).includes(userOption);
    })
  }
  return isArgsAvailable;
}

exports.validateInput = validateInput;
exports.getGroupedArguments = getGroupedArguments;
exports.isValidArgs = isValidArgs;
exports.isValidEmpid = isValidEmpid;
exports.isValidQuantity = isValidQuantity;
exports.isValidDate = isValidDate;
exports.parseDetails = parseDetails;
exports.isValidOptions = isValidOptions;
exports.isRequiredArgsAvailable = isRequiredArgsAvailable;