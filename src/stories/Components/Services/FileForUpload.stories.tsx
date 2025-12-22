import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/internal/test";
import { Components } from "~components";
import { uploadingFiles } from "../../../../__tests__/Mock/uploadingFiles";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Services/FileForUpload",
  component: Components.FileForUpload,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            width: "300px",
            height: "50px",
            backgroundColor: "#fff",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {},
  args: {
    lang: "ru",
    handleRemoveFile: fn(),
  },
} satisfies Meta<typeof Components.FileForUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    uploadingFile: uploadingFiles[0],
  },
};

export const LoadingState: Story = {
  args: {
    uploadingFile: uploadingFiles[1],
  },
};

export const ErrorState: Story = {
  args: {
    uploadingFile: uploadingFiles[2],
  },
};
