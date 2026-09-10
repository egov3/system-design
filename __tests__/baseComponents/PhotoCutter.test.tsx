import { fireEvent, render, screen } from "@testing-library/react";
import { PhotoCutter } from "~baseComponents";

const loadImage = (naturalWidth: number, naturalHeight: number): void => {
  const image = screen.getByTestId("PhotoCutter_IMAGE");
  Object.defineProperty(image, "naturalWidth", { value: naturalWidth });
  Object.defineProperty(image, "naturalHeight", { value: naturalHeight });
  fireEvent.load(image);
};

describe("PhotoCutter", () => {
  const defaultProps = {
    src: "photo.png",
    ratio: 35 / 45,
  };

  it("(1) Should hold the crop window back until the photo reports its size", () => {
    render(<PhotoCutter {...defaultProps} />);
    expect(screen.queryByTestId("PhotoCutter_FRAME")).not.toBeInTheDocument();
    expect(screen.getByTestId("PhotoCutter_IMAGE")).toHaveAttribute(
      "src",
      "photo.png",
    );
  });

  it("(2) Should publish the photo's own ratio and place the window by percent", () => {
    render(<PhotoCutter {...defaultProps} ratio={350 / 100} />);
    loadImage(784, 1004);

    expect(
      screen
        .getByTestId("PhotoCutter_MEDIA")
        .style.getPropertyValue("--media-ratio"),
    ).toBe(String(784 / 1004));

    const { style } = screen.getByTestId("PhotoCutter_FRAME");
    for (const value of [style.left, style.top, style.width, style.height]) {
      expect(value).toMatch(/%$/);
    }
  });

  it("(3) Should mark the crop area with four corners", () => {
    render(<PhotoCutter {...defaultProps} />);
    loadImage(784, 1004);

    const corners = screen
      .getByTestId("PhotoCutter_FRAME")
      .querySelectorAll("[data-ord]");
    expect(
      [...corners].map((corner) => corner.getAttribute("data-ord")),
    ).toEqual(["nw", "ne", "se", "sw"]);
  });
});
