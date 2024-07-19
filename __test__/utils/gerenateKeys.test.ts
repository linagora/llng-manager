import axios from "axios";
import { GenerateEcKeys, NewCertificate } from "../../src/utils/generateKey";

jest.mock("axios");

describe("GenerateKeys function", () => {
  it("should make a post request with the provided URL for RSA keys", async () => {
    const mockResponse = {
      data: "key",
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await NewCertificate("RSA");

    expect(axios.post).toHaveBeenCalledWith(
      "/manager.fcgi/confs//newCertificate",
      { password: "RSA" }
    );

    expect(result).toEqual(mockResponse.data);
  });

  it("should make a post request with the provided URL for EC keys", async () => {
    const mockResponse = {
      data: "key",
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await GenerateEcKeys();

    expect(axios.post).toHaveBeenCalledWith("/manager.fcgi/confs//newEcKeys");

    expect(result).toEqual(mockResponse.data);
  });

  it("should throw an error if axios.post fails", async () => {
    const errorMessage = "400";
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(NewCertificate("test")).rejects.toThrow(errorMessage);
  });
});
