import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { S022OfferTable } from "~components";
import { S022_OFFER_TABLE_VACANCIES } from "~constants/mock/S022/S022OfferTable";

import { CardWrapperItem } from "../../../CardWrapperItem";

const meta = {
  title: "Components/Services/S022/S022OfferTable",
  component: S022OfferTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    lang: "ru",
    vacancies: S022_OFFER_TABLE_VACANCIES,
  },
  argTypes: {
    lang: {
      control: "inline-radio",
      options: ["ru", "kk", "en"],
    },
  },
  render: (args) => (
    <CardWrapperItem>
      <div style={{ width: 748 }}>
        <S022OfferTable {...args} />
      </div>
    </CardWrapperItem>
  ),
} satisfies Meta<typeof S022OfferTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
