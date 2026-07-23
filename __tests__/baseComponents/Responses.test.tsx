import { fireEvent, render, screen } from "@testing-library/react";
import { Responses } from "~baseComponents";

describe("Responses", () => {
  it("(1) Should render text without a document", () => {
    render(<Responses documents={[]} text="Information" />);

    expect(screen.getByText("Information")).toBeInTheDocument();
    expect(screen.queryByTestId("Responses_LABEL")).not.toBeInTheDocument();
    expect(screen.queryByTestId("Responses_DOCUMENT")).not.toBeInTheDocument();
  });

  it("(2) Should render a document without text", () => {
    render(
      <Responses
        documents={[
          {
            id: "result",
            name: "result.pdf",
            ariaLabel: "Download result",
            fileType: "SUCCESS",
            onClick: jest.fn(),
            isDisabled: false,
          },
        ]}
      />,
    );

    expect(screen.getByText("result.pdf")).toBeInTheDocument();
    expect(screen.queryByTestId("Responses_LABEL")).not.toBeInTheDocument();
    expect(screen.queryByTestId("StatusText_TEXT")).not.toBeInTheDocument();
  });

  it("(3) Should render text and a document together", () => {
    render(
      <Responses
        label="Status"
        documents={[
          {
            id: "error",
            name: "error.pdf",
            ariaLabel: "Download error",
            fileType: "ERROR",
            onClick: jest.fn(),
            isDisabled: false,
          },
        ]}
        text="Request rejected"
        textType="ERROR"
      />,
    );

    expect(screen.getByText("error.pdf")).toBeInTheDocument();
    expect(screen.getByText("Request rejected")).toBeInTheDocument();
    expect(screen.getByTestId("StatusTextError_ICON")).toBeInTheDocument();
  });

  it("(4) Should render multiple documents and handles document actions", () => {
    const handleDownload = jest.fn();

    render(
      <Responses
        documents={[
          {
            id: "first",
            name: "first.pdf",
            ariaLabel: "Download first document",
            fileType: "SUCCESS",
            onClick: handleDownload,
            isDisabled: false,
          },
          {
            id: "second",
            name: "second.pdf",
            ariaLabel: "Download second document",
            fileType: "SUCCESS",
            onClick: jest.fn(),
            isDisabled: true,
          },
        ]}
      />,
    );

    const documentButtons = screen.getAllByTestId("Responses_DOCUMENT");

    expect(documentButtons).toHaveLength(2);
    expect(documentButtons[0]).toHaveAttribute(
      "aria-label",
      "Download first document",
    );
    expect(documentButtons[1]).toBeDisabled();

    fireEvent.click(documentButtons[0]);
    expect(handleDownload).toHaveBeenCalledTimes(1);
  });

  it("(5) Should render a document hint when provided", () => {
    render(
      <Responses
        documents={[
          {
            id: "result",
            name: "result.pdf",
            ariaLabel: "Download result",
            fileType: "SUCCESS",
            hint: "Signed electronically",
            onClick: jest.fn(),
            isDisabled: false,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("Responses_HINT")).toHaveTextContent(
      "Signed electronically",
    );
  });
});
