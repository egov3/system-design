import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { BaseComponents } from "~baseComponents";

describe("SearchBar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

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

  it("(6) Should call handleModalOpen when clicking input with handleModalOpen prop", () => {
    const handleModalOpen = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        handleModalOpen={handleModalOpen}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.click(input);

    expect(handleModalOpen).toHaveBeenCalled();
    expect(input).toHaveAttribute("readonly");
  });

  it("(7) Should NOT handle Enter when input is readonly (has handleModalOpen)", () => {
    const handleOnEnter = jest.fn();
    const handleModalOpen = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        handleModalOpen={handleModalOpen}
        handleOnEnter={handleOnEnter}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    expect(input).toHaveAttribute("readonly");

    fireEvent.change(input, { target: { value: "test" } });
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

  it("(10) Should apply body2Regular class for slim variant", () => {
    render(<BaseComponents.SearchBar lang={"ru"} variant="slim" />);
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

  it("(14) Should NOT call handleModalOpen when disabled even with handleModalOpen prop", () => {
    const handleModalOpen = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
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

  it("(19) Should handle input click when handleModalOpen is provided", () => {
    const handleModalOpen = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        handleModalOpen={handleModalOpen}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.click(input);

    expect(handleModalOpen).toHaveBeenCalled();
  });

  it("(20) Should NOT call handleModalOpen when handleModalOpen is not provided", () => {
    render(<BaseComponents.SearchBar lang={"ru"} />);

    const input = screen.getByTestId("SearchBar_INPUT");

    expect(() => fireEvent.click(input)).not.toThrow();
    expect(input).not.toHaveAttribute("readonly");
  });

  it("(21) Should handle input click normally without handleModalOpen", async () => {
    const handleOnChange = jest.fn();

    render(
      <BaseComponents.SearchBar lang={"ru"} handleOnChange={handleOnChange} />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");

    fireEvent.click(input);
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(handleOnChange).toHaveBeenCalledWith("test");
    });
  });

  it("(22) Should call handleOnChange with debounce", () => {
    const handleOnChange = jest.fn();

    render(
      <BaseComponents.SearchBar lang={"ru"} handleOnChange={handleOnChange} />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");

    fireEvent.change(input, { target: { value: "test" } });
    expect(handleOnChange).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(handleOnChange).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(handleOnChange).toHaveBeenCalledWith("test");
  });

  it("(23) Should NOT show clear button when handleModalOpen is provided", () => {
    const handleModalOpen = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        handleModalOpen={handleModalOpen}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.change(input, { target: { value: "test" } });

    expect(screen.queryByTestId("SearchBar_CLEAR_BUTTON")).toBeNull();
  });

  it("(24) Should apply correct classes for shadow variant", () => {
    render(<BaseComponents.SearchBar lang={"ru"} variant="shadow" />);

    const wrapper = screen.getByTestId("SearchBar_INPUT_CONTAINER_WRAPPER");
    expect(wrapper.className).toContain("inputContainer--shadow");
  });

  it("(25) Should call handleOnClear when clearing input", () => {
    const handleOnClear = jest.fn();
    const handleOnChange = jest.fn();

    render(
      <BaseComponents.SearchBar
        lang={"ru"}
        handleOnClear={handleOnClear}
        handleOnChange={handleOnChange}
      />,
    );

    const input = screen.getByTestId("SearchBar_INPUT");
    fireEvent.change(input, { target: { value: "test" } });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    const clearBtn = screen.getByTestId("SearchBar_CLEAR_BUTTON");
    fireEvent.click(clearBtn);

    expect(handleOnClear).toHaveBeenCalled();
    expect(handleOnChange).toHaveBeenCalledWith("");
  });
});
