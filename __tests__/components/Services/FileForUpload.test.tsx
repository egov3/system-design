import { fireEvent, render, screen } from "@testing-library/react";
import { Components } from "~components";
import { uploadingFiles } from "../../Mock/uploadingFiles";

describe("FileForUpload", () => {
  const mockHandleRemoveFile = jest.fn();

  test("(1) Should render default state correctly", () => {
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

  test("(2) Should render loading state correctly", () => {
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

  test("(3) Should render error state correctly", () => {
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
});
