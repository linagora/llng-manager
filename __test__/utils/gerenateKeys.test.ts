import axios from "axios";
import { GenerateKeys } from "../../src/utils/generateKey";

jest.mock("axios");

describe("GenerateKeys function", () => {
  it("should make a post request with the provided URL for RSA keys", async () => {
    const mockResponse = {
      data: "key",
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await GenerateKeys("RSA");

    expect(axios.post).toHaveBeenCalledWith("/manager.fcgi/confs//newRSAKey");

    expect(result).toEqual(mockResponse.data);
  });

  it("should make a post request with the provided URL for EC keys", async () => {
    const mockResponse = {
      data: "key",
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await GenerateKeys("EC");

    expect(axios.post).toHaveBeenCalledWith("/manager.fcgi/confs//newEcKeys");

    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error if axios.post fails", async () => {
    const errorMessage = "400";
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(GenerateKeys("RSA")).rejects.toThrow(errorMessage);
  });
});
