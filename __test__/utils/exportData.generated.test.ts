import { exportData } from "../../src/utils/exportData";

jest.mock("axios");

describe("exportData", () => {
  it("should expose a function", () => {
    expect(exportData).toBeDefined();
  });

  it("exportData should return expected output", async () => {
    // const retValue = await exportData(data,num);
    expect(false).toBeTruthy();
  });
});
