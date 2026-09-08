import { NotificationsIllustration } from "@egov3/graphics/Illustrations/Notifications";
import { SignErrorIllustration } from "@egov3/graphics/Illustrations/SignError";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { ErrorModal } from "~components";
import { CardWrapperItem } from "../CardWrapperItem";

const meta: Meta<typeof ErrorModal> = {
  title: "Components/ErrorModal",
  component: ErrorModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    isOpen: true,
    lang: "ru",
    status: 500,
    message: "Произошла непредвиденная ошибка",
  },
  argTypes: {
    isOpen: { control: "boolean" },
    lang: { control: "select", options: ["ru", "kk", "en"] },
    status: { control: "number" },
    message: { control: "text" },
    title: { control: "text" },
    illustration: { control: false },
    footerButtons: { control: "object" },
    onClose: { action: "onClose" },
  },
  render: (args) => (
    <CardWrapperItem>
      <div
        style={{
          height: "500px",
          width: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorModal {...args} />
      </div>
    </CardWrapperItem>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Произошла непредвиденная ошибка при обработке запроса",
  },
};

export const AuthError: Story = {
  args: {
    status: 401,
    message: undefined,
    footerButtons: [
      {
        text: "Авторизоваться",
        onClick: () => {},
        dataTestid: "ErrorModal_AUTH_BTN",
      },
    ],
  },
};

export const WithoutMessage: Story = {
  args: {
    status: 404,
    message: undefined,
  },
};

export const WithConfirmAction: Story = {
  args: {
    status: 412,
    message: "Сведения о выбранном лице не найдены.",
    footerButtons: [
      {
        text: "Актуализировать сведения",
        onClick: () => {},
        dataTestid: "ErrorModal_CONFIRM_BTN",
      },
      {
        text: "Отмена",
        onClick: () => {},
        dataTestid: "ErrorModal_CANCEL_BTN",
        variant: "secondary",
      },
    ],
  },
};

export const KazakhLanguage: Story = {
  args: {
    lang: "kk",
    message: "Жүйеде қате орын алды",
  },
};

export const EnglishLanguage: Story = {
  args: {
    lang: "en",
    message: "System error occurred",
  },
};

export const WithCustomTitleAndIllustration: Story = {
  args: {
    title: "Не удалось подтвердить номер",
    message: "Проверьте данные и попробуйте снова.",
    illustration: <NotificationsIllustration />,
    footerButtons: [
      {
        text: "Попробовать снова",
        onClick: () => {},
        dataTestid: "ErrorModal_RETRY_BTN",
      },
      {
        text: "Отменить",
        onClick: () => {},
        dataTestid: "ErrorModal_CANCEL_BTN",
        variant: "secondary",
      },
    ],
  },
};

export const OtpAttemptsExceeded: Story = {
  args: {
    message:
      "Превышено количество попыток ввода кода. Повторите попытку позже.",
    illustration: <SignErrorIllustration />,
    footerButtons: [
      {
        text: "Вернуться",
        onClick: () => {},
        dataTestid: "ErrorModal_RETURN_BTN",
      },
    ],
  },
};
