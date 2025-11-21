import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";
import type { IMsgDataItem } from "~interfaces/CustomersMsg";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "CustomersMsg",
  component: Components.CustomersMsg,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            maxWidth: "1000px",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Components.CustomersMsg>;

export default meta;

type Story = StoryObj<typeof meta>;

const msgItems: IMsgDataItem[] = [
  {
    owner: "EGOV",
    id: 123456789,
    description: [
      {
        text: "Some very important information.",
        type: "info",
      },
      {
        text: "Please read it carefully.",
        type: "default",
      },
      {
        text: "This is an additional note.",
        type: "inProgress",
      },
      { text: "Thank you for your attention.", type: "success" },
    ],
    time: "14:30",
    date: "2024-10-01",
    msgType: "NOTIFICATIONS",
  },
  {
    owner: "CUSTOMER",
    id: "987654321",
    description: [
      {
        text: "Your request has been received.",
        type: "success",
      },
    ],
    time: "15:45",
    date: "2024-10-01",
    msgType: "REQUEST_HISTORY",
  },
];

export const EGOV: Story = {
  args: {
    msgItem: msgItems[0],
  },
};

export const CUSTOMER: Story = {
  args: {
    msgItem: msgItems[1],
  },
};
