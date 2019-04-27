const printReport = require("../../../../src/modules/printReport");
const reportSections = require("../../../../src/modules/gitStatus/report/printReportSections");

jest.mock("../../../../src/modules/gitStatus/report/printReportSections");

describe("printReport", () => {
  test("should call all functions that print the report", () => {
    printReport([], [], [], []);

    expect(reportSections.printInfoSmall.mock.calls.length).toBe(1);
    expect(reportSections.printRepos.mock.calls.length).toBe(1);
    expect(reportSections.printChangedRepos.mock.calls.length).toBe(1);
    expect(reportSections.printReposWithoutRemote.mock.calls.length).toBe(1);
    expect(reportSections.printProjectsNotRepos.mock.calls.length).toBe(1);
  });
});
