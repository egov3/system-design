import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { PersonalIDTemplate } from "~components";

const meta = {
  title: "Components/PersonalIDTemplate",
  component: PersonalIDTemplate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    width: 500,
    userPhoto: "https://placehold.co/280x360/eef1f3/9aa5ad?text=Photo",
    userSign: "https://placehold.co/240x120/eef1f3/9aa5ad?text=Sign",
  },
} satisfies Meta<typeof PersonalIDTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
