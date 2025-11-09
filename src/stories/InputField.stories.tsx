// InputField.stories.tsx
import { Icons } from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useRef, useState } from "react";
import { fn } from "storybook/test";
import { CreateArray } from "~utils/CreateArray";
import { SetCharAt } from "~utils/string/SetCharAt";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

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

      const updatedCode = SetCharAt(code, idx, value).trim();

      console.log("idx = ", idx);
      console.log("code = ", code);
      console.log("event.target.value = ", event.target.value);
      console.log("updatedCode = ", JSON.stringify(updatedCode));
      console.log("pushCodeLength = ", pushCodeLength);

      setCode(updatedCode);

      if (value && updatedCode.length < pushCodeLength) {
        inputsRef.current[updatedCode.length]?.focus();
      }

      if (updatedCode.length === pushCodeLength) {
        handleComplete(updatedCode);
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
        <BaseComponents.Typography
          tag="span"
          fontClass="heading3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          Code {codeLabel}
        </BaseComponents.Typography>
        <div
          data-testid="InputField_GROUP"
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          {CreateArray(pushCodeLength).map((_val, idx) => (
            <BaseComponents.InputField
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
              variant="code"
            />
          ))}
        </div>
      </div>
    </CardWrapperItem>
  );
};

export const InputGroup = () => <InputGroupComponent />;
