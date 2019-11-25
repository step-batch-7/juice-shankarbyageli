const inputValidation = function(userInput) {
  if(['--save','--query'].includes(userInput[0])) {
    let inputSetup = [["--save",validateSaveOptions],["--query",validateQueryOptions]];
    let validateOptions = getValue(inputSetup, userInput[0]);
    return validateOptions;
    
  }
};