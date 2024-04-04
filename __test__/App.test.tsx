import { fireEvent, screen, within } from "@testing-library/react";
import { renderWithProviders } from "../src/utils/test-utils";
import App from "../src/App";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

describe("Filtering", () => {
  it("click should toggle filter", async () => {
    renderWithProviders(<App />);

    expect(await screen.findByText("14")).toBeInTheDocument();
    fireEvent.click(await screen.findByText("Filters"));
    expect(await screen.findByText("Alphabetical")).toBeVisible();

    fireEvent.click(screen.getByLabelText("Alphabetical"));
    expect(screen.getByLabelText("Alphabetical")).toBeChecked();
  });
  it("toggling filter should sort alphabeticaly", async () => {
    renderWithProviders(<App />);

    expect(await screen.findByText("14")).toBeInTheDocument();
    fireEvent.click(await screen.findByText("Filters"));
    fireEvent.click(screen.getByLabelText("Alphabetical"));

    expect(screen.getAllByTestId("appcard")).toStrictEqual(
      screen.getAllByTestId("appcard").sort((el1, el2) =>
        // eslint-disable-next-line testing-library/no-node-access, @typescript-eslint/no-unused-expressions
        (el1.children[0].children[0].textContent
          ? // eslint-disable-next-line testing-library/no-node-access
            el1.children[0].children[0].textContent
          : "") > // eslint-disable-next-line testing-library/no-node-access
        (el2.children[0].children[0].textContent // eslint-disable-next-line testing-library/no-node-access
          ? el2.children[0].children[0].textContent
          : "")
          ? 1
          : -1
      )
    );
  });
});

describe("Toggles", () => {
  it("Toggle saml issuer", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText("14")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("issuer.toggle.saml"));
    expect(screen.getByTestId("issuer.toggle.saml")).toBeChecked();
    expect(screen.getByTestId("saml_test").className).toBe("card ");
    fireEvent.click(screen.getByTestId("issuer.toggle.saml"));
    expect(screen.getByTestId("issuer.toggle.saml")).not.toBeChecked();
    expect(screen.getByTestId("saml_test").className).toBe("card issue");
  });
  it("Toggle Maintenance", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText("14")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("maintenance.native.example.com"));
    expect(screen.getByTestId("maintenance.native.example.com")).toBeChecked();
    expect(screen.getByTestId("native.example.com").className).toBe(
      "card Maintenance"
    );
    fireEvent.click(screen.getByTestId("maintenance.native.example.com"));
    expect(
      screen.getByTestId("maintenance.native.example.com")
    ).not.toBeChecked();
    expect(screen.getByTestId("native.example.com").className).toBe("card ");
  });
});

describe("warnings", () => {
  it("warning when issuer unchecked and app using it", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText("14")).toBeInTheDocument();

    expect(
      within(screen.getByTestId("issuer.saml")).getByText("⚠️")
    ).toBeDefined();
    expect(screen.getByTestId("saml_test").className).toBe("card issue");
  });
  it("warning goes away when issuer toggle is switched", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText("14")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("issuer.toggle.saml"));

    expect(
      within(screen.getByTestId("issuer.saml")).queryByText("⚠️")
    ).not.toBeInTheDocument();
  });
  it("warning appears when unchecking issuer toggle", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText("14")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("issuer.toggle.cas"));

    expect(
      within(screen.getByTestId("issuer.cas")).getByText("⚠️")
    ).toBeInTheDocument();
  });
  it("warning when issue in data", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText("14")).toBeInTheDocument();

    expect(
      within(screen.getByTestId("oidc_test")).getByText("⚠️")
    ).toBeInTheDocument();
  });
  it("no issuer warning when issuer is toggled but red still activated because of data warning", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText("14")).toBeInTheDocument();

    expect(
      within(screen.getByTestId("issuer.oidc")).queryByText("⚠️")
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByTestId("oidc_test")).getByText("⚠️")
    ).toBeInTheDocument();
    expect(screen.getByTestId("oidc_test").className).toBe("card issue");
  });
  it("hover on issuer warning triggers popup with problematic apps", async () => {
    renderWithProviders(<App />);
    expect(await screen.findByText("14")).toBeInTheDocument();

    fireEvent.mouseOver(
      within(screen.getByTestId("issuer.saml")).getByText("⚠️")
    );

    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });
});
