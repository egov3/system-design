import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { useArgs } from "storybook/preview-api";

import { ConsentCheckbox } from "~components";
import { CONSENT_CHECKBOX_TEXT } from "~constants/mock/ConsentCheckbox";

import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Services/ConsentCheckbox",
  component: ConsentCheckbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    lang: { control: "select", options: ["ru", "kk", "en"] },
    isChecked: { control: "boolean" },
    setIsChecked: { table: { disable: true } },
  },
  args: {
    lang: "ru",
    label: CONSENT_CHECKBOX_TEXT.LABEL,
    actionLabel: CONSENT_CHECKBOX_TEXT.ACTION_LABEL,
    modalTitle: CONSENT_CHECKBOX_TEXT.MODAL_TITLE,
    modalText: CONSENT_CHECKBOX_TEXT.MODAL_TEXT,
    isChecked: false,
    setIsChecked: () => undefined,
  },
  render: (args) => {
    const [{ isChecked }, updateArgs] = useArgs();

    return (
      <CardWrapperItem>
        <ConsentCheckbox
          {...args}
          isChecked={isChecked}
          setIsChecked={(value) => updateArgs({ isChecked: value })}
        />
      </CardWrapperItem>
    );
  },
} satisfies Meta<typeof ConsentCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hintText: CONSENT_CHECKBOX_TEXT.HINT,
  },
};
