import { fireEvent, screen, within } from "@testing-library/react";
import { renderWithProviders } from "../src/utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import Manager from "../src/dashboards/Manager";
import { t } from "i18next";

jest.mock("axios");

describe("Filtering", () => {
  it("click should toggle filter", async () => {
    renderWithProviders(<Manager />);

    expect(await screen.findByText("14")).toBeInTheDocument();
    fireEvent.click(await screen.findByText(t("ldapFilters")));
    expect(await screen.findByText(t("alphabetical"))).toBeVisible();

    fireEvent.click(screen.getByLabelText(t("alphabetical")));
    expect(screen.getByLabelText(t("alphabetical"))).toHaveClass("Mui-checked");
  });
  it("toggling filter should sort alphabeticaly", async () => {
    renderWithProviders(<Manager />);

    expect(await screen.findByText("14")).toBeInTheDocument();
    fireEvent.click(await screen.findByText(t("ldapFilters")));
    fireEvent.click(screen.getByLabelText(t("alphabetical")));

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
  it("Toggle cas issuer", async () => {
    renderWithProviders(<Manager />);
    expect(await screen.findByText("14")).toBeInTheDocument();
    const samlSwitch = screen.getByTestId("issuer.toggle.cas");
    // eslint-disable-next-line testing-library/no-node-access
    const switchInput = samlSwitch.querySelector('input[role="switch"]');
    expect(samlSwitch).not.toHaveClass("Mui-checked");

    samlSwitch.click();
    if (switchInput) {
      fireEvent.click(switchInput);
    }
    expect(screen.getByTestId("issuer.toggle.cas")).toHaveClass("Mui-checked");

    expect(screen.getByTestId("cas_test").className).toBe("card ");
    if (switchInput) {
      fireEvent.click(switchInput);
    }
    expect(screen.getByTestId("issuer.toggle.saml")).not.toBeChecked();
    expect(screen.getByTestId("cas_test").className).toBe("card issue");
  });
  it("Toggle Maintenance", async () => {
    renderWithProviders(<Manager />);

    expect(await screen.findByText("14")).toBeInTheDocument();
    const maintenanceSwitch = screen.getByTestId(
      "maintenance.native.example.com"
    );
    // eslint-disable-next-line testing-library/no-node-access
    const switchInput = maintenanceSwitch.querySelector('input[role="switch"]');
    maintenanceSwitch.click();
    if (switchInput) {
      fireEvent.click(switchInput);
    }
    expect(switchInput).toBeChecked();
    expect(screen.getByTestId("native.example.com").className).toBe(
      "card Maintenance"
    );
    if (switchInput) {
      fireEvent.click(switchInput);
    }
    expect(switchInput).not.toBeChecked();
    expect(screen.getByTestId("native.example.com").className).toBe("card ");
  });
});

describe("warnings", () => {
  it("warning when issuer unchecked and app using it", async () => {
    renderWithProviders(<Manager />);

    expect(await screen.findByText("14")).toBeInTheDocument();

    expect(
      within(screen.getByTestId("issuer.saml")).getByTestId("warning")
    ).toBeDefined();
    expect(screen.getByTestId("saml_test").className).toBe("card issue");
  });
  it("warning appears when unchecking issuer toggle", async () => {
    renderWithProviders(<Manager />);

    expect(await screen.findByText("14")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("issuer.toggle.cas"));

    expect(
      within(screen.getByTestId("issuer.cas")).getByTestId("warning")
    ).toBeInTheDocument();
  });
  it("warning when issue in data", async () => {
    renderWithProviders(<Manager />);

    expect(await screen.findByText("14")).toBeInTheDocument();

    expect(
      within(screen.getByTestId("oidc_test")).getByText("⚠️")
    ).toBeInTheDocument();
  });
  it("no issuer warning when issuer is toggled but red still activated because of data warning", async () => {
    renderWithProviders(<Manager />);

    expect(await screen.findByText("14")).toBeInTheDocument();

    expect(
      within(screen.getByTestId("issuer.oidc")).getByTestId("warning")
    ).not.toBeVisible();
    expect(
      within(screen.getByTestId("oidc_test")).getByText("⚠️")
    ).toBeInTheDocument();
    expect(screen.getByTestId("oidc_test").className).toBe("card issue");
  });
  it("hover on issuer warning triggers popup with problematic apps", async () => {
    renderWithProviders(<Manager />);

    expect(await screen.findByText("14")).toBeInTheDocument();

    fireEvent.mouseOver(
      within(screen.getByTestId("issuer.saml")).getByTestId("warning")
    );
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });
});
