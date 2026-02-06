import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";

const meta: Meta<typeof Components.NotificationComponent> = {
  title: "Components/NotificationComponent",
  component: Components.NotificationComponent,
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
    toggleNotification: {
      action: "toggleNotification",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Components.NotificationComponent>;

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
