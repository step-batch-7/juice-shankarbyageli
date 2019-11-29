const parseInput = function(userInput) {
  const option = userInput[0];
  const validOptions = {
    '--save' : ['--beverage','--empid','--qty'],
    '--query' : ['--empid','--date','--beverage']
  };
  const transactionDetails = parseTransactionDetails(userInput.slice(1));
  const isValid = isValidOptions(option, Object.entries(transactionDetails), validOptions) && 
    isRequiredArgsAvailable(option, transactionDetails, validOptions);
  return {isValid, transactionDetails};
};

const parseTransactionDetails = function(cmdArgs) {
  const groupedArgs = {};
  for(let index = 0;index < cmdArgs.length; index += 2) {
    groupedArgs[cmdArgs[index]] = cmdArgs[index + 1];
  }
  return groupedArgs;
};

const isValidBeverage = function(beverage) {
  return beverage.length > 0;
};

const isPositiveInt = function(value) {
  return Number(value) > 0;
};

const isValidDate = function(date) {
  const dateFormat = new RegExp('[0-9]{3,}-[0-1]{0,1}[0-9]{0,1}-[0-3]{0,1}[0-9]{1,1}');
  const dateObj = new Date(date);
  return dateObj != 'Invalid Date' && dateFormat.test(date);
};

const isValidArgs = function(cmdArg) {
  const option = cmdArg[0];
  const value = cmdArg[1];
  const options = {
    '--beverage' : isValidBeverage,
    '--empid' : isPositiveInt,
    '--qty' : isPositiveInt,
    '--date' : isValidDate
  };
  return options[option](value);
};

const isValidOptions = function(option, groupedArgs, validOptions) {
  if(Object.keys(validOptions).includes(option)) {
    return groupedArgs.every(function(argument) {
      const userOption = argument[0];
      return validOptions[option].includes(userOption) && isValidArgs(argument);
    })
  }
  return false;
};

const isRequiredArgsAvailable = function(option, details) {
  const requiredOptions = {
    '--save' : details['--empid'] && details['--beverage'] && details['--qty'],
    '--query' : details['--empid'] || details['--beverage'] || details['--date']
  };
  return !!requiredOptions[option];
};

exports.parseInput = parseInput;
exports.isValidArgs = isValidArgs;
exports.parseTransactionDetails = parseTransactionDetails;
exports.isValidOptions = isValidOptions;
exports.isRequiredArgsAvailable = isRequiredArgsAvailable;