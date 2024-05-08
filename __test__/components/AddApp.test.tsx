import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import AddApp from "../../src/components/managerComponents/AddApp";
import { renderWithProviders } from "../../src/utils/test-utils";

describe("AddApp component", () => {
  it("renders without crashing", () => {
    renderWithProviders(<AddApp />);
  });

  it("toggles the popup when Button is clicked", async () => {
    renderWithProviders(<AddApp />);

    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(screen.getByText("", { selector: ".addButton" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
