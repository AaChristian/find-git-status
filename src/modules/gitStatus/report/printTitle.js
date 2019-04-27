/**
 * Print the title/header for a section of the report
 * @param {string} titleText The title of the report section
 * @param {*} found Number of results found for the section
 */
const printTitle = (titleText, found) => {
  const cliLength = process.stdout.columns - 1;

  console.log("=".repeat(cliLength));
  console.log(" ".repeat(cliLength / 2 - titleText.length / 2) + titleText);
  console.log("Found: " + found);
  console.log("=".repeat(cliLength));
};

module.exports = printTitle;