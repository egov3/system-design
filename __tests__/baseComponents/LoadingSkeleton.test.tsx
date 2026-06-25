import { render, screen } from "@testing-library/react";
import { LoadingSkeleton } from "~baseComponents";
import { i18n } from "~constants/i18n";

describe("LoadingSkeleton", () => {
  it("(1) Should render title and default cards", () => {
    render(<LoadingSkeleton title={i18n.LoadingSkeleton.title.ru} />);

    expect(screen.getByTestId("SectionLoadingSkeleton")).toBeInTheDocument();
    expect(
      screen.getByTestId("SectionLoadingSkeleton_TITLE"),
    ).toHaveTextContent(i18n.LoadingSkeleton.title.ru);
    expect(screen.getAllByTestId("SectionLoadingSkeleton_ITEM")).toHaveLength(
      2,
    );
    expect(screen.getAllByTestId("SectionLoadingSkeleton_ICON")).toHaveLength(
      2,
    );
    expect(screen.getAllByTestId("SectionLoadingSkeleton_TEXT")).toHaveLength(
      2,
    );
    expect(
      screen.getAllByTestId("SectionLoadingSkeleton_TEXT_SHORT"),
    ).toHaveLength(2);
  });

  it("(2) Should render custom number of cards without title", () => {
    render(<LoadingSkeleton cardsCount={3} />);

    expect(
      screen.queryByTestId("SectionLoadingSkeleton_TITLE"),
    ).not.toBeInTheDocument();
    expect(screen.getAllByTestId("SectionLoadingSkeleton_ITEM")).toHaveLength(
      3,
    );
  });

  it("(3) Should control shimmer and loading title", () => {
    const { rerender } = render(
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

    rerender(<LoadingSkeleton title={i18n.LoadingSkeleton.title.ru} />);

    expect(
      screen.getByTestId("SectionLoadingSkeleton_TITLE"),
    ).toHaveTextContent(i18n.LoadingSkeleton.title.ru);
  });
});
