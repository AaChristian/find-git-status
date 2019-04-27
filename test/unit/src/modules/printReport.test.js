const printReport = require("../../../../src/modules/printReport");
const report = require("../../../../src/modules/gitStatus/report");

jest.mock("../../../../src/modules/gitStatus/report");

describe("printReport", () => {
  test("should call all functions that print the report", () => {
    printReport([], [], [], []);

    expect(report.printInfoSmall.mock.calls.length).toBe(1);
    expect(report.printRepos.mock.calls.length).toBe(1);
    expect(report.printChangedRepos.mock.calls.length).toBe(1);
    expect(report.printReposWithoutRemote.mock.calls.length).toBe(1);
    expect(report.printProjectsNotRepos.mock.calls.length).toBe(1);
  });
});
