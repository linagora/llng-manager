import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import axios from "axios";
import { HomePage } from "../src/dashboards/HomePage";
import { renderWithProviders } from "../src/utils/test-utils";
jest.mock("axios");

describe("HomePage", () => {
  it("homepage renders", async () => {
    renderWithProviders(<HomePage />);
    expect(await screen.findByText("14")).toBeDefined();
    expect(
      await screen.findByText("Configuration Manager")
    ).toBeInTheDocument();
    expect(await screen.findByText("Latest conf info")).toBeInTheDocument();
    expect(await screen.findByText("anonymous")).toBeInTheDocument();
    expect(await screen.findByText("172.30.0.1")).toBeInTheDocument();
    expect(
      await screen.findByText(new Date(1711110492 * 1000).toLocaleString())
    ).toBeInTheDocument();
  });
  it("dl config", async () => {
    renderWithProviders(<HomePage />);

    expect(await screen.findByText("14")).toBeDefined();

    const mockAxiosGet = axios.get as jest.Mock;
    mockAxiosGet.mockResolvedValue({
      data: { key: "value" },
    });
    fireEvent.click(screen.getByTestId("DownloadIcon"));
    expect(mockAxiosGet).toHaveBeenCalledWith("/confs/14?full=1");
  });
  it("renders the component with correct app numbers", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText("appNum (4)")).toBeDefined();
  });

  it("renders the pie chart with correct data", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText("SAML : 1")).toBeDefined();
    expect(screen.getByText("oidc : 1")).toBeDefined();
    expect(screen.getByText("cas : 1")).toBeDefined();
  });
});
