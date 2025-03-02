import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Components } from "~components";

const setIsOpen = jest.fn();

describe("SelectBox", () => {
  it("(1) Should render corectly", () => {
    render(
      <Components.SelectBoxButton
        setIsOpen={setIsOpen}
        modalValue={"select value"}
        labelText="SelectBox"
        disabled={false}
        error={false}
      />
    );

    expect(screen.getByText("SelectBox")).toBeInTheDocument();
    expect(screen.getByText("select value")).toBeInTheDocument();

    const button = screen.getByTestId("SelectBoxModal_BUTTON");

    fireEvent.click(button);
  });

  it("(2) Should render when error = true", () => {
    render(
      <Components.SelectBoxButton
        setIsOpen={setIsOpen}
        modalValue={"select value"}
        labelText="SelectBox"
        disabled={false}
        error={true}
      />
    );

    const selectElement = screen.getByTestId("SelectBoxModal_VALUE");
    expect(selectElement).toBeInTheDocument();
  });
});
