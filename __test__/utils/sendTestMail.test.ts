import axios from "axios";
import { sendTestMail } from "../../src/utils/sentTestMail";
jest.mock("axios");
it("should send a test mail to the specified destination when called with a valid email", async () => {
  const mockResponse = { data: "success" };
  (axios.post as jest.Mock).mockResolvedValue(mockResponse);

  const dest = "test@example.com";
  const response = await sendTestMail(dest);

  expect(axios.post).toHaveBeenCalledWith("/manager.fcgi/confs//sendTestMail", {
    dest,
  });
  expect(response).toEqual(mockResponse);
});
