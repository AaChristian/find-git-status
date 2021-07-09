import printReport from "../../src/modules/printReport";
import * as reportSections from "../../src/modules/gitStatus/report/printReportSections";
import { mocked } from "ts-jest/utils";

jest.mock("../../src/modules/gitStatus/report/printReportSections");
const { printInfoSmall, printBasicSection, printChangedRepos } = mocked(reportSections);

describe("printReport", () => {
  test("should call all functions that print the report", () => {
    printReport([], [], [], []);

    expect(printInfoSmall.mock.calls.length).toBe(1);
    expect(printBasicSection.mock.calls.length).toBe(3);
    expect(printChangedRepos.mock.calls.length).toBe(1);
  });
});
