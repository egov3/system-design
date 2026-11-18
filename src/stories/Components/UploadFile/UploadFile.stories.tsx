import type { Meta, StoryObj } from "@storybook/react";

import { type ComponentProps, useState } from "react";

import type { IUploadedFile } from "src/components/Services/FileForUpload";

import { UploadFile } from "~components";

const mockFile = (
  name: string,
  isLoading = false,
  isError = false,
): IUploadedFile => ({
  id: name,
  fileId: name,
  file: new File(["example"], name, { type: "application/pdf" }),
  isLoading,
  isError,
});

const Example = ({
  files: initialFiles,
  isMultiple = false,
  ...props
}: ComponentProps<typeof UploadFile>) => {
  const [files, setFiles] = useState<IUploadedFile[] | IUploadedFile>(
    initialFiles,
  );

  return (
    <UploadFile
      {...props}
      files={files}
      isMultiple={isMultiple}
      onSelect={(selected) => {
        const next = (isMultiple ? selected : selected.slice(0, 1)).map(
          (file) => {
            const id = crypto.randomUUID();
            return { id, fileId: id, file, isLoading: false, isError: false };
          },
        );
        setFiles((previous) =>
          isMultiple ? [...(previous as IUploadedFile[]), ...next] : next[0],
        );
      }}
      onRemove={(id) =>
        setFiles((previous) =>
          isMultiple
            ? (previous as IUploadedFile[]).filter((file) => file.id !== id)
            : [],
        )
      }
    />
  );
};

const meta = {
  title: "Components/UploadFile",
  component: UploadFile,
  parameters: { layout: "padded" },
  render: (args) => <Example {...args} />,
  args: {
    label: "Прикрепить файл",
    lang: "ru",
    accept: ".pdf,application/pdf",
    files: [],
    onSelect: () => {},
    onRemove: () => {},
  },
} satisfies Meta<typeof UploadFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Multiple: Story = { args: { isMultiple: true } };
export const Disabled: Story = { args: { isDisabled: true } };
export const Loading: Story = { args: { isLoading: true } };
export const Uploaded: Story = {
  args: { files: mockFile("technical-passport.pdf") },
};
export const Uploading: Story = {
  args: { files: mockFile("technical-passport.pdf", true) },
};
export const ErrorState: Story = {
  args: { files: mockFile("technical-passport.pdf", false, true) },
};
