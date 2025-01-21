import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen, within } from "@testing-library/react";
import { t } from "i18next";
import { IssuerAssistant } from "../src/components/managerComponents/IssuerAssistant";
import Manager from "../src/dashboards/Manager";
import { renderWithProviders } from "../src/utils/test-utils";
import preview from "jest-preview";

global.fetch = jest.fn();

describe("Filtering", () => {
  it("click should toggle filter", async () => {
    renderWithProviders(<Manager />);

    expect(await screen.findByText("14")).toBeInTheDocument();
    fireEvent.click(await screen.findByLabelText("alpha-label"));
  });
  it("toggling filter should sort alphabeticaly", async () => {
    renderWithProviders(<Manager />);

    expect(await screen.findByText("14")).toBeInTheDocument();
    fireEvent.click(await screen.findByLabelText("alpha-label"));

    expect(await screen.findAllByTestId("appcard")).toStrictEqual(
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

describe("IssuerAssistants", () => {
  it("toggles saml assistant", async () => {
    renderWithProviders(<Manager />);
    const samlSwitch = screen.getByTestId("issuer.toggle.saml");
    const mockResponse = { hash: "hash", private: "private", public: "public" };
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    ); // eslint-disable-next-line testing-library/no-node-access

    const switchInput = samlSwitch.querySelector('input[role="switch"]');

    expect(samlSwitch).not.toHaveClass("Mui-checked");

    samlSwitch.click();
    if (switchInput) {
      fireEvent.click(switchInput);
    }

    fireEvent.click(screen.getByText(t("doItTogether")));
    fireEvent.click(screen.getByText(t("newRSAKey")));
    preview.debug();
    expect(await screen.findByDisplayValue("public")).toBeDefined();
    expect(await screen.findByDisplayValue("hash")).toBeDefined();
    expect(await screen.findByDisplayValue("private")).toBeDefined();

    const file = new File(["file content"], "file.txt", { type: "text/plain" });
    const file2 = new File(["file content2"], "file.txt", {
      type: "text/plain",
    });
    fireEvent.change(screen.getAllByLabelText(t("upload"))[0], {
      target: { files: [file] },
    });
    await screen.findAllByText("file content");
    fireEvent.change(screen.getAllByLabelText(t("upload"))[1], {
      target: { files: [file2] },
    });
    await screen.findAllByText("file content2");
    expect((await screen.findAllByText("file content"))[0]).toBeDefined();
    expect((await screen.findAllByText("file content2"))[0]).toBeDefined();
    fireEvent.click(screen.getByText(t("finish")));

    expect(screen.getByTestId("issuer.toggle.saml")).toHaveClass("Mui-checked");
  });
  it("oidc assistant validate", async () => {
    const setVisibleMock = jest.fn();
    const ignoreMock = jest.fn();
    renderWithProviders(
      <IssuerAssistant
        visible={true}
        type="oidc"
        setVisible={setVisibleMock}
        onIgnore={ignoreMock}
      />
    );

    const mockResponse = { hash: "hash", private: "private", public: "public" };
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(screen.getByText(t("doItTogether")));
    fireEvent.click(screen.getByText(t("newRSAKey")));
    expect(await screen.findByDisplayValue("public")).toBeDefined();
    expect(await screen.findByDisplayValue("hash")).toBeDefined();
    expect(await screen.findByDisplayValue("private")).toBeDefined();
    fireEvent.click(screen.getByText(t("previous")));
    fireEvent.click(screen.getByText(t("doItTogether")));
    expect(await screen.findByDisplayValue("public")).toBeDefined();
    expect(await screen.findByDisplayValue("hash")).toBeDefined();
    expect(await screen.findByDisplayValue("private")).toBeDefined();
    const file = new File(["file content"], "file.txt", { type: "text/plain" });
    fireEvent.change(screen.getAllByLabelText(t("upload"))[0], {
      target: { files: [file] },
    });
    jest.fn().mockResolvedValue("file content");
    expect(await screen.findByText("file content")).toBeDefined();
    fireEvent.click(screen.getByText(t("confirm")));
    expect(setVisibleMock).toHaveBeenCalled();
  });
  it("oidc assistant cancel", async () => {
    const setVisibleMock = jest.fn();
    const ignoreMock = jest.fn();
    renderWithProviders(
      <IssuerAssistant
        visible={true}
        type="oidc"
        setVisible={setVisibleMock}
        onIgnore={ignoreMock}
      />
    );

    const mockResponse = { hash: "hash", private: "private", public: "public" };
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(screen.getByText(t("doItTogether")));
    fireEvent.change(
      screen.getAllByText("", {
        selector: ".MuiInputBase-input",
      })[0],
      { target: { value: "test" } }
    );
    expect(
      screen.getAllByText("test", {
        selector: ".MuiInputBase-input",
      })[0]
    ).toBeDefined();
    fireEvent.change(
      screen.getAllByText("", {
        selector: ".MuiInputBase-input",
      })[1],
      { target: { value: "test1" } }
    );
    expect(
      screen.getAllByText("", {
        selector: ".MuiInputBase-input",
      })[1]
    ).toHaveDisplayValue("test1");
    fireEvent.change(
      screen.getAllByText("", {
        selector: ".MuiInputBase-input",
      })[2],
      { target: { value: "test2" } }
    );
    expect(
      screen.getAllByText("test2", {
        selector: ".MuiInputBase-input",
      })[0]
    ).toBeDefined();
    fireEvent.click(screen.getByText(t("newRSAKey")));
    expect(await screen.findByDisplayValue("public")).toBeDefined();
    expect(await screen.findByDisplayValue("hash")).toBeDefined();
    expect(await screen.findByDisplayValue("private")).toBeDefined();
    fireEvent.click(screen.getByText(t("cancel")));

    expect(ignoreMock).toHaveBeenCalled();
  });
});
