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
    maskedPhone: "+7 707 *** ** 07",
    codeLength: 5,
    onBack: fn(),
    onSubmit: fn((code, setErrorText) => {
      if (code === "00000") {
        setErrorText("Введённый OTP-код неверен.");
      }
    }),
  },
} satisfies Meta<typeof ConfirmationCodeModal>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
