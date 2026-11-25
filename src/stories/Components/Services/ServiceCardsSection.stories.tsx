import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import { serviceCardsSectionItems } from "__tests__/Mock/serviceCardsSectionItems";
import { ServiceCardsSection } from "~components";

const meta = {
  title: "Components/Services/ServiceCardsSection",
  component: ServiceCardsSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    title: "Бизнес",
    cards: serviceCardsSectionItems.map((card) => ({ ...card, onClick: fn() })),
  },
} satisfies Meta<typeof ServiceCardsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitleAction: Story = {
  args: {
    onTitleClick: fn(),
  },
};

export const FourColumns: Story = {
  args: {
    isFourColumns: true,
  },
};
