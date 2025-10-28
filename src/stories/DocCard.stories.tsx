// src/stories/DocsAndProfile/DocCard.stories.tsx

import { Graphics } from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DocCard } from "../components/DocCard";

const meta: Meta<typeof DocCard> = {
  title: "DocCard",
  component: DocCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: null,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PersonalID: Story = {
  args: {
    title: "Удостверение личности",
    docIcon: <Graphics.Wallet.PersonalID />,
    expiration: "До октября 2024",
    children: null
  },
};

export const BachelorsDiploma: Story = {
  args: {
    title: "Диплом бакалавра",
    docIcon: <Graphics.Wallet.BachelorsDiploma />,
    children: null,
  },
};

export const Birth: Story = {
  args: {
    title: "Свидетельство о рождении",
    docIcon: <Graphics.Wallet.Birth />,
    children: null,
  },
};

export const CarDocument: Story = {
  args: {
    title: "Паспорт транспортного средства",
    docIcon: <Graphics.Wallet.CarDocument />,
    children: null,
  },
};

export const CarInsurance: Story = {
  args: {
    title: "Mazda CX-5, 580HDA01",
    docIcon: <Graphics.Wallet.CarInsurance />,
    children: null,
  },
};

export const Driverlicense: Story = {
  args: {
    title: "Водительские права",
    docIcon: <Graphics.Wallet.Driverlicense />,
    children: null,
  },
};

export const Education: Story = {
  args: {
    title: "Сведения об образовании",
    docIcon: <Graphics.Wallet.Education />,
    children: null,
  },
};

export const Marriage: Story = {
  args: {
    title: "Свидетельство о заключении брака",
    docIcon: <Graphics.Wallet.Marriage />,
    children: null,
  },
};

export const MastersDiploma: Story = {
  args: {
    title: "Диплом магистра",
    docIcon: <Graphics.Wallet.MastersDiploma />,
    children: null,
  },
};

export const NationalFund: Story = {
  args: {
    title: "Начисления из НацФонда",
    docIcon: <Graphics.Wallet.NationalFund />,
    children: null,
  },
};

export const Passport: Story = {
  args: {
    title: "Паспорт РК",
    docIcon: <Graphics.Wallet.Passport />,
    expiration: "До октября 2024",
    children: null,
  },
};
