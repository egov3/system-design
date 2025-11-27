// InputFieldGroup.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "../../baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/InputFieldGroup",
  component: BaseComponents.InputFieldGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    length: 6,
    code: [],
    focused: false,
    "aria-label": "Поле для кода",
    setFocused: () => {},
    handleInputChange: () => () => {},
    handleKeyDown: () => () => {},
  },
} satisfies Meta<typeof BaseComponents.InputFieldGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const length = 6;
    const [code, setCode] = useState<string[]>(new Array(length).fill(""));
    const [focused, setFocused] = useState<boolean>(false);

    const handleInputChange =
      (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode((prev) => {
          const copy = [...prev];
          copy[index] = e.target.value;
          return copy;
        });
      };

    return (
      <CardWrapperItem>
        <div
          style={{ background: "#fff", borderRadius: "12px", padding: "16px" }}
        >
          <BaseComponents.Typography
            tag="span"
            fontClass="heading3"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "12px",
            }}
          >
            Code: {code}
          </BaseComponents.Typography>

          <div
            style={{ display: "flex", gap: "8px" }}
            data-testid="InputField_GROUP"
          >
            <BaseComponents.InputFieldGroup
              length={length}
              code={code}
              focused={focused}
              aria-label="Поле для кода"
              setFocused={setFocused}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
      </CardWrapperItem>
    );
  },
};
