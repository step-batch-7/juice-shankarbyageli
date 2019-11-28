const parseInput = function(userInput) {
  let option = userInput[0];
  let validOptions = {
    '--save' : ['--beverage','--empid','--qty'],
    '--query' : ['--empid','--date','--beverage']
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
  let dateFormat = new RegExp('[0-9]{3,}-[0-1]{0,1}[0-9]{0,1}-[0-3]{0,1}[0-9]{1,1}');
  let dateObj = new Date(date);
  return dateObj != 'Invalid Date' && dateFormat.test(date);
};

const isValidArgs = function(cmdArg) {
  let option = cmdArg[0];
  let value = cmdArg[1];
  const options = {
    '--beverage' : isValidBeverage,
    '--empid' : isValidEmpid,
    '--qty' : isValidQuantity,
    '--date' : isValidDate
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
    '--save' : validOptions['--save'].every(isOptionExists(details)),
    '--query' : validOptions['--query'].some(isOptionExists(details))
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