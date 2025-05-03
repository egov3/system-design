// InputField.stories.tsx
import Icons from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import React, { useRef, useState } from "react";
import { Components } from "~components";
import { CardWrapperItem } from "./CardWrapperItem";
import { CreateArray } from "~utils/CreateArray";
import { SetCharAt } from "~utils/string/SetCharAt";

const meta = {
  title: "InputField",
  component: Components.InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    onChange: fn(),
    ariaLabel: "",
  },
} satisfies Meta<typeof Components.InputField>;

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
        fill={"#9CA3AF"}
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
    placeholder: "000-000-000-000",
    value: "",
    id: "Label",
    labelText: "ИИН*",
    ariaLabel: "поле ввода ИИН",
  },
};

const InputGroupComponent = () => {
  const [codeLabel, setCodeLabel] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const [code, setCode] = useState<string>("".padStart(6, " "));
  const pushCodeLength = 6;
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleComplete = (str: string) => {
    setCodeLabel(str);
  };

  const handleInputChange =
    (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (!/^\d*$/.test(value)) return;

      console.log("idx = ", idx);
      console.log("code = ", code);
      console.log("event.target.value = ", event.target.value);

      const updatedCode = SetCharAt(code, idx, value);
      setCode(updatedCode);

      if (value && idx < pushCodeLength - 1) {
        inputsRef.current[idx + 1]?.focus();
      }

      if (updatedCode.trim().length === pushCodeLength) {
        handleComplete(updatedCode.trim());
      }
    };

  const handleKeyDown =
    (idx: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Backspace" && !code[idx] && idx > 0) {
        inputsRef.current[idx - 1]?.focus();
      }
    };

  return (
    <CardWrapperItem>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
        }}
      >
        <Components.Typography
          tag="span"
          fontClass="Heading3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Code {codeLabel}
        </Components.Typography>
        <div
          data-testid="InputField_GROUP"
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          {CreateArray(pushCodeLength).map((_val, idx) => (
            <Components.InputField
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              onKeyDown={handleKeyDown(idx)}
              focused={focused}
              setFocused={setFocused}
              value={code[idx]}
              type={"number"}
              key={_val}
              onChange={handleInputChange(idx)}
              id={`inputCode_${code[idx]}`}
              labelText=""
              ariaLabel="поле для кода"
            />
          ))}
        </div>
      </div>
    </CardWrapperItem>
  );
};

export const InputGroup = () => <InputGroupComponent />;
