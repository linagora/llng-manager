import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { t } from "i18next";
import React from "react";
import { Configuration } from "../src/pages/Configuration";
import { renderWithProviders } from "../src/utils/test-utils";
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
    // eslint-disable-next-line testing-library/no-node-access
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
  it('should render ApplicationDashboard for app type "native" and navigate through data', () => {
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
    fireEvent.click(
      screen.getByText(t("locationRules"), { selector: ".option" })
    );

    expect(screen.getByText(t("vhostComment"))).toBeInTheDocument();
    expect(screen.getByText(t("regexp"))).toBeInTheDocument();
    expect(screen.getByText(t("rules"))).toBeInTheDocument();
    expect(screen.getByText(t("rulesAuthnLevel"))).toBeInTheDocument();
    expect(screen.getByText(t("defaultRule"))).toBeInTheDocument();
    fireEvent.click(
      screen.getByText(t("exportedHeaders"), { selector: ".option" })
    );

    expect(screen.getByText(t("keys"))).toBeInTheDocument();
    expect(screen.getByText(t("values"))).toBeInTheDocument();
    fireEvent.click(
      screen.getByText(t("vhostOptions"), { selector: ".option" })
    );

    expect(screen.getByText(t("port"))).toBeInTheDocument();
    expect(screen.getByText(t("vhostHttps"))).toBeInTheDocument();
    expect(screen.getByText(t("maintenance"))).toBeInTheDocument();
    expect(screen.getByText(t("vhostAliases"))).toBeInTheDocument();
    expect(screen.getByText(t("vhostAccessToTrace"))).toBeInTheDocument();
    expect(screen.getAllByText(t("vhostType"))[0]).toBeInTheDocument();
    expect(screen.getByText(t("vhostAuthnLevel"))).toBeInTheDocument();
    expect(screen.getByText(t("vhostServiceTokenTTL"))).toBeInTheDocument();
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
  test('should render ApplicationDashboard for app type "oidc" and change datas', () => {
    const location = {
      type: "app",
      info: { name: "oidc_test", type: "oidc" },
    };
    renderWithProviders(<Configuration location={location} />);
    fireEvent.click(
      screen.getByText(t("oidcRPMetaDataExportedVars"), { selector: ".option" })
    );
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(screen.getByDisplayValue("new")).toBeInTheDocument();

    const claimName = screen.getAllByText("", {
      selector: ".MuiInputBase-input",
    })[0];
    fireEvent.change(claimName, {
      target: { value: "New Display Name" },
    });
    expect(claimName).toHaveDisplayValue("New Display Name");

    const varName = screen.getAllByText("", {
      selector: ".MuiInputBase-input",
    })[1];
    fireEvent.change(varName, { target: { value: "New Service Value" } });
    expect(varName).toHaveDisplayValue("New Service Value");

    fireEvent.click(screen.getAllByTestId("RemoveCircleIcon")[0]);

    expect(
      screen.queryAllByText("", {
        selector: ".MuiInputBase-input",
      })
    ).toStrictEqual([]);

    fireEvent.click(
      screen.getByText(t("oidcRPMetaDataMacros"), { selector: ".option" })
    );
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(screen.getByDisplayValue("new")).toBeInTheDocument();

    const key = screen.getAllByText("", {
      selector: ".MuiInputBase-input",
    })[0];
    fireEvent.change(key, {
      target: { value: "New Display Name" },
    });
    expect(key).toHaveDisplayValue("New Display Name");

    const value = screen.getAllByText("", {
      selector: ".MuiInputBase-input",
    })[1];

    fireEvent.change(value, { target: { value: "New Service Value" } });
    expect(value).toHaveDisplayValue("New Service Value");
    fireEvent.click(screen.getAllByTestId("RemoveCircleIcon")[0]);

    expect(
      screen.queryAllByText("", {
        selector: ".MuiInputBase-input",
      })
    ).toStrictEqual([]);

    fireEvent.click(
      screen.getByText(t("oidcRPMetaDataOptions"), { selector: ".option" })
    );
    expect(
      screen.getByText(t("oidcRPMetaDataOptionsBypassConsent"))
    ).toBeInTheDocument();
  });
});
