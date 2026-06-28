import { SearchIcon } from "@egov3/graphics/General/Search";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Typography } from "~baseComponents";
import { HelpNotification } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Messages/HelpNotification",
  component: HelpNotification,
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
} satisfies Meta<typeof HelpNotification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <SearchIcon />,
    ariaLabel: "Help Notification",
    dataTestid: "HelpNotification_DEFAULT",
    children: (
      <Typography tag="span" fontClass="body2Regular">
        This is a help notification. It provides additional information when
        hovered over or clicked.
      </Typography>
    ),
  },
};
