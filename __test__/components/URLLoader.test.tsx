import { fireEvent, screen } from "@testing-library/react";
import { t } from "i18next";
import { URLLoader } from "../../src/components/managerComponents/URLLoader";
import { getFromURL } from "../../src/utils/getFromURL";
import { renderWithProviders } from "../../src/utils/test-utils";

global.fetch = jest.fn();
jest.mock("../../src/utils/getFromURL");

describe("GenerateKeys function", () => {
  it("should export data successfully when URL is correctly set", async () => {
    (getFromURL as jest.Mock).mockResolvedValue({
      data: { content: "mockContent" },
    });

    const mockLoadFunction = jest.fn();

    renderWithProviders(
      <URLLoader appName="testApp" loadFunction={mockLoadFunction} />
    );

    fireEvent.change(screen.getByPlaceholderText(t("url")), {
      target: { value: "http://example.com" },
    });
    expect(screen.getByDisplayValue("http://example.com")).toBeDefined();
    fireEvent.click(screen.getByText(t("load")));
    await screen.findByText(t("loading"));
    expect(mockLoadFunction).toHaveBeenCalledWith({
      name: "testApp",
      data: "mockContent",
    });
  });
});
