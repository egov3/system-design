// InputField.stories.tsx
import { Icons } from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useRef, useState } from "react";
import { fn } from "storybook/test";
import { BaseComponents } from "~baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/InputField",
  component: BaseComponents.InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onChange: fn(),
    "aria-label": "aria",
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
    "aria-label": "поле ввода ИИН",
  },
};

export const IsClearableLabeled: Story = {
  args: {
    value: "text",
    isClearable: true,
    id: "IsClearable",
  },
};

const InteractiveInputField = (args: typeof Interactive.args) => {
  const [value, setValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <CardWrapperItem>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <BaseComponents.Typography
          tag="span"
          fontClass="body1Regular"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "12px",
          }}
        >
          Value: {value}
        </BaseComponents.Typography>
        <BaseComponents.InputField
          {...args}
          ref={inputRef}
          value={value}
          focused={focused}
          setFocused={setFocused}
          onChange={handleChange}
        />
      </div>
    </CardWrapperItem>
  );
};

export const Interactive: Story = {
  args: {
    value: "text",
    id: "Interactive",
  },
  render: (args) => {
    return <InteractiveInputField {...args} />;
  },
};
