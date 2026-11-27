import { fireEvent, render, screen } from "@testing-library/react";

import { MobileDocumentViewer } from "../../src/components/MobileDocumentViewer";

describe("MobileDocumentViewer", () => {
  it("(1) Should show document actions and loading state", () => {
    const onBack = jest.fn();
    const onShare = jest.fn();
    const props = {
      title: "Документ заявки №101000000004945",
      backLabel: "Вернуться",
      shareLabel: "Поделиться",
      onBack,
      onShare,
      isLoading: false,
      children: <div data-testid="Document_CONTENT">PDF</div>,
    };
    const { rerender } = render(<MobileDocumentViewer {...props} />);

    expect(
      screen.getByTestId("MobileDocumentViewer_HEADER"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("MobileDocumentViewer_BODY")).toBeInTheDocument();
    expect(screen.queryByRole("main")).not.toBeInTheDocument();
    expect(screen.getByTestId("MobileDocumentViewer_TITLE")).toHaveTextContent(
      props.title,
    );
    expect(screen.getByTestId("Document_CONTENT")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: props.backLabel }));
    fireEvent.click(screen.getByRole("button", { name: props.shareLabel }));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onShare).toHaveBeenCalledTimes(1);

    rerender(<MobileDocumentViewer {...props} isLoading onShare={undefined} />);
    expect(
      screen.getByTestId("MobileDocumentViewer_LOADING"),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("Document_CONTENT")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: props.shareLabel })).toBeNull();
  });
});
