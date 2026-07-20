import { render, screen } from "@testing-library/react";
import { LoadingSkeleton } from "~baseComponents";
import { i18n } from "~constants/i18n";

describe("LoadingSkeleton", () => {
  it("(1) Should render visible title by default", () => {
    render(
      <LoadingSkeleton title={i18n.LoadingSkeleton.title.ru} />,
    );

    expect(screen.getByTestId("SectionLoadingSkeleton")).toBeInTheDocument();
    expect(screen.getByText(i18n.LoadingSkeleton.title.ru)).toBeInTheDocument();
  });

  it("(2) Should render loading title placeholder", () => {
    render(
      <LoadingSkeleton
        isTitleLoading
        isShimmerVisible={false}
        title={i18n.LoadingSkeleton.title.ru}
      />,
    );

    expect(screen.getByTestId("SectionLoadingSkeleton_TITLE")).toHaveClass(
      "withoutShimmer",
    );
    expect(
      screen.getByTestId("SectionLoadingSkeleton_TITLE"),
    ).toBeEmptyDOMElement();
  });
});
