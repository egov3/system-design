import type { Meta, StoryObj } from "@storybook/react";

import { EditIcon } from "@egov3/graphics/General/Edit";
import { MoreIcon } from "@egov3/graphics/General/More";
import { TrashIcon } from "@egov3/graphics/General/Trash";

import { DropDownMenuAction } from "../../baseComponents/DropDownMenuAction";
import { Table } from "../../baseComponents/Table";
import { TableCell } from "../../baseComponents/Table/TableCell";
import { TableHead } from "../../baseComponents/Table/TableHead";
import { TableHeadCell } from "../../baseComponents/Table/TableHeadCell";
import { TableRow } from "../../baseComponents/Table/TableRow";
import { CardWrapperItem } from "../CardWrapperItem";

const meta: Meta<typeof DropDownMenuAction> = {
  title: "BaseComponents/DropDownMenuAction",
  component: DropDownMenuAction,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DropDownMenuAction>;

const equipments = [
  {
    id: 1,
    equipment: "Газовая плита",
    type: "Четырёхконфорочная",
    quantity: 1,
    gasConsumption: 1.2,
  },
  {
    id: 2,
    equipment: "Газовый котёл",
    type: "Настенный",
    quantity: 2,
    gasConsumption: 2.5,
  },
  {
    id: 3,
    equipment: "Водонагреватель",
    type: "Проточный",
    quantity: 1,
    gasConsumption: 1.8,
  },
];

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

export const WithTable: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableHeadCell isNoEllipsis>№</TableHeadCell>
        <TableHeadCell isNoEllipsis>Оборудование</TableHeadCell>
        <TableHeadCell isNoEllipsis>Тип оборудования</TableHeadCell>
        <TableHeadCell isNoEllipsis>Количество</TableHeadCell>
        <TableHeadCell isNoEllipsis>Расход газа</TableHeadCell>
        <TableHeadCell align="center" isNoEllipsis>
          Действия
        </TableHeadCell>
      </TableHead>

      <tbody>
        {equipments.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell isNoEllipsis>{index + 1}</TableCell>
            <TableCell isNoEllipsis>{item.equipment}</TableCell>
            <TableCell isNoEllipsis>{item.type}</TableCell>
            <TableCell isNoEllipsis>{item.quantity}</TableCell>
            <TableCell isNoEllipsis>{item.gasConsumption}</TableCell>
            <TableCell align="center" isNoEllipsis>
              <DropDownMenuAction
                icon={<MoreIcon />}
                items={[
                  {
                    icon: <EditIcon />,
                    text: "Редактировать",
                    action: () => console.log("Edit", item),
                  },
                  {
                    icon: <TrashIcon />,
                    text: "Удалить",
                    action: () => console.log("Delete", item),
                  },
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  ),
};
