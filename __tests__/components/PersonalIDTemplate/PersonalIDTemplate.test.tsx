import { render, screen } from "@testing-library/react";
import { PersonalIDTemplate } from "~components";

const defaultProps = {
  userPhoto: "user-photo.png",
  userSign: "user-sign.png",
};

describe("PersonalIDTemplate", () => {
  it("(1) Should render the user photo and signature with the provided sources", () => {
    render(<PersonalIDTemplate {...defaultProps} />);

    expect(screen.getByTestId("PersonalIDTemplate_PHOTO")).toHaveAttribute(
      "src",
      "user-photo.png",
    );
    expect(screen.getByTestId("PersonalIDTemplate_SIGN")).toHaveAttribute(
      "src",
      "user-sign.png",
    );
  });
});
