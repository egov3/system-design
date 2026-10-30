import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ImageOverlay } from "~baseComponents";

describe("ImageOverlay", () => {
  it("(1) Should render the image and call onClick on the button click", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(
      <ImageOverlay
        src="photo.jpg"
        alt="Фотография"
        button={{
          icon: <svg data-testid="ImageOverlay_ICON" />,
          ariaLabel: "Скачать",
          onClick,
        }}
      />,
    );

    expect(screen.getByTestId("ImageOverlay_IMAGE")).toHaveAttribute(
      "src",
      "photo.jpg",
    );
    expect(screen.getByTestId("ImageOverlay_ICON")).toBeInTheDocument();

    await user.click(screen.getByTestId("ImageOverlay_BUTTON"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
