import axios from "axios";
import {
  getConfig,
  getMetadataConfig,
  saveConfig,
} from "../../../src/features/config/configAPI";
import { llngConfig } from "../../../src/utils/types";

jest.mock("axios");

describe("getMetadataConfig", () => {
  it("should return metadata configuration", async () => {
    const mockResponse = {
      data: {
        cfgNum: "14",
      },
    };

    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getMetadataConfig(14);

    expect(axios.get).toHaveBeenCalledWith("/confs/14");

    expect(result.data).toEqual(mockResponse.data);
  });

  it("should throw an error if axios.get fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("400"));

    await expect(getMetadataConfig(14)).rejects.toThrow("400");
  });
});

describe("getConfig", () => {
  it("should return configuration", async () => {
    const mockResponse = {
      data: {
        nameConfig: "test",
      },
    };

    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getConfig(0);

    expect(axios.get).toHaveBeenCalledWith("/manager.fcgi/confs/0?full=1");

    expect(result.data).toEqual(mockResponse.data);
  });

  it("should throw an error if axios.get fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("400"));
    await expect(getConfig(123)).rejects.toThrow("400");
  });
});

describe("saveConfig", () => {
  it("should save configuration", async () => {
    const mockConfig = {
      cfgAuthor: "test",
    } as llngConfig;

    const mockResponse = {
      data: {
        message: "Configuration saved successfully",
      },
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await saveConfig(mockConfig);

    expect(axios.post).toHaveBeenCalledWith(
      "/manager.fcgi/confs/raw",
      mockConfig
    );

    expect(result.data).toEqual(mockResponse.data);
  });

  it("should throw an error if axios.post fails", async () => {
    const mockConfig = {
      cfgAuthor: "test",
    } as llngConfig;

    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("400"));
    await expect(saveConfig(mockConfig)).rejects.toThrow("400");
  });
});
