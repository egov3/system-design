import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { NotificationItem } from "~components";

const meta: Meta<typeof NotificationItem> = {
  title: "Components/Notification/NotificationItem",
  component: NotificationItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          height: "80px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: "radio",
      options: ["success", "error", "warning", "info"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof NotificationItem>;

export const Success: Story = {
  args: {
    text: "Success notification",
    type: "success",
  },
};

export const ErrorState: Story = {
  args: {
    text: "Error notification",
    type: "error",
  },
};

export const Warning: Story = {
  args: {
    text: "Warning notification",
    type: "warning",
  },
};

export const Info: Story = {
  args: {
    text: "Info notification",
    type: "info",
  },
};
