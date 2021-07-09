import {
  printInfoSmall,
  printBasicSection,
  printChangedRepos,
  printReposStatus
} from "../../../../src/modules/gitStatus/report/printReportSections";
import printTitle from "../../../../src/modules/gitStatus/report/printTitle";
import * as helpers from "../../../../src/helpers";
import { mocked } from "ts-jest/utils";

jest.mock("../../../../src/modules/gitStatus/report/printTitle");
jest.mock("../../../../src/helpers");

const mockedPrintTitle = mocked(printTitle);
const mockedHelpers = mocked(helpers);

let outputData = "";
const storeLog = (inputs: string): string => (outputData += inputs + "\n");
console.log = jest.fn(storeLog);

beforeEach(() => {
  mockedHelpers.strOfSpaces.mockReturnValue("");
});

afterEach(() => {
  outputData = "";
  mockedPrintTitle.mockReset();
  mockedHelpers.findLongestValue.mockReset();
  mockedHelpers.strOfSpaces.mockReset();
});

describe("printInfoSmall", () => {
  test("should print correct title information", () => {
    const obj = { name: "", path: "" };
    const repositories = [obj, obj, obj];
    const projectButNotRepo = [obj, obj, obj, obj];
    const changedRepos = [obj];
    const reposWithoutRemote = [obj, obj];
    printInfoSmall(
      repositories,
      projectButNotRepo,
      changedRepos,
      reposWithoutRemote
    );

    outputData = outputData.trim().replace(/\t+/g, " ");

    expect(outputData).toMatch("Projects found: 7");
    expect(outputData).toMatch("Repositories found: 3");
    expect(outputData).toMatch("Repositories changed: 1");
    expect(outputData).toMatch("Repositories without remote: 2");
    expect(outputData).toMatch("Projects but not repos: 4");
  });
});

describe("printBasicSection", () => {
  test("should not print section if array is empty", () => {
    const repositories = [];

    printBasicSection(repositories, "Test title one", "Repository");

    expect(mockedPrintTitle.mock.calls.length).toBe(0);
    expect(mockedHelpers.findLongestValue.mock.calls.length).toBe(0);
    expect(mockedHelpers.strOfSpaces.mock.calls.length).toBe(0);
    expect(outputData.length).toBe(0);
  });

  test("should print correct repositores information", () => {
    const repositories = [
      { name: "test one", path: "path/one" },
      { name: "test two", path: "path/two" },
      { name: "test three", path: "path/three" }
    ];
    printBasicSection(repositories, "Test title two", "Project");

    outputData = outputData.trim().replace(/\t+/g, " ");

    expect(mockedPrintTitle.mock.calls.length).toBe(1);
    expect(mockedHelpers.findLongestValue.mock.calls.length).toBe(1);
    expect(mockedHelpers.strOfSpaces.mock.calls.length).toBe(4); // Should be 1 + number of repos
    expect(outputData).toMatch("test one| path/one");
    expect(outputData).toMatch("test two| path/two");
    expect(outputData).toMatch("test three| path/three");
  });
});

describe("printChangedRepos", () => {
  test("should not print section if array is empty", () => {
    const changedRepos = [];

    printChangedRepos(changedRepos);

    expect(mockedPrintTitle.mock.calls.length).toBe(0);
    expect(mockedHelpers.findLongestValue.mock.calls.length).toBe(0);
    expect(mockedHelpers.strOfSpaces.mock.calls.length).toBe(0);
    expect(outputData.length).toBe(0);
  });

  test("should print correct repos without remote information", () => {
    const changedRepos = [
      { name: "test one", path: "path/one", changes: [" M README.md"] },
      {
        name: "test two",
        path: "path/two",
        changes: ["?? src/newfile.txt", " M .env"]
      }
    ];
    printChangedRepos(changedRepos);

    outputData = outputData.trim().replace(/\t+/g, " ");

    expect(mockedPrintTitle.mock.calls.length).toBe(1);
    expect(mockedHelpers.findLongestValue.mock.calls.length).toBe(2);
    expect(mockedHelpers.strOfSpaces.mock.calls.length).toBe(8); // Should be 2 + 2 * number of changes total
    expect(outputData).toMatch("test one| path/one|  M README.md");
    expect(outputData).toMatch("test two| path/two| ?? src/newfile.txt");
    expect(outputData).toMatch("|  M .env");
  });
});

describe("printReposStatus", () => {
  test("should print correct repos information", () => {
    const repositories = [
      {
        name: "test one",
        path: "path/one"
      },
      {
        name: "test two",
        path: "path/two"
      },
      {
        name: "test three",
        path: "path/three"
      }
    ];
    const changedRepos = [
      {
        name: "test one",
        path: "path/one",
        changes: [" M README.md", " D pw.txt"]
      },
      {
        name: "test two",
        path: "path/two",
        changes: ["?? src/newfile.txt", " M .env"]
      }
    ];

    printReposStatus(repositories, changedRepos);

    outputData = outputData.trim().replace(/\  +/gm, " ");

    expect(mockedHelpers.findLongestValue.mock.calls.length).toBe(1);

    // strOfSpaces should be called 1 + number of repos
    expect(mockedHelpers.strOfSpaces.mock.calls.length).toBeGreaterThanOrEqual(
      2
    );

    expect(outputData).toMatch("Repository MDU");
    expect(outputData).toMatch("test one 110");
    expect(outputData).toMatch("test two 101");
    expect(outputData).toMatch("test three 000");
  });
});
