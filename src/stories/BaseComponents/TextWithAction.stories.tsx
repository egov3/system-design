"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import {
  type ITextWithActionProps,
  TextWithAction,
} from "src/baseComponents/TextWithAction";
import { fn } from "storybook/test";
import type { ILangGeneric } from "~interfaces/common";
import { CardWrapperItem } from "../CardWrapperItem";

type TStoryProps = ITextWithActionProps & {
  lang: keyof ILangGeneric<string>;
  textTemplates: ILangGeneric<string>;
};

const requirementTemplates: ILangGeneric<string> = {
  ru: "Перед загрузкой ознакомьтесь с @action<Требованиями к фотографии> и @action<Требованиями к образцу подписи>",
  kk: "Жүктемес бұрын @action<Фотосуретке қойылатын талаптар> және @action<Үлгіге қойылатын талаптар> бөлімдерімен танысыңыз",
  en: "Before uploading, please review the @action<Photo Requirements> and @action<Signature Sample Requirements>",
};

const meta = {
  title: "BaseComponents/TextWithAction",
  component: TextWithAction,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ backgroundColor: "#ffffff", width: "600px" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  render: ({ lang, textTemplates, ...props }) => (
    <TextWithAction {...props} textTemplate={textTemplates[lang]} />
  ),
  args: {
    lang: "ru",
    textTemplate: requirementTemplates.ru,
    textTemplates: requirementTemplates,
    actions: [fn(), fn()],
    fontClass: "body2Regular",
  },
  argTypes: {
    lang: { control: "select", options: ["ru", "kk", "en"] },
    textTemplate: { table: { disable: true } },
    textTemplates: { control: "object" },
    fontClass: { control: "text" },
  },
} satisfies Meta<TStoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Russian: Story = {
  args: {
    lang: "ru",
  },
};

export const Kazakh: Story = {
  args: {
    lang: "kk",
  },
};

export const English: Story = {
  args: {
    lang: "en",
  },
};

export const WithoutActions: Story = {
  args: {
    actions: undefined,
  },
};
