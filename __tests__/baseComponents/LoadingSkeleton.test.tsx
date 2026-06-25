import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";

describe("LoadingSkeleton", () => {
  it("(1) Should render title skeleton and default cards", () => {
    render(<BaseComponents.LoadingSkeleton title="Услуги" />);

    expect(screen.getByTestId("SectionLoadingSkeleton")).toBeInTheDocument();
    expect(screen.getByTestId("SectionLoadingSkeleton_TITLE")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(
      screen.getByTestId("SectionLoadingSkeleton_TITLE"),
    ).toBeEmptyDOMElement();
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
    render(<BaseComponents.LoadingSkeleton cardsCount={3} />);

    expect(
      screen.queryByTestId("SectionLoadingSkeleton_TITLE"),
    ).not.toBeInTheDocument();
    expect(screen.getAllByTestId("SectionLoadingSkeleton_ITEM")).toHaveLength(
      3,
    );
  });

  it("(3) Should control shimmer and visible title", () => {
    const { rerender } = render(
      <BaseComponents.LoadingSkeleton
        isShimmerVisible={false}
        title="Услуги"
      />,
    );

    expect(screen.getByTestId("SectionLoadingSkeleton_TITLE")).toHaveClass(
      "withoutShimmer",
    );

    rerender(<BaseComponents.LoadingSkeleton isTitleVisible title="Услуги" />);

    expect(
      screen.getByTestId("SectionLoadingSkeleton_TITLE"),
    ).toHaveTextContent("Услуги");
  });
});
