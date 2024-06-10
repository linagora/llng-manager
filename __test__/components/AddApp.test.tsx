import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { t } from "i18next";
import { act } from "react-dom/test-utils";
import AddApp from "../../src/components/managerComponents/AddApp";
import { CreationAssistant } from "../../src/components/managerComponents/CreationAssistant";
import { renderWithProviders } from "../../src/utils/test-utils";

describe("AddApp component", () => {
  it("renders without crashing", () => {
    renderWithProviders(<AddApp />);
  });

  it("toggles the popup when Button is clicked", async () => {
    renderWithProviders(<AddApp />);
    expect(screen.queryByRole("dialog")).toBeNull();
    fireEvent.click(screen.getByText("", { selector: ".addButton" }));
    expect(screen.getByRole("dialog")).toBeVisible();
  });
  it("closes dialog when closed by user on click", () => {
    renderWithProviders(<AddApp />);
    fireEvent.click(screen.getByText("", { selector: ".addButton" }));
    fireEvent.click(screen.getByText(t("cancel")));
    expect(screen.queryByRole("dialog")).not.toBeVisible();
  });
  it("does not closes dialog when closed by user on escape", () => {
    renderWithProviders(<AddApp />);
    fireEvent.click(screen.getByText("", { selector: ".addButton" }));
    fireEvent.keyDown(screen.getByText(t("cancel")), { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeVisible();
  });
});

describe("CreationAssistant", () => {
  it("allows user to change app type and name", () => {
    renderWithProviders(<AddApp />);
    fireEvent.click(screen.getByText("", { selector: ".addButton" }));
    // eslint-disable-next-line testing-library/no-node-access
    const selectInput = screen.getByLabelText(t("chooseType"));
    // eslint-disable-next-line testing-library/no-node-access
    const selectElement = selectInput.parentElement?.querySelector("input");
    fireEvent.change(selectElement!, { target: { value: "saml" } });
    expect(screen.getByDisplayValue("sp-example")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "New Name" },
    });
    expect(screen.getByDisplayValue("New Name")).toBeInTheDocument();
  });
  it("allows user to navigate through pages", () => {
    renderWithProviders(<AddApp />);
    fireEvent.click(screen.getByText("", { selector: ".addButton" }));
    // eslint-disable-next-line testing-library/no-node-access
    const selectInput = screen.getByLabelText(t("chooseType"));
    // eslint-disable-next-line testing-library/no-node-access
    const selectElement = selectInput.parentElement?.querySelector("input");
    fireEvent.change(selectElement!, { target: { value: "saml" } });
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Previous"));
    expect(screen.getByText("Cancel")).toBeInTheDocument();

    // Move to next page again
    fireEvent.click(screen.getByText("Next"));
    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: "New Name" },
    });
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("confirm")).toBeInTheDocument();
  });
  it("forbid user to continue withour app name", () => {
    renderWithProviders(<AddApp />);
    fireEvent.click(screen.getByText("", { selector: ".addButton" }));
    // eslint-disable-next-line testing-library/no-node-access
    const selectInput = screen.getByLabelText(t("chooseType"));
    // eslint-disable-next-line testing-library/no-node-access
    const selectElement = selectInput.parentElement?.querySelector("input");
    fireEvent.change(selectElement!, { target: { value: "oidc" } });
    expect(screen.getByDisplayValue("rp-example")).toBeInTheDocument();
    // Change name
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText(t("cancel"))).toBeInTheDocument();
  });
  it("allows user to confirm and close the modal", () => {
    const closeModal = jest.fn();
    renderWithProviders(<CreationAssistant closeModal={closeModal} />);
    fireEvent.click(screen.getByText("Next")); // Move to the last page
    fireEvent.click(screen.getByText("confirm"));
    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});

describe("MandatoryFields component", () => {
  it("updates state correctly when SAML XML field is changed", () => {
    renderWithProviders(<AddApp />);
    fireEvent.click(screen.getByText("", { selector: ".addButton" }));
    // eslint-disable-next-line testing-library/no-node-access
    const selectInput = screen.getByLabelText(t("chooseType"));
    // eslint-disable-next-line testing-library/no-node-access
    const selectElement = selectInput.parentElement?.querySelector("input");
    fireEvent.change(selectElement!, { target: { value: "saml" } });
    expect(screen.getByDisplayValue("sp-example")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Next"));

    const clientIdInput = screen.getByPlaceholderText("XML MetaData");
    fireEvent.change(clientIdInput, { target: { value: "test-xml-metadata" } });

    expect(clientIdInput).toHaveValue("test-xml-metadata");
  });
  it("updates state correctly when Client ID field is changed", () => {
    renderWithProviders(<AddApp />);
    fireEvent.click(screen.getByText("", { selector: ".addButton" }));
    // eslint-disable-next-line testing-library/no-node-access
    const selectInput = screen.getByLabelText(t("chooseType"));
    // eslint-disable-next-line testing-library/no-node-access
    const selectElement = selectInput.parentElement?.querySelector("input");
    fireEvent.change(selectElement!, { target: { value: "oidc" } });
    expect(screen.getByDisplayValue("rp-example")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Next"));

    const clientIdInput = screen.getByPlaceholderText(
      t("oidcRPMetaDataOptionsClientID")
    );
    fireEvent.change(clientIdInput, { target: { value: "test-client-id" } });

    expect(clientIdInput).toHaveValue("test-client-id");
  });

  it("updates state correctly when Client Secret field is changed", () => {
    renderWithProviders(<AddApp />);
    fireEvent.click(screen.getByText("", { selector: ".addButton" }));
    // eslint-disable-next-line testing-library/no-node-access
    const selectInput = screen.getByLabelText(t("chooseType"));
    // eslint-disable-next-line testing-library/no-node-access
    const selectElement = selectInput.parentElement?.querySelector("input");
    fireEvent.change(selectElement!, { target: { value: "oidc" } });
    expect(screen.getByDisplayValue("rp-example")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Next"));
    const clientSecretInput = screen.getByPlaceholderText(
      t("oidcRPMetaDataOptionsClientSecret")
    );
    fireEvent.change(clientSecretInput, {
      target: { value: "test-client-secret" },
    });

    expect(clientSecretInput).toHaveValue("test-client-secret");
  });

  it("updates state correctly when Public Client radio button is changed", async () => {
    renderWithProviders(<AddApp />);
    fireEvent.click(screen.getByText("", { selector: ".addButton" }));
    // eslint-disable-next-line testing-library/no-node-access
    const selectInput = screen.getByLabelText(t("chooseType"));
    // eslint-disable-next-line testing-library/no-node-access
    const selectElement = selectInput.parentElement?.querySelector("input");
    fireEvent.change(selectElement!, { target: { value: "oidc" } });
    expect(screen.getByDisplayValue("rp-example")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Next"));
    const publicClientOn = screen.getByLabelText(t("on"));
    fireEvent.click(publicClientOn);

    await act(async () => {
      expect(screen.getByLabelText(t("on"))).toBeChecked();
    });
  });
});
