// InputFieldGroup.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useRef, useState } from "react";
import { SetCharAt } from "~utils/string/SetCharAt";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "InputFieldGroup",
  component: BaseComponents.InputFieldGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    length: 6,
    code: [],
    focused: false,
    ariaLabel: "Поле для кода",
    setFocused: () => {},
    handleInputChange: () => () => {},
    handleKeyDown: () => () => {},
  },
} satisfies Meta<typeof BaseComponents.InputFieldGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [code, setCode] = useState<string>("".padStart(6, " "));
    const [focused, setFocused] = useState<boolean>(false);
    const [completedCode, setCompletedCode] = useState<string>("");
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const length = 6;

    const handleComplete = (str: string) => setCompletedCode(str);

    const handleInputChange =
      (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!/^\d*$/.test(value)) return;

        const updatedCode = SetCharAt(code, idx, value).trim();
        setCode(updatedCode);

        if (value && updatedCode.length < length) {
          inputsRef.current[updatedCode.length]?.focus();
        }

        if (updatedCode.length === length) {
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
            Code: {completedCode}
          </BaseComponents.Typography>

          <div
            style={{ display: "flex", gap: "8px" }}
            data-testid="InputField_GROUP"
          >
            <BaseComponents.InputFieldGroup
              length={length}
              code={code.split("")}
              focused={focused}
              ariaLabel="Поле для кода"
              setFocused={setFocused}
              handleInputChange={handleInputChange}
              handleKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </CardWrapperItem>
    );
  },
};
