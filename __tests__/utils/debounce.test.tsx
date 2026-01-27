import { debounce } from "~utils/debounce";

describe("debounce", () => {
  let mockFunc: jest.Mock;
  beforeEach(() => {
    mockFunc = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("(1) Should call the function after the specified delay", () => {
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc("1");
    jest.advanceTimersByTime(1000);

    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(mockFunc).toHaveBeenCalledWith("1");
  });

  it("(2) Should call only once if called multiple times within the delay", () => {
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc("1");
    debouncedFunc("2");
    jest.advanceTimersByTime(1000);

    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(mockFunc).toHaveBeenCalledWith("2");
  });

  it("(3) Should call multiple times if called multiple times after the delay", () => {
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc("1");
    jest.advanceTimersByTime(1000);
    debouncedFunc("2");
    jest.advanceTimersByTime(1000);

    expect(mockFunc).toHaveBeenCalledTimes(2);
    expect(mockFunc).toHaveBeenNthCalledWith(1, "1");
    expect(mockFunc).toHaveBeenNthCalledWith(2, "2");
  });

  it("(4) Should dont call the function if cancel is called", () => {
    const debouncedFunc = debounce(mockFunc, 1000);

    debouncedFunc("1");
    jest.advanceTimersByTime(999);
    debouncedFunc.cancel();

    expect(mockFunc).toHaveBeenCalledTimes(0);
  });
});
