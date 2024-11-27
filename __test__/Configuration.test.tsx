import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { t } from "i18next";
import { Configuration } from "../src/pages/Configuration";
import { renderWithProviders } from "../src/utils/test-utils";

export const changeInput = async (index: number, value: string | number) => {
  const input = screen.getAllByText("", {
    selector: ".MuiInputBase-input",
  })[index];
  fireEvent.change(input, { target: { value } });
  expect(
    (
      await screen.findAllByText("", {
        selector: ".MuiInputBase-input",
      })
    )[index]
  ).toHaveDisplayValue(value.toString());
};

export const changeRadio = (index: number) => {
  const radioInput = screen.getAllByLabelText(t("on"))[index];
  fireEvent.click(radioInput);
  expect(radioInput).toBeChecked();
};

export const changeSelect = (
  text: string,
  index: number,
  value: string | number | string[] | null | undefined
) => {
  const selectInput = screen.getAllByText(text, {
    selector: ".MuiSelect-select",
  })[index]; // eslint-disable-next-line testing-library/no-node-access
  const selectElement = selectInput.parentElement?.querySelector("input");
  fireEvent.change(selectElement!, { target: { value: value } });
};
export const changeSelectbis = (
  index: number,
  value: string | number | string[] | null | undefined
) => {
  const selectInput = screen.getAllByText("", {
    selector: ".MuiSelect-select",
  })[index]; // eslint-disable-next-line testing-library/no-node-access
  const selectElement = selectInput.parentElement?.querySelector("input");
  fireEvent.change(selectElement!, { target: { value: value } });
};

export const clickOption = (optionText: any | string | string[]) => {
  const option = screen.getByText(t(optionText), { selector: ".option" });
  fireEvent.click(option);
  expect(option).toHaveClass("selected");
};
describe("Configuration Component", () => {
  it('should render ApplicationDashboard for location type "app"', () => {
    const location = {
      type: "app",
      info: { name: "TestApp", type: "TestType" },
    };

    renderWithProviders(<Configuration location={location} />);

    expect(screen.getByText("TestApp")).toBeInTheDocument();
    expect(screen.getByText("TestType")).toBeInTheDocument();
  });

  it('should render Manager and AddApp for location type "conf"', () => {
    const location = { type: "conf", info: { name: "TestConf" } };

    renderWithProviders(<Configuration location={location} />);

    expect(screen.getByText(t("currentConfiguration"))).toBeInTheDocument();
  });

  it('should render SimpleAuthParams by default and toggle to AdvancedAuthParams for location type "authParams"', () => {
    const location = { type: "authParams", info: { name: "latest" } };

    renderWithProviders(<Configuration location={location} />);

    expect(
      screen.queryByText("", { selector: ".optionNavbar" })
    ).not.toBeInTheDocument();
    const selectInput = screen.getByLabelText(t("authentication"));
    // eslint-disable-next-line testing-library/no-node-access
    const selectElement = selectInput.parentElement?.querySelector("input");
    fireEvent.change(selectElement!, { target: { value: "Demo" } });
    fireEvent.click(screen.getByTestId("TuneIcon"));
    expect(
      screen.getByText("", { selector: ".optionNavbar" })
    ).toBeInTheDocument();
  });

  it('should render IssuerDashboard for location type "issuer"', () => {
    const location = { type: "issuer", info: { name: "TestIssuer" } };

    renderWithProviders(<Configuration location={location} />);

    expect(screen.getByText("TestIssuer")).toBeInTheDocument();
  });
});
