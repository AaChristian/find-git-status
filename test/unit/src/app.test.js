const start = require("../../../src/app");
const findAllProjects = require("../../../src/modules/findGitProjects");
const runtimeConfig = require(".../../../src/modules/manageArguments");

jest.mock("../../../src/modules/findGitProjects");
jest.mock("../../../src/modules/manageArguments");

beforeEach(() => {
  // Reset mock so that mockResolvedValueOnce works correctly
  findAllProjects.mockReset();
  runtimeConfig.isFirstRealArgumentSet.mockReset();
  runtimeConfig.processArguments.mockReset();
});

describe("start", () => {
  test("should call isFirstRealArgumentSet 2 times", () => {
    process.argv = ["cmd", "test"];

    runtimeConfig.isFirstRealArgumentSet.mockReturnValue(false);
    findAllProjects.mockResolvedValue();

    return start().then(() => {
      expect(runtimeConfig.isFirstRealArgumentSet.mock.calls.length).toBe(2);
    });
  });

  test("should initiate findAllProjects module", () => {
    process.argv = ["cmd", "test", ""];

    runtimeConfig.isFirstRealArgumentSet.mockReturnValue(false);
    findAllProjects.mockResolvedValue();

    return start().then(() => {
      expect(findAllProjects.mock.calls.length).toBe(1);
      expect(runtimeConfig.processArguments.mock.calls.length).toBe(0);
    });
  });

  test("should initiate processArguments", () => {
    process.argv = ["cmd", "test", "--testArg"];

    runtimeConfig.isFirstRealArgumentSet.mockReturnValue(true);
    runtimeConfig.processArguments.mockReturnValue();

    return start().then(() => {
      expect(findAllProjects.mock.calls.length).toBe(0);
      expect(runtimeConfig.processArguments.mock.calls.length).toBe(1);
    });
  });
});
