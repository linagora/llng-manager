import { GenerateEcKeys, NewCertificate } from "../../src/utils/generateKey";

global.fetch = jest.fn();

describe("GenerateKeys function", () => {
  it("should make a post request with the provided URL for RSA keys", async () => {
    const mockResponse = "key";
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );
    const result = await NewCertificate("RSA");

    expect(fetch).toHaveBeenCalledWith("/manager.fcgi/confs//newCertificate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: "RSA" }),
    });

    expect(result).toEqual(mockResponse);
  });

  it("should make a post request with the provided URL for EC keys", async () => {
    const mockResponse = "key";
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );
    const result = await GenerateEcKeys();

    expect(fetch).toHaveBeenCalledWith("/manager.fcgi/confs//newEcKeys", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if fetch fails", async () => {
    const errorMessage = "400";
    (fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(NewCertificate("test")).rejects.toThrow(errorMessage);
  });
});
