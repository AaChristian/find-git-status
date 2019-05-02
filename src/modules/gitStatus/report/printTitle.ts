/**
 * Print the title/header for a section of the report
 * @param {string} titleText The title of the report section
 * @param {number} found Number of results found for the section
 */
const printTitle = (titleText: string, found: number): void => {
  const cliLength = process.stdout.columns - 1;

  console.log("=".repeat(cliLength));
  console.log(" ".repeat(cliLength / 2 - titleText.length / 2) + titleText);
  console.log("Found: " + found);
  console.log("=".repeat(cliLength));
};

export default printTitle;
