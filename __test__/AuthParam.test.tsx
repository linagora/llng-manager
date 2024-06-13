import { fireEvent, screen } from "@testing-library/react";
import { t } from "i18next";
import { Configuration } from "../src/pages/Configuration";
import attributes from "../src/static/attributes.json";
import { renderWithProviders } from "../src/utils/test-utils";
import {
  changeInput,
  changeRadio,
  changeSelect,
  clickOption,
} from "./Configuration.test";

describe("AuthParam Dashboard", () => {
  it("should render simple authparam Dashboard", () => {
    const location = { type: "authParams", info: { name: "latest" } };
    renderWithProviders(<Configuration location={location} />);

    expect(screen.getByText("Demonstration parameters")).toBeDefined();
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    changeInput(0, "New Key");
    changeInput(1, "New Value");

    changeSelect("Demo", 0, "AD+K");
    expect(screen.getByText("LDAP parameters")).toBeDefined();
    expect(screen.getByText("Active Directory parameters")).toBeDefined();
    expect(screen.getByText("Kerberos parameters")).toBeDefined();

    fireEvent.click(screen.getByText("Groups"));
    expect(screen.getByText("Search base")).toBeVisible();
    fireEvent.click(
      screen.getByText("Password", { selector: ".MuiAccordionSummary-content" })
    );
    expect(screen.getByText("Password policy control")).toBeVisible();
    changeRadio(0);
    changeRadio(1);
    changeRadio(2);
    changeRadio(3);
    changeRadio(4);
    changeRadio(5);
    changeRadio(6);
    changeRadio(7);
    changeRadio(8);
    changeRadio(9);
    changeRadio(10);
    changeSelect("Active Directory + Kerberos", 0, "LDAP");
    expect(screen.getByText("LDAP parameters")).toBeDefined();
    changeInput(0, "test1");
    changeInput(1, "test2");
    changeInput(2, "test3");
    changeInput(3, "test4");
    changeInput(4, "test5");
    changeInput(5, "test6");
    changeInput(6, "test7");
    changeInput(7, "test8");
  });
  it('should render  AdvancedAuthParams for location type "authParams"', async () => {
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
    changeSelect("Demonstration", 0, attributes.authentication.select[0].k);

    clickOption(attributes.authentication.select[0].v);

    for (let i = 1; i < attributes.authentication.select.length; i++) {
      changeSelect(
        t(attributes.authentication.select[i - 1].v),
        0,
        attributes.authentication.select[i].k
      );
      expect(
        screen.getByText(t(attributes.authentication.select[i].v), {
          selector: ".option",
        })
      ).toBeInTheDocument();
      clickOption(t(attributes.authentication.select[i].v));
      expect(
        screen.getByText(t(attributes.authentication.select[i].v), {
          selector: ".option.selected",
        })
      ).toBeInTheDocument();
      if (screen.queryAllByTestId("AddCircleIcon").length > 0) {
        fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
      }

      if (
        screen.queryAllByText("", { selector: ".MuiInputBase-input" }).length >
        0
      ) {
        for (
          let j = 0;
          j <
          screen.queryAllByText("", {
            selector: ".MuiInputBase-input.MuiInputBase-inputSizeSmall",
          }).length;
          j++
        ) {
          const input = screen.getAllByText("", {
            selector: ".MuiInputBase-input.MuiInputBase-inputSizeSmall",
          })[j];
          fireEvent.change(input, { target: { value: j } });
          // eslint-disable-next-line jest/no-conditional-expect
          expect(
            (
              await screen.findAllByText("", {
                selector: ".MuiInputBase-input.MuiInputBase-inputSizeSmall",
              })
            )[j]
          ).toHaveDisplayValue(j.toString());
        }
      }
    }
  });
});
