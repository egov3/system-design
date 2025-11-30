import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";
import { msgItems } from "../../../../__tests__/Mock/msgItems";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Messages/MsgByType",
  component: Components.MsgByType,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ backgroundColor: "#fff" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Components.MsgByType>;

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
