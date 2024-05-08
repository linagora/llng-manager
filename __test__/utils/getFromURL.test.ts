import { getFromURL } from "../../src/utils/getFromURL";
import axios from "axios";

jest.mock("axios");
it("should make a post request with the provided URL", async () => {
  const mockResponse = {
    data: {
      data: "test",
    },
  };

  (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

  const result = await getFromURL("https://test.com");

  expect(axios.post).toHaveBeenCalledWith("/prx", { url: "https://test.com" });

  expect(result.data).toEqual(mockResponse.data);
});
it("should throw an error if axios.get fails", async () => {
  (axios.post as jest.Mock).mockRejectedValueOnce(new Error("400"));

  await expect(getFromURL("test")).rejects.toThrow("400");
});
