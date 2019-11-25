const validateInput = function(userInput) {
  return ["--save", "--query"].includes(userInput[0]);
};

exports.validateInput = validateInput;