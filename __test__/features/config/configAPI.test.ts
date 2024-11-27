import {
  getConfig,
  getMetadataConfig,
  getPartialConfig,
  saveConfig,
  savePartialConfig,
} from "../../../src/features/config/configAPI";
import { llngConfig } from "../../../src/utils/types";

global.fetch = jest.fn();

describe("API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call getMetadataConfig with 'latest' if no num is passed", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue({}),
    });

    await getMetadataConfig();
    expect(fetch).toHaveBeenCalledWith("/confs/latest");
  });

  it("should call getMetadataConfig with the passed num", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue({}),
    });

    await getMetadataConfig(123);
    expect(fetch).toHaveBeenCalledWith("/confs/123");
  });

  it("should call getConfig with the correct URL", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue({}),
    });

    await getConfig(456);
    expect(fetch).toHaveBeenCalledWith("/manager.fcgi/confs/456?full=1");
  });

  it("should call getPartialConfig with the correct URL", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue({}),
    });

    await getPartialConfig();
    expect(fetch).toHaveBeenCalledWith("/partial");
  });

  it("should call saveConfig with the correct URL and payload", async () => {
    const mockConfig: llngConfig = { cfgAuthor: "test" } as llngConfig;
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue({}),
    });

    await saveConfig(mockConfig);
    expect(fetch).toHaveBeenCalledWith(
      "/manager.fcgi/confs/raw",
      expect.objectContaining({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(mockConfig),
      })
    );
  });

  it("should call savePartialConfig with the correct URL and payload", async () => {
    const mockConfig: llngConfig = { cfgAuthor: "test" } as llngConfig;

    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue({}),
    });

    await savePartialConfig(mockConfig);
    expect(fetch).toHaveBeenCalledWith(
      "/partial/raw",
      expect.objectContaining({
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(mockConfig),
      })
    );
  });

  it("should throw an error if getMetadataConfig fails", async () => {
    const error = new Error("Fetch failed");
    (fetch as jest.Mock).mockRejectedValueOnce(error);

    await expect(getMetadataConfig(123)).rejects.toThrowError("Fetch failed");
  });

  it("should throw an error if getConfig fails", async () => {
    const error = new Error("Fetch failed");
    (fetch as jest.Mock).mockRejectedValueOnce(error);

    await expect(getConfig(456)).rejects.toThrowError("Fetch failed");
  });

  it("should throw an error if getPartialConfig fails", async () => {
    const error = new Error("Fetch failed");
    (fetch as jest.Mock).mockRejectedValueOnce(error);

    await expect(getPartialConfig()).rejects.toThrowError("Fetch failed");
  });

  it("should throw an error if saveConfig fails", async () => {
    const mockConfig: llngConfig = { cfgAuthor: "test" } as llngConfig;

    const error = new Error("Fetch failed");
    (fetch as jest.Mock).mockRejectedValueOnce(error);

    await expect(saveConfig(mockConfig)).rejects.toThrowError("Fetch failed");
  });

  it("should throw an error if savePartialConfig fails", async () => {
    const mockConfig: llngConfig = { cfgAuthor: "test" } as llngConfig;

    const error = new Error("Fetch failed");
    (fetch as jest.Mock).mockRejectedValueOnce(error);

    await expect(savePartialConfig(mockConfig)).rejects.toThrowError(
      "Fetch failed"
    );
  });
});
