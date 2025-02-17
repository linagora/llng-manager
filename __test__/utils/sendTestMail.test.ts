import { sendTestMail } from "../../src/utils/sentTestMail";
global.fetch = jest.fn();
it("should send a test mail to the specified destination when called with a valid email", async () => {
  const mockResponse = { data: "success" };
  (fetch as jest.Mock).mockResolvedValueOnce({
    json: () => Promise.resolve({ data: "success" }),
  });
  const dest = "test@example.com";
  const response = await sendTestMail(dest);

  expect(fetch).toHaveBeenCalledWith("/manager.fcgi/confs//sendTestMail", {
    body: JSON.stringify({ dest }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  expect(response).toEqual(mockResponse);
});
