import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { SettingsOutlineIcon } from "@egov3/graphics/Additional/SettingsOutline";
import { fn } from "storybook/test";

import { DropDownMenu } from "~baseComponents";

const meta = {
  title: "BaseComponents/DropDownMenu",
  component: DropDownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items: [
      {
        icon: <SettingsOutlineIcon />,
        text: "Default",
        action: fn(),
      },
      {
        icon: <SettingsOutlineIcon />,
        text: "Default",
        action: fn(),
      },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropDownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDisabledItem: Story = {
  args: {
    items: [
      {
        icon: <SettingsOutlineIcon />,
        text: "Default",
        action: fn(),
      },
      {
        icon: <SettingsOutlineIcon />,
        text: "Hover",
        action: fn(),
      },
      {
        icon: <SettingsOutlineIcon />,
        text: "Disabled",
        action: fn(),
        disabled: true,
      },
    ],
  },
};
