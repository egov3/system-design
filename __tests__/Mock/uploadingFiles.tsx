export const uploadingFiles = [
  {
    id: "1",
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
    id: "2",
    file: new File(["file content"], "uploadingDocument.pdf", {
      type: "application/pdf",
    }),
    fileId: "2",
    isLoading: true,
    isError: false,
  },
  {
    id: "3",
    file: new File(["file content"], "uploadingErrorDocument.pdf", {
      type: "application/pdf",
    }),
    fileId: "3",
    isLoading: false,
    isError: true,
  },
];
