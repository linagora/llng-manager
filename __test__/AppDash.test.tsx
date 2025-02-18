import { fireEvent, screen } from "@testing-library/react";
import { t } from "i18next";
import { Configuration } from "../src/pages/Configuration";
import attributes from "../src/static/attributes.json";
import { renderWithProviders } from "../src/utils/test-utils";
import {
  changeInput,
  changeRadio,
  changeSelect,
  changeSelectbis,
  clickOption,
  clickSubOption,
} from "./Configuration.test";

global.fetch = jest.fn();

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

  it('should render ApplicationDashboard for app type "saml"', async () => {
    const location = {
      type: "app",
      info: { name: "saml_test", type: "SPsaml" },
    };

    renderWithProviders(<Configuration location={location} />);

    expect(screen.getAllByText("saml_test")[0]).toBeInTheDocument();
    expect(screen.getByText("SPsaml")).toBeInTheDocument();
    clickOption("samlSPMetaDataXML");

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ key: "value" }),
    });

    fireEvent.change(screen.getByPlaceholderText(t("url")), {
      target: { value: "http://example.com" },
    });
    fireEvent.click(screen.getByText(t("load")));
    await screen.findByText(t("loading"));

    expect(fetch).toHaveBeenCalledWith("/prx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "http://example.com" }),
    });
  });

  it('should render ApplicationDashboard for app type "oidc"', () => {
    const location = {
      type: "app",
      info: { name: "oidc_test", type: "RPoidc" },
    };

    renderWithProviders(<Configuration location={location} />);

    expect(screen.getAllByText("oidc_test")[0]).toBeInTheDocument();
    expect(screen.getByText("RPoidc")).toBeInTheDocument();
  });

  it('should render ApplicationDashboard for app type "cas"', () => {
    const location = {
      type: "app",
      info: { name: "cas_test", type: "AppCas" },
    };

    renderWithProviders(<Configuration location={location} />);

    expect(screen.getAllByText("cas_test")[0]).toBeInTheDocument();
    expect(screen.getByText("AppCas")).toBeInTheDocument();
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
      info: { name: "oidc_test", type: "RPoidc" },
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
      info: { name: "cas_test", type: "AppCas" },
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
      info: { name: "cas_test", type: "AppCas" },
    };
    renderWithProviders(<Configuration location={location} />);

    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(screen.getByDisplayValue("new")).toBeInTheDocument();
  });
  test('should render ApplicationDashboard for app type "cas" and adds new macro', () => {
    const location = {
      type: "app",
      info: { name: "cas_test", type: "AppCas" },
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
      info: { name: "cas_test", type: "AppCas" },
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
      info: { name: "oidc_test", type: "RPoidc" },
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

    const option = screen.getByTestId("oidcOptions");
    fireEvent.click(option);
    expect(option).toHaveClass("selected");
    changeInput(0, "New user");
    changeInput(1, "additionnal audience ");
    changeRadio(0);
    changeRadio(1);
    changeRadio(2);
    changeRadio(3);
    clickSubOption("security");
    changeRadio(0);
    changeRadio(1);
    changeRadio(2);
    changeRadio(3);
    changeInput(0, "url");
    changeInput(1, "level");
    changeInput(2, "access Rules");
    changeSelect("HS512", 0, "HS384");
    expect(screen.getByText(t("HS384"))).toBeDefined();
    changeSelect("RS256", 0, "EdDSA");
    expect(screen.getByText(t("EdDSA"))).toBeDefined();
    changeSelect("JSON", 0, "HS256");
    expect(screen.getByText(t("JWT/HS256"))).toBeDefined();

    clickSubOption("oidcRPMetaDataOptionsScopes");
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    changeInput(0, "New key");
    changeInput(1, "New Value");
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[2]);
    changeInput(2, "New h");
    changeInput(3, "New e");
    fireEvent.click(screen.getAllByTestId("RemoveCircleIcon")[0]);
    fireEvent.click(screen.getAllByTestId("RemoveCircleIcon")[0]);
    clickSubOption("keys");

    const file = new File(["file content"], "file.txt", { type: "text/plain" });

    fireEvent.change(screen.getByLabelText("upload"), {
      target: { files: [file] },
    });
    jest.fn().mockResolvedValue("file content");
    expect(await screen.findByText("file content")).toBeDefined();
    clickSubOption("oidcRPMetaDataOptionsTimeouts");
    changeInput(0, 1);
    changeInput(1, 2);
    changeInput(2, 3);
    changeInput(3, 4);

    clickSubOption("logout");
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
      info: { name: "saml_test", type: "SPsaml" },
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

    const option = screen.getByTestId("samlSPMetaDataOptions");
    fireEvent.click(option);
    expect(option).toHaveClass("selected");
    changeSelectbis(0, "email");
    changeInput(0, "auth");
    changeInput(1, 2);
    changeInput(2, 3);
    changeRadio(0);
    changeRadio(1);

    clickSubOption("samlSPMetaDataOptionsSignature");
    changeRadio(0);

    changeSelect("Default", 0, "RSA_SHA256");
    expect(screen.getByText(t("RSA SHA256"))).toBeDefined();
    changeRadio(1);
    changeRadio(2);
    changeRadio(3);

    clickSubOption("samlSPMetaDataOptionsSecurity");
    changeInput(0, "auth");
    changeInput(1, 2);
    changeRadio(0);

    changeSelect("None", 0, "nameid");
    expect(screen.getByText(t("Name ID"))).toBeDefined();

    clickSubOption("samlSPMetaDataOptionsFederation");

    changeSelect("Keep", 0, "ignore");
    expect(screen.getByText(t("Ignore"))).toBeDefined();
  });
});
