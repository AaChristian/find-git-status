const { lengthOfLongestOptionsList, strOfSpaces } = require("../../helpers");
/**
 * Print out help for the program, specifically which arguments are available
 * @param {object} options
 */
const printHelp = options => {
  const argumentsSeperator = ", ";
  const lengthOfLongestArgList = lengthOfLongestOptionsList(
    options,
    argumentsSeperator
  );
  console.log(`Options:`);
  Object.keys(options).forEach(key => {
    const obj = options[key];
    const argsString = obj.valid.join(argumentsSeperator);
    const tab = strOfSpaces(argsString, lengthOfLongestArgList);
    console.log(`  ${argsString}${tab}  ${obj.description}`);
  });
};

module.exports = printHelp;
