const { printHelp } = require("../../../../../src/modules/runtimeConfig");
const helpers = require("../../../../../src/helpers");

jest.mock("../../../../../src/helpers");

let outputData = "";
storeLog = inputs => (outputData += inputs + "\n");
console.log = jest.fn(storeLog);

afterEach(() => {
  outputData = [];
  helpers.lengthOfLongestOptionsList.mockReset();
  helpers.strOfSpaces.mockReset();
});

describe("printHelp", () => {
  test("should print out help information", () => {
    const options = {
      test: { valid: ["-t", "--test"], description: "Test" },
      test2: { valid: ["-t2", "--test-2"], description: "Test 2" }
    };

    helpers.lengthOfLongestOptionsList.mockReturnValue(13);
    helpers.strOfSpaces.mockReturnValueOnce("    ").mockReturnValueOnce(" ");

    printHelp(options);

    expect(helpers.lengthOfLongestOptionsList.mock.calls.length).toBe(1);
    expect(helpers.strOfSpaces.mock.calls.length).toBe(2);
    expect(outputData).toMatch("  -t, --test      Test");
    expect(outputData).toMatch("  -t2, --test-2   Test 2");
  });
});
