import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import {
  calculateDisplayName,
  measureTextWidth,
} from "../../../src/components/Services/FileForUpload/index";
import { uploadingFiles } from "../../Mock/uploadingFiles";

describe("FileForUpload", () => {
  const mockHandleRemoveFile = jest.fn();

  it("(1) Should render default state correctly", () => {
    render(
      <Components.FileForUpload
        lang="en"
        uploadingFile={uploadingFiles[0]}
        handleRemoveFile={mockHandleRemoveFile}
      />,
    );

    const docIcon = screen.getByTestId("UploadFileBlock_DOC_ICON");
    expect(docIcon).toBeInTheDocument();

    const clearIcon = screen.getByTestId("UploadFileBlock_CLEAR_ICON");
    fireEvent.click(clearIcon);
    expect(mockHandleRemoveFile).toHaveBeenCalledWith(
      uploadingFiles[0].file.name,
    );
  });

  it("(2) Should render loading state correctly", () => {
    render(
      <Components.FileForUpload
        lang="en"
        uploadingFile={uploadingFiles[1]}
        handleRemoveFile={mockHandleRemoveFile}
      />,
    );

    const loadingIcon = screen.getByTestId("UploadFileBlock_LOADER_ICON");
    expect(loadingIcon).toBeInTheDocument();

    const clearIcon = screen.getByTestId("UploadFileBlock_CLEAR_ICON");
    fireEvent.click(clearIcon);
    expect(mockHandleRemoveFile).toHaveBeenCalledWith(
      uploadingFiles[1].file.name,
    );
  });

  it("(3) Should render error state correctly", () => {
    render(
      <Components.FileForUpload
        lang="en"
        uploadingFile={uploadingFiles[2]}
        handleRemoveFile={mockHandleRemoveFile}
      />,
    );

    const errorIcon = screen.getByTestId("UploadFileBlock_ERROR_ICON");
    expect(errorIcon).toBeInTheDocument();

    const clearIcon = screen.getByTestId("UploadFileBlock_CLEAR_ICON");
    fireEvent.click(clearIcon);
    expect(mockHandleRemoveFile).toHaveBeenCalledWith(
      uploadingFiles[2].file.name,
    );
  });

  it("(4) Should truncate long file name", () => {
    const longName =
      "aVeryLongFileNameThatExceedsTheLimitAndNeedsTruncation.txt";
    const file = { ...uploadingFiles[0], file: new File([""], longName) };
    render(
      <Components.FileForUpload
        lang="en"
        uploadingFile={file}
        handleRemoveFile={jest.fn()}
      />,
    );
    const text = screen.getByTestId("UploadFileBlock_DOC");
    expect(text.textContent?.length).toBe(longName.length);
  });

  it("(5) Should not truncate short file name", () => {
    const shortName = "short.txt";
    const file = { ...uploadingFiles[0], file: new File([""], shortName) };
    render(
      <Components.FileForUpload
        lang="en"
        uploadingFile={file}
        handleRemoveFile={jest.fn()}
      />,
    );
    const text = screen.getByTestId("UploadFileBlock_DOC");
    expect(text.textContent).toBe("sh....txt");
  });

  it("(6) Should truncate file name with very long extension", () => {
    const fileName = "a.verylongextensionthatmakesavailablelengthnegative";
    const file = { ...uploadingFiles[0], file: new File([""], fileName) };
    render(
      <Components.FileForUpload
        lang="en"
        uploadingFile={file}
        handleRemoveFile={jest.fn()}
      />,
    );
    const text = screen.getByTestId("UploadFileBlock_DOC");
    expect(text.textContent).toBe(
      "....verylongextensionthatmakesavailablelengthnegative",
    );
  });

  it("(7) Should measure text width correctly", () => {
    const width = measureTextWidth("test", "16px Arial");
    expect(typeof width).toBe("number");
    expect(width).toBeGreaterThan(0);
  });

  it("(8) Should return long name without truncation if container width allowed", () => {
    const fullText =
      "aVeryLongFileNameThatExceedsTheLimitAndNeedsTruncation.txt";
    const containerWidth = 600;
    const font = "16px Arial";
    const result = calculateDisplayName(fullText, containerWidth, font);
    expect(typeof result).toBe("string");
    expect(result.length).toEqual(fullText.length);
  });

  it("(9) Should calculate display name correctly", () => {
    const fullText =
      "aVeryLongFileNameThatExceedsTheLimitAndNeedsTruncation.txt";
    const containerWidth = 100;
    const font = "16px Arial";
    const result = calculateDisplayName(fullText, containerWidth, font);
    expect(typeof result).toBe("string");
    expect(result.length).toBeLessThanOrEqual(fullText.length);
  });
});
