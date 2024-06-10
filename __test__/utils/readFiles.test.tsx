import { handleChangeFile } from "../../src/utils/readFiles";

describe("handleChangeFile function", () => {
  it("should resolve with file content when a file is selected", async () => {
    const file = new File(["file content"], "test.txt", { type: "text/plain" });
    const event = {
      target: {
        files: [file],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    const result = await handleChangeFile(event);
    expect(result).toBe("file content");
  });

  it("should reject with 'No file selected.' when unable there arent files selected", async () => {
    const event = {
      target: {
        files: [],
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    await expect(handleChangeFile(event)).rejects.toBe("No file selected.");
  });
});
