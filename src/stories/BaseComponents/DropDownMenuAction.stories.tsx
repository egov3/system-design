import type { Meta, StoryObj } from "@storybook/react";

import { EditIcon } from "@egov3/graphics/General/Edit";
import { MoreIcon } from "@egov3/graphics/General/More";
import { TrashIcon } from "@egov3/graphics/General/Trash";

import { DropDownMenuAction } from "../../baseComponents/DropDownMenuAction";
import { CardWrapperItem } from "../CardWrapperItem";

const meta: Meta<typeof DropDownMenuAction> = {
  title: "BaseComponents/DropDownMenuAction",
  component: DropDownMenuAction,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DropDownMenuAction>;

export const Default: Story = {
  args: {
    icon: <MoreIcon />,
    items: [
      {
        icon: <EditIcon />,
        text: "Редактировать",
        action: () => console.log("Edit"),
      },
      {
        icon: <TrashIcon />,
        text: "Удалить",
        action: () => console.log("Delete"),
      },
    ],
  },
  render: (args) => (
    <CardWrapperItem>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DropDownMenuAction {...args} />
      </div>
    </CardWrapperItem>
  ),
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
};
