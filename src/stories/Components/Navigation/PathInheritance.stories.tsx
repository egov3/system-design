import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Button, Typography } from "~baseComponents";
import { PathInheritance } from "~components";

import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Navigation/PathInheritance",
  component: PathInheritance,
  parameters: {
    layout: "padded",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <Story />
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof PathInheritance>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Выдача справки с психоневрологической организации",
    children: (
      <Typography fontClass="caption1Regular" tag="span">
        Главная - Услуги - Гражданам - Здравоохранение - Медицинская помощь
      </Typography>
    ),
    actionBtns: (
      <>
        <Button variant="secondary" size="small" isRounded={false}>
          Код услуги: P704
        </Button>
        <Button variant="secondary" size="small">
          В избранное
        </Button>
      </>
    ),
  },
};

export const WithoutActions: Story = {
  args: {
    title: "Выдача справки с психоневрологической организации",
    children: (
      <Typography fontClass="caption1Regular" tag="span">
        Главная - Услуги - Гражданам - Здравоохранение - Медицинская помощь
      </Typography>
    ),
  },
};

export const LongBreadcrumbs: Story = {
  args: {
    title: "Выдача выписок из лицевого счета о состоянии расчетов с бюджетом",
    children: (
      <Typography fontClass="caption1Regular" tag="span">
        Главная - Гражданам - Таможня и налоги - Налогообложение - Выдача
        выписок из лицевого счета о состоянии расчетов с бюджетом -
        00000000000000
      </Typography>
    ),
    actionBtns: (
      <>
        <Button variant="secondary" size="small" isRounded={false}>
          Код услуги: P1.10
        </Button>
        <Button variant="secondary" size="small">
          В избранные
        </Button>
      </>
    ),
  },
};
