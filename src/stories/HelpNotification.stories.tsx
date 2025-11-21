import { Icons } from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "~baseComponents";
import { Components } from "~components";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "HelpNotification",
  component: Components.HelpNotification,
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
            width: "600px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Components.HelpNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Icons.General.Search />,
    ariaLabel: "Help Notification",
    dataTestid: "HelpNotification_DEFAULT",
    children: (
      <BaseComponents.Typography tag="span" fontClass="body2Regular">
        This is a help notification. It provides additional information when
        hovered over or clicked.
      </BaseComponents.Typography>
    ),
  },
};
