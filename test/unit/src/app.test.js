const start = require("../../../src/app");
const gitStatus = require("../../../src/modules/findGitStatus");
const runtimeConfig = require(".../../../src/modules/manageArguments");

jest.mock("../../../src/modules/findGitStatus");
jest.mock("../../../src/modules/manageArguments");

beforeEach(() => {
  // Reset mock so that mockResolvedValueOnce works correctly
  gitStatus.mockReset();
  runtimeConfig.isFirstRealArgumentSet.mockReset();
  runtimeConfig.processArguments.mockReset();
});

describe("start", () => {
  test("should call isFirstRealArgumentSet 2 times", () => {
    process.argv = ["cmd", "test"];

    runtimeConfig.isFirstRealArgumentSet.mockReturnValue(false);
    gitStatus.mockResolvedValue();

    return start().then(() => {
      expect(runtimeConfig.isFirstRealArgumentSet.mock.calls.length).toBe(2);
    });
  });

  test("should initiate gitStatus module", () => {
    process.argv = ["cmd", "test", ""];

    runtimeConfig.isFirstRealArgumentSet.mockReturnValue(false);
    gitStatus.mockResolvedValue();

    return start().then(() => {
      expect(gitStatus.mock.calls.length).toBe(1);
      expect(runtimeConfig.processArguments.mock.calls.length).toBe(0);
    });
  });

  test("should initiate processArguments", () => {
    process.argv = ["cmd", "test", "--testArg"];

    runtimeConfig.isFirstRealArgumentSet.mockReturnValue(true);
    runtimeConfig.processArguments.mockReturnValue();

    return start().then(() => {
      expect(gitStatus.mock.calls.length).toBe(0);
      expect(runtimeConfig.processArguments.mock.calls.length).toBe(1);
    });
  });
});
