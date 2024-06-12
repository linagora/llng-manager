import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { t } from "i18next";
import { Configuration } from "../src/pages/Configuration";
import attributes from "../src/static/attributes.json";
import { renderWithProviders } from "../src/utils/test-utils";
jest.mock("axios");
const changeInput = async (index: number, value: string | number) => {
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

const changeRadio = (index: number) => {
  const radioInput = screen.getAllByLabelText(t("on"))[index];
  fireEvent.click(radioInput);
  expect(radioInput).toBeChecked();
};

const changeSelect = (
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
const changeSelectbis = (
  index: number,
  value: string | number | string[] | null | undefined
) => {
  const selectInput = screen.getAllByText("", {
    selector: ".MuiSelect-select",
  })[index]; // eslint-disable-next-line testing-library/no-node-access
  const selectElement = selectInput.parentElement?.querySelector("input");
  fireEvent.change(selectElement!, { target: { value: value } });
};

const clickOption = (optionText: any | string | string[]) => {
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

describe("Application Dashboard", () => {
  it('should render ApplicationDashboard for app type "native"', () => {
    const location = {
      type: "app",
      info: { name: "native.example.com", type: "native" },
    };

    renderWithProviders(<Configuration location={location} />);

    expect(screen.getAllByText("native.example.com")[0]).toBeInTheDocument();
    expect(screen.getByText("native")).toBeInTheDocument();
  });
  it('should render ApplicationDashboard for app type "saml"', () => {
    const location = {
      type: "app",
      info: { name: "saml_test", type: "saml" },
    };

    renderWithProviders(<Configuration location={location} />);

    expect(screen.getAllByText("saml_test")[0]).toBeInTheDocument();
    expect(screen.getByText("saml")).toBeInTheDocument();
  });
  it('should render ApplicationDashboard for app type "oidc"', () => {
    const location = {
      type: "app",
      info: { name: "oidc_test", type: "oidc" },
    };

    renderWithProviders(<Configuration location={location} />);

    expect(screen.getAllByText("oidc_test")[0]).toBeInTheDocument();
    expect(screen.getByText("oidc")).toBeInTheDocument();
  });
  it('should render ApplicationDashboard for app type "cas"', () => {
    const location = {
      type: "app",
      info: { name: "cas_test", type: "cas" },
    };

    renderWithProviders(<Configuration location={location} />);

    expect(screen.getAllByText("cas_test")[0]).toBeInTheDocument();
    expect(screen.getByText("cas")).toBeInTheDocument();
  });
  it('should render ApplicationDashboard for app type "native" and change data', () => {
    const location = {
      type: "app",
      info: { name: "native.example.com", type: "native" },
    };

    renderWithProviders(<Configuration location={location} />);
    expect(screen.getByText(t("Basic Option"))).toBeInTheDocument();
    expect(screen.getByText(t("locationRules"))).toBeInTheDocument();
    expect(
      screen.getByText(t("exportedHeaders"), { selector: ".title2" })
    ).toBeInTheDocument();
    expect(screen.getByText(t("post"))).toBeInTheDocument();
    expect(screen.getByText(t("vhostOptions"))).toBeInTheDocument();
    changeRadio(0);
    clickOption("locationRules");

    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);

    expect(screen.getByDisplayValue("New rule")).toBeInTheDocument();
    changeInput(1, "test");
    changeInput(2, "alias");

    fireEvent.click(screen.getAllByTestId("RemoveCircleIcon")[2]);
    expect(screen.queryByDisplayValue("New rule")).not.toBeInTheDocument();
    clickOption("exportedHeaders");

    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(screen.getByDisplayValue("new")).toBeInTheDocument();
    changeInput(0, "test");
    changeInput(1, "alias");
    fireEvent.click(screen.getAllByTestId("RemoveCircleIcon")[0]);
    expect(screen.queryByDisplayValue("new")).not.toBeInTheDocument();
    clickOption("vhostOptions");

    clickOption("post");
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(
      screen.getByDisplayValue("/absolute/path/to/form")
    ).toBeInTheDocument();
    changeInput(1, "alias");
    changeInput(2, "alias");
    fireEvent.click(screen.getAllByTestId("RemoveCircleIcon")[0]);
    expect(
      screen.queryByDisplayValue("/absolute/path/to/form")
    ).not.toBeInTheDocument();
    clickOption("vhostOptions");

    changeRadio(0);
    changeInput(0, 2);
    changeInput(1, "alias");
    changeInput(2, "alias");
    changeSelect("Main", 0, "CDA");
    expect(screen.getByText(t("CDA"))).toBeInTheDocument();

    changeInput(1, "alias");
  });

  it("should trigger navigation when clicking on Breadcrumbs link", () => {
    const location = {
      type: "app",
      info: { name: "oidc_test", type: "oidc" },
    };
    renderWithProviders(<Configuration location={location} />);
    fireEvent.click(
      screen.getByText(location.info.name, { selector: ".MuiLink-root" })
    );
    expect(
      screen.getByText(location.info.name, { selector: ".title" })
    ).toBeInTheDocument();
  });
  it('should render ApplicationDashboard for app type "cas" and navigate through data', () => {
    const location = {
      type: "app",
      info: { name: "cas_test", type: "cas" },
    };

    renderWithProviders(<Configuration location={location} />);
    fireEvent.click(
      screen.getByText(t("casAppMetaDataExportedVars"), { selector: ".option" })
    );
    expect(
      screen.getByText(t("casAppMetaDataExportedVars"), { selector: ".title2" })
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByText(t("casAppMetaDataMacros"), { selector: ".option" })
    );
    expect(
      screen.getByText(t("casAppMetaDataMacros"), { selector: ".title2" })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByText(t("casAppMetaDataOptions"), { selector: ".option" })
    );
    expect(
      screen.getByText(t("casAppMetaDataOptions"), { selector: ".title2" })
    ).toBeInTheDocument();
  });

  test('should render ApplicationDashboard for app type "cas" and adds new exported variable', () => {
    const location = {
      type: "app",
      info: { name: "cas_test", type: "cas" },
    };
    renderWithProviders(<Configuration location={location} />);

    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(screen.getByDisplayValue("new")).toBeInTheDocument();
  });
  test('should render ApplicationDashboard for app type "cas" and adds new macro', () => {
    const location = {
      type: "app",
      info: { name: "cas_test", type: "cas" },
    };
    renderWithProviders(<Configuration location={location} />);
    fireEvent.click(
      screen.getByText(t("casAppMetaDataMacros"), { selector: ".option" })
    );
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(screen.getByDisplayValue("new")).toBeInTheDocument();
  });
  test('should render ApplicationDashboard for app type "cas" and change datas', () => {
    const location = {
      type: "app",
      info: { name: "cas_test", type: "cas" },
    };
    renderWithProviders(<Configuration location={location} />);
    fireEvent.click(
      screen.getByText(t("casAppMetaDataOptions"), { selector: ".option" })
    );
    fireEvent.click(screen.getByText(t("on")));
    expect(screen.getByLabelText(t("on"))).toBeChecked();
    expect(screen.getByLabelText(t("off"))).not.toBeChecked();

    const displayNameInput = screen.getAllByText("", {
      selector: ".MuiInputBase-input",
    })[0];
    fireEvent.change(displayNameInput, {
      target: { value: "New Display Name" },
    });
    expect(displayNameInput).toHaveDisplayValue("New Display Name");

    const serviceInput = screen.getAllByText("", {
      selector: ".MuiInputBase-input",
    })[1];
    fireEvent.change(serviceInput, { target: { value: "New Service Value" } });
    expect(serviceInput).toHaveDisplayValue("New Service Value");

    const authLevelInput = screen.getAllByText("", {
      selector: ".MuiInputBase-input",
    })[2];
    fireEvent.change(authLevelInput, {
      target: { value: 1 },
    });
    expect(authLevelInput).toHaveDisplayValue("1");
  });
  test('should render ApplicationDashboard for app type "oidc" and change datas', async () => {
    const location = {
      type: "app",
      info: { name: "oidc_test", type: "oidc" },
    };
    renderWithProviders(<Configuration location={location} />);

    clickOption(t("oidcRPMetaDataOptionsBasic"));

    changeInput(0, "New Client ID");
    changeInput(1, "New Client Secret");
    changeInput(2, "http://new-redirect-uri.com");
    changeInput(3, "New Auth Method");
    changeInput(4, "New Display");
    changeInput(5, "New Icon");

    clickOption("oidcRPMetaDataExportedVars");

    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    changeInput(0, "New Claim Name");
    changeInput(1, "New Variable Name");
    changeSelect(t("string"), 0, "int");
    expect(screen.getByText(t("int"))).toBeDefined();
    changeSelect(t("auto"), 0, "always");
    expect(screen.getByText(t("always"))).toBeDefined();
    clickOption("oidcRPMetaDataMacros");

    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);

    changeInput(0, "New Key");
    changeInput(1, "New Value");

    clickOption("oidcRPMetaDataOptions");

    changeInput(0, "New user");
    changeInput(1, "additionnal audience ");
    changeRadio(0);
    changeRadio(1);
    changeRadio(2);
    changeRadio(3);
    clickOption("security");
    changeRadio(0);
    changeRadio(1);
    changeRadio(2);
    changeRadio(3);
    changeInput(1, "url");
    changeInput(2, "level");
    changeInput(3, "access Rules");
    changeSelect("HS512", 0, "HS384");
    expect(screen.getByText(t("HS384"))).toBeDefined();
    changeSelect("RS256", 0, "EdDSA");
    expect(screen.getByText(t("EdDSA"))).toBeDefined();
    changeSelectbis(0, "HS256");
    expect(screen.getByText(t("JWT/HS256"))).toBeDefined();

    clickOption("oidcRPMetaDataOptionsScopes");
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    changeInput(0, "New key");
    changeInput(1, "New Value");
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[2]);
    changeInput(2, "New h");
    changeInput(3, "New e");
    fireEvent.click(screen.getAllByTestId("RemoveCircleIcon")[0]);
    fireEvent.click(screen.getAllByTestId("RemoveCircleIcon")[0]);
    clickOption("keys");

    const file = new File(["file content"], "file.txt", { type: "text/plain" });

    fireEvent.change(screen.getByLabelText("upload"), {
      target: { files: [file] },
    });
    jest.fn().mockResolvedValue("file content");
    expect(await screen.findByText("file content")).toBeDefined();
    clickOption("oidcRPMetaDataOptionsTimeouts");
    changeInput(0, 1);
    changeInput(1, 2);
    changeInput(2, 3);
    changeInput(3, 4);

    clickOption("logout");
    changeSelect(
      t("Front Channel"),
      0,
      attributes.oidcRPMetaDataOptionsLogoutType.select[1].k
    );
    expect(
      screen.getByText(
        t(attributes.oidcRPMetaDataOptionsLogoutType.select[1].v)
      )
    ).toBeDefined();
    changeInput(0, "url");
    changeInput(1, "redirection");
    changeRadio(0);
    changeRadio(1);
  });
  test('should render ApplicationDashboard for app type "saml" and change datas', async () => {
    const location = {
      type: "app",
      info: { name: "saml_test", type: "saml" },
    };
    renderWithProviders(<Configuration location={location} />);

    clickOption("samlSPMetaDataXML");
    const file = new File(["file content"], "file.txt", { type: "text/plain" });

    fireEvent.change(screen.getByLabelText("upload"), {
      target: { files: [file] },
    });
    jest.fn().mockResolvedValue("file content");
    expect(await screen.findByText("file content")).toBeDefined();

    clickOption("samlSPMetaDataExportedAttributes");

    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    changeInput(0, "New Claim Name");
    changeInput(1, "New Variable Name");

    // changeRadio(0);
    changeSelect(
      "Unspecified",
      0,
      "urn:oasis:names:tc:SAML:2.0:attrname-format:uri"
    );

    expect(screen.getByText(t("URI"))).toBeDefined();

    clickOption("samlSPMetaDataMacros");
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    changeInput(0, "New Key");
    changeInput(1, "New Value");

    clickOption("samlSPMetaDataOptions");
    changeSelectbis(0, "email");
    changeInput(0, "auth");
    changeInput(1, 2);
    changeInput(2, 3);
    changeRadio(0);
    changeRadio(1);

    clickOption("samlSPMetaDataOptionsSignature");
    changeRadio(0);

    changeSelect("Default", 0, "RSA_SHA256");
    expect(screen.getByText(t("RSA SHA256"))).toBeDefined();
    changeRadio(1);
    changeRadio(2);
    changeRadio(3);

    clickOption("samlSPMetaDataOptionsSecurity");
    changeInput(0, "auth");
    changeInput(1, 2);
    changeRadio(0);

    changeSelect("None", 0, "nameid");
    expect(screen.getByText(t("Name ID"))).toBeDefined();

    clickOption("samlSPMetaDataOptionsFederation");

    changeSelect("Keep", 0, "ignore");
    expect(screen.getByText(t("Ignore"))).toBeDefined();
  });
});

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
