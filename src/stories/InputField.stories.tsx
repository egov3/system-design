// InputField.stories.tsx
import { Icons } from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { BaseComponents } from "../baseComponents";

const meta = {
  title: "InputField",
  component: BaseComponents.InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onChange: fn(),
    ariaLabel: "",
  },
} satisfies Meta<typeof BaseComponents.InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "text",
    id: "Default",
    labelText: "",
  },
};

export const LeftIcon: Story = {
  args: {
    value: "text",
    inputLeftIcon: (
      <Icons.General.Search
        width={23}
        height={23}
        fill={"#9CA3AF"}
        style={{
          paddingRight: "10px",
        }}
      />
    ),
    id: "LeftIcon",
    labelText: "",
  },
};

export const IsClearable: Story = {
  args: {
    value: "text",
    isClearable: true,
    inputLeftIcon: (
      <Icons.General.Search
        width={23}
        height={23}
        fill="#9CA3AF"
        style={{
          paddingRight: "10px",
        }}
      />
    ),
    id: "IsClearable",
    labelText: "",
  },
};

export const Label: Story = {
  args: {
    type: "text",
    value: "",
    id: "Label",
    labelText: "ИИН*",
    ariaLabel: "поле ввода ИИН",
  },
};

export const IsClearableLabeled: Story = {
  args: {
    value: "text",
    isClearable: true,
    id: "IsClearable",
  },
};
