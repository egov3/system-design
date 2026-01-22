import { fireEvent, render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("SearhBar", () => {
  it("(1) Should call handleOnEnter on Enter with trimmed value", () => {
    const handleOnEnter = jest.fn();

    render(
      <BaseComponents.SearchBar lang={"ru"} handleOnEnter={handleOnEnter} />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");

    fireEvent.change(input, { target: { value: " hello " } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleOnEnter).toHaveBeenCalledWith("hello");
  });

  it("(2) Should NOT call handleOnEnter if value is empty", () => {
    const handleOnEnter = jest.fn();

    render(
      <BaseComponents.SearchBar lang={"ru"} handleOnEnter={handleOnEnter} />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleOnEnter).not.toHaveBeenCalled();
  });

  it("(3) Should clear input and call handleOnEnter with empty string", () => {
    const handleOnEnter = jest.fn();

    render(
      <BaseComponents.SearchBar lang={"ru"} handleOnEnter={handleOnEnter} />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.change(input, { target: { value: "text" } });

    const clearBtn = screen.getByTestId("SearchBar_CLEAR_BUTTON");
    fireEvent.click(clearBtn);

    expect(input).toHaveValue("");
    expect(handleOnEnter).toHaveBeenCalledWith("");
  });

  it("(4) Should show loader when loading=true", () => {
    render(<BaseComponents.SearchBar lang={"ru"} loading />);

    expect(screen.getByTestId("SearchBar_LOADING_ICON")).toBeInTheDocument();
    expect(screen.queryByTestId("SearchBar_SEARCH_ICON")).toBeNull();
  });

  it("(5) Should not trigger Enter or Clear when disabled", () => {
    const handleOnEnter = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        disabled
        handleOnEnter={handleOnEnter}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");

    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleOnEnter).not.toHaveBeenCalled();
  });

  it("(6) Should call handleModalOpen when clicking input in modal variant", () => {
    const handleModalOpen = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        variant="modal"
        handleModalOpen={handleModalOpen}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");

    fireEvent.click(input);

    expect(handleModalOpen).toHaveBeenCalled();
    expect(input).toHaveAttribute("readonly");
  });

  it("(7) Should NOT handle Enter in modal variant", () => {
    const handleOnEnter = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        variant="modal"
        handleOnEnter={handleOnEnter}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleOnEnter).not.toHaveBeenCalled();
  });

  it("(8) Should NOT call handleOnEnter if disabled", () => {
    const handleOnEnter = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        handleOnEnter={handleOnEnter}
        disabled
      />,
    );
    const input = screen.getByTestId("SearchBar_INPUT");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleOnEnter).not.toHaveBeenCalled();
  });

  it("(9) Should NOT call handleOnEnter if loading", () => {
    const handleOnEnter = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        handleOnEnter={handleOnEnter}
        loading
      />,
    );
    const input = screen.getByTestId("SearchBar_INPUT");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleOnEnter).not.toHaveBeenCalled();
  });

  it("(10) Should apply body2Regular class for chat variant", () => {
    render(<BaseComponents.SearchBar lang={"ru"} variant="chat" />);
    const input = screen.getByTestId("SearchBar_INPUT");

    expect(input.className).toContain("body2Regular");
  });

  it("(11) Should not show clear button when showClearButton=false", () => {
    render(<BaseComponents.SearchBar lang={"ru"} showClearButton={false} />);
    const input = screen.getByTestId("SearchBar_INPUT");

    fireEvent.change(input, { target: { value: "test" } });

    expect(screen.queryByTestId("SearchBar_CLEAR_BUTTON")).toBeNull();
  });

  it("(12) Should initialize with defaultValue", () => {
    render(
      <BaseComponents.SearchBar lang={"ru"} defaultValue="initial value" />,
    );
    const input = screen.getByTestId("SearchBar_INPUT");

    expect(input).toHaveValue("initial value");
  });

  it("(13) Should apply default variant styling", () => {
    render(<BaseComponents.SearchBar lang={"ru"} variant="default" />);
    const input = screen.getByTestId("SearchBar_INPUT");

    expect(input.className).toContain("body1Regular");
  });

  it("(14) Should NOT call handleModalOpen when disabled in modal variant", () => {
    const handleModalOpen = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        variant="modal"
        disabled
        handleModalOpen={handleModalOpen}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.click(input);

    expect(handleModalOpen).not.toHaveBeenCalled();
  });

  it("(15) Should clear input without calling handleOnEnter when handleOnEnter is not provided", () => {
    render(<BaseComponents.SearchBar lang={"ru"} />);

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.change(input, { target: { value: "test" } });

    const clearBtn = screen.getByTestId("SearchBar_CLEAR_BUTTON");
    fireEvent.click(clearBtn);

    expect(input).toHaveValue("");
  });

  it("(16) Should NOT clear input when disabled", () => {
    const handleOnEnter = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        disabled
        handleOnEnter={handleOnEnter}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.change(input, { target: { value: "test" } });

    const clearBtn = screen.getByTestId("SearchBar_CLEAR_BUTTON");
    fireEvent.click(clearBtn);

    expect(input).toHaveValue("test");
    expect(handleOnEnter).not.toHaveBeenCalled();
  });

  it("(17) Should NOT clear input when loading", () => {
    const handleOnEnter = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        loading
        handleOnEnter={handleOnEnter}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.change(input, { target: { value: "test" } });

    const clearBtn = screen.getByTestId("SearchBar_CLEAR_BUTTON");
    fireEvent.click(clearBtn);

    expect(input).toHaveValue("test");
    expect(handleOnEnter).not.toHaveBeenCalled();
  });

  it("(18) Should NOT handle non-Enter key presses", () => {
    const handleOnEnter = jest.fn();

    render(
      <BaseComponents.SearchBar lang={"ru"} handleOnEnter={handleOnEnter} />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.keyDown(input, { key: "Space" });

    expect(handleOnEnter).not.toHaveBeenCalled();
  });

  it("(19) Should handle input click in modal variant", () => {
    const handleModalOpen = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        variant="shadow"
        handleModalOpen={handleModalOpen}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.click(input);

    expect(handleModalOpen).toHaveBeenCalled();
  });

  it("(20) Should NOT call handleModalOpen when handleModalOpen is not provided in modal variant", () => {
    render(<BaseComponents.SearchBar lang={"ru"} variant="shadow" />);

    const input = screen.getByTestId("SearchBar_INPUT");

    expect(() => fireEvent.click(input)).not.toThrow();
  });

  it("(21) Should NOT handle input click in non-modal variant", () => {
    const handleModalOpen = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        variant="default"
        handleModalOpen={handleModalOpen}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.click(input);

    expect(handleModalOpen).not.toHaveBeenCalled();
  });
});
