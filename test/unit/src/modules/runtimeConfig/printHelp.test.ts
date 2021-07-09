import { mocked } from "ts-jest/utils";
import * as helpers from "../../../../../src/helpers";
import { printHelp } from "../../../../../src/modules/runtimeConfig";

jest.mock("../../../../../src/helpers");
const mockedHelpers = mocked(helpers);

let outputData: any[] | string = '';
const storeLog = inputs => (outputData += inputs + "\n");
console.log = jest.fn(storeLog);

afterEach(() => {
  outputData = [];
  mockedHelpers.lengthOfLongestOptionsList.mockReset();
  mockedHelpers.strOfSpaces.mockReset();
});

describe("printHelp", () => {
  test("should print out help information", () => {
    const options = {
      test: { valid: ["-t", "--test"], description: "Test" },
      test2: { valid: ["-t2", "--test-2"], description: "Test 2" }
    };

    mockedHelpers.lengthOfLongestOptionsList.mockReturnValue(13);
    mockedHelpers.strOfSpaces.mockReturnValueOnce("    ").mockReturnValueOnce(" ");

    printHelp(options);

    expect(mockedHelpers.lengthOfLongestOptionsList.mock.calls.length).toBe(1);
    expect(mockedHelpers.strOfSpaces.mock.calls.length).toBe(2);
    expect(outputData).toMatch("  -t, --test      Test");
    expect(outputData).toMatch("  -t2, --test-2   Test 2");
  });
});
