import { render, screen } from "@testing-library/react";
import { BaseComponents } from "~baseComponents";
import { i18n } from "~constants/i18n";

describe("LoadingSkeleton", () => {
  it("(1) Should render skeleton title placeholder", () => {
    render(
      <BaseComponents.LoadingSkeleton title={i18n.LoadingSkeleton.title.ru} />,
    );

    expect(screen.getByTestId("SectionLoadingSkeleton")).toBeInTheDocument();
    expect(
      screen.getByTestId("SectionLoadingSkeleton_TITLE"),
    ).toBeInTheDocument();
  });

  it("(2) Should render visible title", () => {
    render(
      <BaseComponents.LoadingSkeleton
        isTitleVisible
        title={i18n.LoadingSkeleton.title.ru}
      />,
    );

    expect(screen.getByText(i18n.LoadingSkeleton.title.ru)).toBeInTheDocument();
  });
});
