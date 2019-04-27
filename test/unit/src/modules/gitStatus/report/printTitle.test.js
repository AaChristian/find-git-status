const printTitle = require("../../../../../../src/modules/gitStatus/report/printTitle");

let outputData = "";
storeLog = inputs => (outputData += inputs + "\n");
console.log = jest.fn(storeLog);

afterEach(() => {
  outputData = [];
});

describe("printTitle", () => {
  test("should print correct title information", () => {
    const title = "Test Title";
    printTitle(title, 3);
    expect(outputData).toMatch(title);
    expect(outputData).toMatch("Found: 3");
  });
});
