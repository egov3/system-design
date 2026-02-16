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
  argTypes: {
    length: { control: "number" },
    code: { control: "object" },
    isFocused: { control: "boolean" },
    "aria-label": { control: "text" },
    setIsFocused: { control: "object" },
    handleInputChange: { control: "object" },
    handleKeyDown: { control: "object" },
    hintText: { control: "text" },
    isError: { control: "boolean" },
  },
  args: {
    length: 6,
    code: [],
    isFocused: false,
    "aria-label": "Поле для кода",
    setIsFocused: () => {},
    handleInputChange: () => () => {},
    handleKeyDown: () => () => {},
  },
} satisfies Meta<typeof BaseComponents.InputFieldGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveInputFieldGroup = () => {
  const length = 6;
  const [code, setCode] = useState<string[]>(new Array(length).fill(""));
  const [isFocused, setIsFocused] = useState<boolean>(false);

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
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "16px",
        }}
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
            isFocused={isFocused}
            aria-label="Поле для кода"
            setIsFocused={setIsFocused}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    </CardWrapperItem>
  );
};

export const Default: Story = {
  args: {
    length: 6,
    code: [],
    isFocused: false,
    "aria-label": "Поле для кода",
    setIsFocused: () => {},
    handleInputChange: () => () => {},
    handleKeyDown: () => () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    return <InteractiveInputFieldGroup />;
  },
};

export const WithHintText: Story = {
  args: {
    length: 6,
    code: [],
    isFocused: false,
    "aria-label": "Поле для кода",
    setIsFocused: () => {},
    handleInputChange: () => () => {},
    handleKeyDown: () => () => {},
    hintText: "Hint Text",
  },
};

export const WithError: Story = {
  args: {
    length: 6,
    code: [],
    isFocused: false,
    "aria-label": "Поле для кода",
    setIsFocused: () => {},
    handleInputChange: () => () => {},
    handleKeyDown: () => () => {},
    isError: true,
    hintText:
      "Код не верный, попробуйте еще раз! При вводе неправильного SMS-кода регистрация будет заблокирована, количество попыток 3.",
  },
};
