import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import type { IUploadedFile } from "src/components/Services/FileForUpload";

import { UploadFile } from "~components";

const createUploadedFile = (id: string, name: string): IUploadedFile => ({
  id,
  fileId: `file-${id}`,
  file: new File(["content"], name, { type: "application/pdf" }),
  isLoading: false,
  isError: false,
});

describe("UploadFile", () => {
  const defaultProps = {
    label: "Прикрепить файл",
    lang: "ru" as const,
    accept: ".pdf,application/pdf",
    onSelect: jest.fn(),
    onRemove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("(1) Should render an empty single file", () => {
    const { container } = render(<UploadFile {...defaultProps} files={[]} />);

    expect(screen.getByTestId("UPLOAD_FILE_WRAPPER")).toBeInTheDocument();
    expect(screen.getByTestId("UPLOAD_BUTTON_LABEL")).toHaveTextContent(
      "Прикрепить файл",
    );
    expect(screen.queryByTestId("UPLOAD_FILE_LIST")).not.toBeInTheDocument();

    const input =
      container.querySelector<HTMLInputElement>('input[type="file"]');
    expect(input).toHaveAttribute("accept", ".pdf,application/pdf");
    expect(input).not.toHaveAttribute("multiple");
    expect(input).toBeEnabled();

    const clickSpy = jest.spyOn(input!, "click").mockImplementation();
    fireEvent.click(screen.getByTestId("UPLOAD_BUTTON_FILE"));
    expect(clickSpy).toHaveBeenCalledTimes(1);

    fireEvent.change(input!, { target: { files: null } });
    expect(defaultProps.onSelect).not.toHaveBeenCalled();
  });

  it("(2) Should render a single uploaded file", () => {
    const uploadedFile = createUploadedFile("1", "example.pdf");
    const { container } = render(
      <UploadFile {...defaultProps} files={uploadedFile} />,
    );

    expect(screen.getByTestId("UPLOAD_FILE_LIST")).toBeInTheDocument();
    expect(screen.getByLabelText("example")).toBeInTheDocument();
    expect(screen.queryByTestId("UPLOAD_BUTTON_FILE")).not.toBeInTheDocument();
    expect(
      container.querySelector<HTMLInputElement>('input[type="file"]'),
    ).toBeDisabled();
  });

  it("(3) Should render multiple files and keep the add button visible", () => {
    const files = [
      createUploadedFile("1", "example1.pdf"),
      createUploadedFile("2", "example2.pdf"),
    ];
    const { container } = render(
      <UploadFile {...defaultProps} files={files} isMultiple />,
    );
    expect(screen.getAllByTestId("UploadFileBlock_FILE")).toHaveLength(2);
    expect(screen.getByTestId("UPLOAD_BUTTON_FILE")).toBeEnabled();
    expect(
      container.querySelector<HTMLInputElement>('input[type="file"]'),
    ).toHaveAttribute("multiple");
  });

  it("(4) Should select only the first file in single-file mode", async () => {
    const onSelect = jest.fn();
    const firstFile = new File(["first"], "example1.pdf", {
      type: "application/pdf",
    });
    const secondFile = new File(["second"], "example2.pdf", {
      type: "application/pdf",
    });
    const uploadedFile = createUploadedFile("1", "document.pdf");

    const { container } = render(
      <UploadFile {...defaultProps} files={uploadedFile} onSelect={onSelect} />,
    );
    const input =
      container.querySelector<HTMLInputElement>('input[type="file"]');

    fireEvent.change(input!, { target: { files: [firstFile, secondFile] } });
    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith([firstFile]);
    });
  });

  it("(5) Should select all files in multiple true", async () => {
    const onSelect = jest.fn();
    const firstFile = new File(["first"], "first.pdf");
    const secondFile = new File(["second"], "second.pdf");

    const { container } = render(
      <UploadFile
        {...defaultProps}
        files={[]}
        isMultiple
        onSelect={onSelect}
      />,
    );
    const input =
      container.querySelector<HTMLInputElement>('input[type="file"]');

    fireEvent.change(input!, { target: { files: [firstFile, secondFile] } });

    await waitFor(() => {
      expect(onSelect).toHaveBeenCalledWith([firstFile, secondFile]);
    });
  });

  it("(6) Should remove a file", () => {
    const onRemove = jest.fn();
    const uploadedFile = createUploadedFile("1", "document.pdf");

    render(
      <UploadFile {...defaultProps} files={uploadedFile} onRemove={onRemove} />,
    );
    fireEvent.click(screen.getByTestId("UploadFileBlock_CLEAR_ICON"));
    expect(onRemove).toHaveBeenCalledWith("1", "file-1");
  });

  it("(7) Should disable select and remove when disabled", () => {
    const onRemove = jest.fn();
    const onSelect = jest.fn();
    const uploadedFile = createUploadedFile("1", "document.pdf");
    const selectedFile = new File(["content"], "example.pdf");

    const { container } = render(
      <UploadFile
        {...defaultProps}
        files={[uploadedFile]}
        isMultiple
        isDisabled
        onSelect={onSelect}
        onRemove={onRemove}
      />,
    );
    expect(screen.getByTestId("UPLOAD_BUTTON_FILE")).toBeDisabled();
    const input =
      container.querySelector<HTMLInputElement>('input[type="file"]');
    expect(input).toBeDisabled();

    fireEvent.click(screen.getByTestId("UploadFileBlock_CLEAR_ICON"));
    fireEvent.change(input!, { target: { files: [selectedFile] } });

    expect(onRemove).not.toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
  });
});
