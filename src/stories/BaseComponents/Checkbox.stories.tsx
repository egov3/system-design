"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useArgs } from "storybook/preview-api";
import { Checkbox } from "../../baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    setChecked: { table: { disable: true } },
  },
  args: {
    label: "Даю согласие на сбор и обработку данных",
    checked: false,
    disabled: false,
    setChecked: () => undefined,
  },
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();

    return (
      <CardWrapperItem>
        <Checkbox
          {...args}
          checked={checked}
          setChecked={(value) => updateArgs({ checked: value })}
        />
      </CardWrapperItem>
    );
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
