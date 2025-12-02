import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";
import { msgItems } from "../../../../__tests__/Mock/msgItems";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Messages/MsgBody",
  component: Components.MsgBody,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ width: "400px" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: { lang: "ru", handleDetailsClick: () => {} },
} satisfies Meta<typeof Components.MsgBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InProgressMessage: Story = {
  args: {
    msgItem: msgItems[0],
  },
};

export const SuccessMessage: Story = {
  args: {
    msgItem: msgItems[1],
  },
};

export const ErrorMessage: Story = {
  args: {
    msgItem: msgItems[2],
  },
};

export const NotificationMessage: Story = {
  args: {
    msgItem: msgItems[3],
  },
};

export const ReadMessage: Story = {
  args: {
    msgItem: msgItems[1],
  },
};
