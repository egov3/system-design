import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";

const meta: Meta<typeof Components.ProfileHealthGeneral> = {
  title: "ProfileHealthGeneral",
  component: Components.ProfileHealthGeneral,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    lang: "ru",
    attachedClinic: [
      {
        title: "Наименование медицинской организации",
        value: "ТОО “Поликлиника “CITY”",
      },
      {
        title: "Участковый врач",
        value: "Закирова Гульшат Аманбекова",
      },
    ],
    compulsoryHealthInsurance: [
      {
        title: "Статус",
        value: "Застрахован",
      },
      {
        title: "Вид последнего платежа",
        value:
          "Взнос на обязательное социальное медицинское страхование (КНП=122)",
      },
    ],
  },
  argTypes: {
    lang: {
      control: { type: "select" },
      options: ["ru", "kk", "en"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMoreData: Story = {
  args: {
    attachedClinic: [
      {
        title: "Наименование медицинской организации",
        value: "ТОО “Поликлиника “CITY”",
      },
      {
        title: "Участковый врач",
        value: "Закирова Гульшат Аманбекова",
      },
      {
        title: "Номер участка",
        value: "8 общей практики",
      },
      {
        title: "Дата прикрепления",
        value: "10.04.2023",
      },
    ],
    compulsoryHealthInsurance: [
      {
        title: "Статус",
        value: "Застрахован",
      },
      {
        title: "Вид последнего платежа",
        value:
          "Взнос на обязательное социальное медицинское страхование (КНП=122)",
      },
      {
        title: "Плательщик взноса",
        value: "АО БАРСАКЕЛМЕС",
      },
      {
        title: "Дата направления последнего платежа",
        value: "21 августа 2024",
      },
    ],
  },
};

export const EmptyData: Story = {
  args: {
    attachedClinic: [],
    compulsoryHealthInsurance: [],
  },
};

export const SingleItem: Story = {
  args: {
    attachedClinic: [
      {
        title: "Наименование медицинской организации",
        value: "ТОО “Поликлиника “CITY”",
      },
    ],
    compulsoryHealthInsurance: [
      {
        title: "Статус",
        value: "Застрахован",
      },
    ],
  },
};
