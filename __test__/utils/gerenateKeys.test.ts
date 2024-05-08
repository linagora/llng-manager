import { GenerateKeys } from "../../src/utils/generateKey";
import axios from "axios";

jest.mock("axios");
it("should make a post request with the provided URL", async () => {
  const mockResponse = {
    data: "key",
  };

  (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

  const result = await GenerateKeys();

  expect(axios.post).toHaveBeenCalledWith("/manager.fcgi/confs//newRSAKey");

  expect(result).toEqual(mockResponse.data);
});
it("should throw an error if axios.get fails", async () => {
  (axios.post as jest.Mock).mockRejectedValueOnce(new Error("400"));

  await expect(GenerateKeys()).rejects.toThrow("400");
});
