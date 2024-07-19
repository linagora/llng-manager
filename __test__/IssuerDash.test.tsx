import { fireEvent, screen } from "@testing-library/react";
import axios from "axios";
import { t } from "i18next";
import { Configuration } from "../src/pages/Configuration";
import { renderWithProviders } from "../src/utils/test-utils";
import {
  changeInput,
  changeRadio,
  changeSelect,
  clickOption,
} from "./Configuration.test";
jest.mock("axios");

describe("Issuer Dashboard", () => {
  it("should render simple SAML Dashboard", async () => {
    const location = { type: "issuer", info: { name: "saml" } };
    const mockResponse = {
      data: { private: "private", public: "public" },
    };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);
    renderWithProviders(<Configuration location={location} />);
    expect(screen.getByText("SAML2 Service")).toBeDefined();

    changeInput(0, "New Key");
    changeRadio(0);
    fireEvent.click(screen.getByText("Organization"));
    changeInput(1, "display");
    changeInput(2, "display1");
    changeInput(3, "display2");
    clickOption("samlServiceSecurity");

    fireEvent.click(screen.getByText(t("newRSAKey")));
    await screen.findByDisplayValue("public");
    expect(await screen.findByDisplayValue("public")).toBeDefined();
    expect(await screen.findByDisplayValue("private")).toBeDefined();
    const file = new File(["file content"], "file.txt", { type: "text/plain" });
    fireEvent.change(screen.getAllByLabelText(t("upload"))[0], {
      target: { files: [file] },
    });
    jest.fn().mockResolvedValue("file content");
    expect(await screen.findByText("file content")).toBeDefined();
    clickOption("providerOptions");
    changeRadio(0);
    changeRadio(1);
    changeRadio(2);

    clickOption("samlAdvanced");
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    changeInput(0, "display");
    changeInput(1, "display1");
    changeInput(2, "display2");
    const mockAxiosGet = axios.get as jest.Mock;
    mockAxiosGet.mockResolvedValue({
      data: { key: "value" },
    });
    fireEvent.click(screen.getByTestId("DownloadIcon"));
    expect(mockAxiosGet).toHaveBeenCalledWith("/confs/1?samlMetadata=1");
  });

  it("should render simple CAS Dashboard", async () => {
    const location = { type: "issuer", info: { name: "cas" } };

    renderWithProviders(<Configuration location={location} />);
    expect(screen.getByText("CAS Service")).toBeDefined();

    changeRadio(0);
    changeRadio(1);
    changeRadio(2);
    changeInput(0, "New Key");
    changeInput(1, 1);
    changeInput(2, "test");

    clickOption("casStorageOptions");
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(screen.getByDisplayValue("new")).toBeInTheDocument();
    changeInput(0, "New Key");
    fireEvent.click(screen.getAllByTestId("RemoveCircleIcon")[0]);

    clickOption("casAttributes");
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(screen.getByDisplayValue("new")).toBeInTheDocument();
    changeInput(0, "New Key");
    fireEvent.click(screen.getAllByTestId("RemoveCircleIcon")[0]);
  });

  it("should render simple OIDC Dashboard", async () => {
    const location = { type: "issuer", info: { name: "oidc" } };
    const mockResponse = {
      data: { hash: "hash", private: "private", public: "public" },
    };
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);
    renderWithProviders(<Configuration location={location} />);
    expect(screen.getByText("OIDCServiceMetaData")).toBeDefined();

    changeRadio(0);

    clickOption("oidcServiceDynamicRegistration");
    changeRadio(0);
    fireEvent.click(screen.getByText("Exported vars"));
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(screen.getAllByDisplayValue("new")[0]).toBeInTheDocument();
    fireEvent.click(screen.getByText("Extra claims"));
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[1]);
    expect(screen.getAllByDisplayValue("new")[1]).toBeInTheDocument();

    clickOption("oidcServiceMetaDataSecurity");
    changeRadio(0);
    changeRadio(1);
    changeRadio(2);
    changeSelect("RSA", 0, "EC");
    changeInput(0, "test");
    expect(screen.getByText("EC")).toBeDefined();
    const file = new File(["file content"], "file.txt", { type: "text/plain" });
    fireEvent.change(screen.getAllByLabelText(t("upload"))[0], {
      target: { files: [file] },
    });
    jest.fn().mockResolvedValue("file content");
    expect(await screen.findByText("file content")).toBeDefined();
    (axios.post as jest.Mock).mockResolvedValueOnce(mockResponse);
    fireEvent.click(screen.getByText(t("newRSAKey")));
    expect(await screen.findByText("private")).toBeDefined();

    expect(axios.post).toHaveBeenCalledWith("/manager.fcgi/confs//newEcKeys");

    clickOption("oidcServiceMetaDataTimeouts");
    changeInput(0, 2);
    changeInput(1, 3);
    changeInput(2, 4);
    changeInput(3, 5);

    clickOption("oidcServiceMetaDataSessions");
    changeInput(0, "test");
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(screen.getAllByDisplayValue("new")[0]).toBeInTheDocument();
  });

  it("should render simple OID Dashboard", async () => {
    const location = { type: "issuer", info: { name: "oid" } };

    renderWithProviders(<Configuration location={location} />);
    expect(screen.getByText("issuerDBOIDParameters")).toBeDefined();

    changeRadio(0);
    changeInput(0, "test");
    changeInput(1, "test2");
    changeInput(2, "test3");
    const radioInput = screen.getAllByLabelText(t("blacklist"))[0];
    fireEvent.click(radioInput);
    expect(radioInput).toBeChecked();
  });

  it("should render simple GET Dashboard", async () => {
    const location = { type: "issuer", info: { name: "get" } };

    renderWithProviders(<Configuration location={location} />);
    expect(screen.getByText("GET parameters")).toBeDefined();

    changeRadio(0);
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[0]);
    expect(screen.getAllByDisplayValue("new")[0]).toBeInTheDocument();
    changeInput(0, "test");
    fireEvent.click(screen.getByText("params"));
    fireEvent.click(screen.getAllByTestId("AddCircleIcon")[1]);
    expect(screen.getAllByDisplayValue("new")[0]).toBeInTheDocument();

    changeInput(1, "test2");
    changeInput(2, "test3");
  });
});
