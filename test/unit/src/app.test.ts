import start from "../../../src/app";
import * as findGitProjects from "../../../src/modules/findGitProjects";
import * as runtimeConfig from ".../../../src/modules/manageArguments";
import { mocked } from "ts-jest/utils";

jest.mock("../../../src/modules/findGitProjects");
jest.mock("../../../src/modules/manageArguments");
const { findAllProjects } = mocked(findGitProjects);
const runtimeConfigMock = mocked(runtimeConfig);

beforeEach(() => {
  // Reset mock so that mockResolvedValueOnce works correctly
  findAllProjects.mockReset();
  runtimeConfigMock.isFirstRealArgumentSet.mockReset();
  runtimeConfigMock.processArguments.mockReset();
});

describe("start", () => {
  test("should call isFirstRealArgumentSet 2 times", () => {
    process.argv = ["cmd", "test"];

    runtimeConfigMock.isFirstRealArgumentSet.mockReturnValue(false);
    findAllProjects.mockResolvedValue();

    return start().then(() => {
      expect(runtimeConfigMock.isFirstRealArgumentSet.mock.calls.length).toBe(2);
    });
  });

  test("should initiate findAllProjects module", () => {
    process.argv = ["cmd", "test", ""];

    runtimeConfigMock.isFirstRealArgumentSet.mockReturnValue(false);
    findAllProjects.mockResolvedValue();

    return start().then(() => {
      expect(findAllProjects.mock.calls.length).toBe(1);
      expect(runtimeConfigMock.processArguments.mock.calls.length).toBe(0);
    });
  });

  test("should initiate processArguments", () => {
    process.argv = ["cmd", "test", "--testArg"];

    runtimeConfigMock.isFirstRealArgumentSet.mockReturnValue(true);
    runtimeConfigMock.processArguments.mockResolvedValue();

    return start().then(() => {
      expect(findAllProjects.mock.calls.length).toBe(0);
      expect(runtimeConfigMock.processArguments.mock.calls.length).toBe(1);
    });
  });
});
