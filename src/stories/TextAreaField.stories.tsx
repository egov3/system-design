import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useRef, useState } from "react";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "TextareaField",
  component: BaseComponents.TextareaField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    id: "Default",
    value: "text",
    labelText: "",
    ariaLabel: "textarea",
  },
} satisfies Meta<typeof BaseComponents.TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Expandable: Story = {
  args: {
    id: "Expandable",
    labelText: "Label",
    ariaLabel: "Поле для ввода",
    variant: "default",
  },
  render: (args) => {
    const [value, setValue] = useState<string>("");
    const [focused, setFocused] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    };

    return (
      <CardWrapperItem>
        <div
          style={{ background: "#fff", borderRadius: "12px", padding: "16px" }}
        >
          <BaseComponents.TextareaField
            {...args}
            ref={textareaRef}
            value={value}
            focused={focused}
            setFocused={setFocused}
            onChange={handleChange}
          />
        </div>
      </CardWrapperItem>
    );
  },
};
