import { screen } from "@testing-library/react";
import React from "react";
import { ConfStats } from "../../src/components/ConfStats";
import { renderWithProviders } from "../../src/utils/test-utils";

describe("ConfStats component", () => {
  it("renders the component with correct app numbers", () => {
    renderWithProviders(<ConfStats />);
    expect(screen.getByText("appNum (4)")).toBeDefined();
  });

  it("renders the pie chart with correct data", () => {
    renderWithProviders(<ConfStats />);
    expect(screen.getByText("SAML : 1")).toBeDefined();
    expect(screen.getByText("oidc : 1")).toBeDefined();
    expect(screen.getByText("cas : 1")).toBeDefined();
  });
});
