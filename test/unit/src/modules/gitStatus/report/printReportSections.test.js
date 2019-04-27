const {
  printInfoSmall,
  printBasicSection,
  printChangedRepos
} = require("../../../../../../src/modules/gitStatus/report/printReportSections");
const printTitle = require("../../../../../../src/modules/gitStatus/report/printTitle");
const helpers = require("../../../../../../src/helpers");

jest.mock("../../../../../../src/modules/gitStatus/report/printTitle");
jest.mock("../../../../../../src/helpers");

let outputData = "";
storeLog = inputs => (outputData += inputs + "\n");
console.log = jest.fn(storeLog);

beforeEach(() => {
  helpers.strOfSpaces.mockReturnValue("");
});

afterEach(() => {
  outputData = [];
  printTitle.mockReset();
  helpers.findLongestValue.mockReset();
  helpers.strOfSpaces.mockReset();
});

describe("printInfoSmall", () => {
  test("should print correct title information", () => {
    const repositories = [{}, {}, {}];
    const projectButNotRepo = [{}, {}, {}, {}];
    const outdatedRepos = [{}];
    const reposWithoutRemote = [{}, {}];
    printInfoSmall(
      repositories,
      projectButNotRepo,
      outdatedRepos,
      reposWithoutRemote
    );

    outputData = outputData.trim().replace(/\t+/g, " ");

    expect(outputData).toMatch("Projects found: 7");
    expect(outputData).toMatch("Repositories found: 3");
    expect(outputData).toMatch("Repositories outdated: 1");
    expect(outputData).toMatch("Repositories without remote: 2");
    expect(outputData).toMatch("Projects but not repos: 4");
  });
});

describe("printBasicSection", () => {
  test("should not print section if array is empty", () => {
    const repositories = [];

    printBasicSection(repositories, "Test title one", "Repository");

    expect(printTitle.mock.calls.length).toBe(0);
    expect(helpers.findLongestValue.mock.calls.length).toBe(0);
    expect(helpers.strOfSpaces.mock.calls.length).toBe(0);
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

    expect(printTitle.mock.calls.length).toBe(1);
    expect(helpers.findLongestValue.mock.calls.length).toBe(1);
    expect(helpers.strOfSpaces.mock.calls.length).toBe(4); // Should be 1 + number of repos
    expect(outputData).toMatch("test one| path/one");
    expect(outputData).toMatch("test two| path/two");
    expect(outputData).toMatch("test three| path/three");
  });
});

describe("printChangedRepos", () => {
  test("should not print section if array is empty", () => {
    const outdatedRepos = [];

    printChangedRepos(outdatedRepos);

    expect(printTitle.mock.calls.length).toBe(0);
    expect(helpers.findLongestValue.mock.calls.length).toBe(0);
    expect(helpers.strOfSpaces.mock.calls.length).toBe(0);
    expect(outputData.length).toBe(0);
  });

  test("should print correct repos without remote information", () => {
    const outdatedRepos = [
      { name: "test one", path: "path/one", changes: [" M README.md"] },
      {
        name: "test two",
        path: "path/two",
        changes: ["?? src/newfile.txt", " M .env"]
      }
    ];
    printChangedRepos(outdatedRepos);

    outputData = outputData.trim().replace(/\t+/g, " ");

    expect(printTitle.mock.calls.length).toBe(1);
    expect(helpers.findLongestValue.mock.calls.length).toBe(2);
    expect(helpers.strOfSpaces.mock.calls.length).toBe(8); // Should be 2 + 2 * number of changes total
    expect(outputData).toMatch("test one| path/one|  M README.md");
    expect(outputData).toMatch("test two| path/two| ?? src/newfile.txt");
    expect(outputData).toMatch("|  M .env");
  });
});
