import axios from "axios";
import {
  getMetadataConfig,
  getConfig,
} from "../../../src/features/config/configAPI";

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

    expect(axios.get).toHaveBeenCalledWith(
      "http://manager.example.com/confs/14"
    );

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

    expect(axios.get).toHaveBeenCalledWith(
      "http://manager.example.com/manager.fcgi/confs/0?full=1"
    );

    expect(result.data).toEqual(mockResponse.data);
  });

  it("should throw an error if axios.get fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("400"));
    await expect(getConfig(123)).rejects.toThrow("400");
  });
});
