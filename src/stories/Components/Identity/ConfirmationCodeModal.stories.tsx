import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import { ConfirmationCodeModal } from "~components";

const meta = {
  title: "Components/Identity/ConfirmationCodeModal",
  component: ConfirmationCodeModal,
  parameters: { docs: { story: { height: "600px" } } },
  tags: ["autodocs"],
  args: {
    lang: "ru",
    isOpen: true,
    maskedPhone: "+7 707 *** ** 07",
    codeLength: 5,
    setIsOpen: fn(),
    onSubmit: fn((code, setErrorText) => {
      if (code === "00000") {
        setErrorText("Введённый OTP-код неверен.");
      }
    }),
  },
  render: (args) => <>{args.isOpen && <ConfirmationCodeModal {...args} />}</>,
} satisfies Meta<typeof ConfirmationCodeModal>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
