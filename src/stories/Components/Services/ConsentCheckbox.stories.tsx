import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { useState } from "react";

import { ConsentCheckbox } from "~components";
import { CONSENT_CHECKBOX_TEXT } from "~constants/mock/ConsentCheckbox";

import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Services/ConsentCheckbox",
  component: ConsentCheckbox,
  parameters: {
    layout: "centered",
    docs: { story: { height: "400px" } },
  },
  tags: ["autodocs"],
  argTypes: {
    lang: { control: "select", options: ["ru", "kk", "en"] },
    isChecked: { table: { disable: true } },
    isHintShown: { control: "boolean" },
    setIsChecked: { table: { disable: true } },
  },
  args: {
    lang: "ru",
    modalText: CONSENT_CHECKBOX_TEXT.MODAL_TEXT,
    isChecked: false,
    setIsChecked: () => undefined,
  },
  render: (args) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    return (
      <div
        style={{ display: "grid", placeItems: "center", minHeight: "376px" }}
      >
        <CardWrapperItem>
          <ConsentCheckbox
            {...args}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </CardWrapperItem>
      </div>
    );
  },
} satisfies Meta<typeof ConsentCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { isHintShown: true },
};

export const CustomTexts: Story = {
  args: {
    label: CONSENT_CHECKBOX_TEXT.LABEL,
    actionLabel: CONSENT_CHECKBOX_TEXT.ACTION_LABEL,
  },
};
