import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { useState } from "react";
import { fn } from "storybook/test";

import {
  ConfirmationCodeModal,
  type IConfirmationCodeModalProps,
} from "~components";

const RESEND_DELAY_MS = 59_000;
const INVALID_CODE = "00000";

const StatefulConfirmationCodeModal = (args: IConfirmationCodeModalProps) => {
  const [resendAvailableAt, setResendAvailableAt] = useState(
    () => Date.now() + RESEND_DELAY_MS,
  );

  const handleResend = () => {
    args.onResend();
    setResendAvailableAt(Date.now() + RESEND_DELAY_MS);
  };

  return (
    <ConfirmationCodeModal
      {...args}
      resendAvailableAt={resendAvailableAt}
      onResend={handleResend}
    />
  );
};

const meta = {
  title: "Components/Identity/ConfirmationCodeModal",
  component: ConfirmationCodeModal,
  parameters: { docs: { story: { height: "600px" } } },
  tags: ["autodocs"],
  argTypes: {
    lang: { control: "select", options: ["ru", "kk", "en"] },
    resendAvailableAt: { control: false },
  },
  args: {
    lang: "ru",
    maskedPhone: "+7 707 *** ** 07",
    codeLength: 5,
    resendAvailableAt: 0,
    onBack: fn(),
    onSubmit: fn((code, setErrorText) => {
      if (code === INVALID_CODE) {
        setErrorText("Введённый OTP-код неверен.");
      }
    }),
    onResend: fn(),
  },
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(true);

    const handleBack = () => {
      args.onBack();
      setIsOpen(false);
    };

    return (
      <>
        {isOpen && (
          <StatefulConfirmationCodeModal {...args} onBack={handleBack} />
        )}
      </>
    );
  },
} satisfies Meta<typeof ConfirmationCodeModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Kazakh: Story = {
  args: {
    lang: "kk",
    onSubmit: fn((code, setErrorText) => {
      if (code === INVALID_CODE) {
        setErrorText("Енгізілген OTP-код қате.");
      }
    }),
  },
};
