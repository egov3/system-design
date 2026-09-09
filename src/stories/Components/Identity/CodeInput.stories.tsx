import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useEffect, useState } from "react";
import { fn } from "storybook/test";
import { CodeInput, type ICodeInputProps, IdentityModal } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const CODE_LENGTH = 5;
const RESEND_TIMEOUT = 59;

const useCodeState = (initialCode: string[]) => {
  const [code, setCode] = useState<string[]>(initialCode);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCode((prev) => {
        const copy = [...prev];
        copy[index] = event.target.value.replaceAll(/\D/g, "").slice(0, 1);
        return copy;
      });
    };

  return { code, setCode, handleInputChange };
};

const StatefulCodeInput = (args: ICodeInputProps) => {
  const { code, handleInputChange } = useCodeState(args.code);

  return (
    <CodeInput {...args} code={code} handleInputChange={handleInputChange} />
  );
};

const CodeInputWithResendTimer = (args: ICodeInputProps) => {
  const { code, setCode, handleInputChange } = useCodeState(args.code);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timerId = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [secondsLeft]);

  const formattedTime = `${Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0")}:${(secondsLeft % 60).toString().padStart(2, "0")}`;

  return (
    <CodeInput
      {...args}
      code={code}
      handleInputChange={handleInputChange}
      errorText={code.join("") === "00000" ? "Введённый OTP-код неверен." : ""}
      resendButton={{
        label:
          secondsLeft > 0
            ? `Отправить код повторно (${formattedTime})`
            : "Отправить код повторно",
        isDisabled: secondsLeft > 0,
        onClick: () => {
          setCode(new Array(CODE_LENGTH).fill(""));
          setSecondsLeft(RESEND_TIMEOUT);
        },
      }}
    />
  );
};

const meta = {
  title: "Components/Identity/CodeInput",
  component: CodeInput,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <IdentityModal lang="ru" handleLogoClick={fn()} goBackService={fn()}>
          <Story />
        </IdentityModal>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    lang: { control: "select", options: ["ru", "kk", "en"] },
    title: { control: "text" },
    description: { control: "text" },
    errorText: { control: "text" },
    code: { control: "object" },
    resendButton: { control: "object" },
    handleInputChange: { control: false },
  },
  args: {
    lang: "ru",
    title: "Введите код подтверждения",
    description:
      "Введите код подтверждения, отправленный на номер +7 (707) 707-70-07",
    code: new Array(CODE_LENGTH).fill(""),
    handleInputChange: () => fn(),
  },
  render: (args) => <StatefulCodeInput {...args} />,
} satisfies Meta<typeof CodeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => <CodeInputWithResendTimer {...args} />,
};

export const WithError: Story = {
  args: {
    code: ["1", "2", "3", "4", "5"],
    errorText:
      "Введённый OTP-код неверен. Пожалуйста, проверьте код и попробуйте снова.",
    resendButton: {
      label: "Отправить код повторно",
      onClick: fn(),
    },
  },
};

export const WithoutResendButton: Story = {
  args: {
    title: "Подтверждение номера телефона",
    description: "Введите код из SMS, отправленный на номер +7 (705)-хх-хх-317",
  },
};

export const PushDescription: Story = {
  args: {
    code: new Array(6).fill(""),
    description: (
      <>
        Введите код подтверждения, отправленный на ваше мобильное приложение
        eGov. В случае отсутствия мобильного приложения нажмите{" "}
        <button type="button" style={{ color: "var(--text-accent)" }}>
          Запросить SMS-код
        </button>
      </>
    ),
  },
};
