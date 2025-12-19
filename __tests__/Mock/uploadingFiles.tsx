export const uploadingFiles = [
  {
    file: new File(
      ["file content"],
      "very long document name that should be truncated.pdf",
      {
        type: "application/pdf",
      },
    ),
    fileId: "1",
    isLoading: false,
    isError: false,
  },
  {
    file: new File(["file content"], "uploadingDocument.pdf", {
      type: "application/pdf",
    }),
    fileId: "2",
    isLoading: true,
    isError: false,
  },
  {
    file: new File(["file content"], "uploadingErrorDocument.pdf", {
      type: "application/pdf",
    }),
    fileId: "3",
    isLoading: false,
    isError: true,
  },
];
