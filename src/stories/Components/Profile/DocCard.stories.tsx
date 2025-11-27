// src/stories/DocsAndProfile/DocCard.stories.tsx

import { Graphics } from "@egov3/graphics";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DocCard } from "../../../components/DocCard";

const meta: Meta<typeof DocCard> = {
  title: "Components/Profile/DocCard",
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
    title: "Удостоверение личности",
    docIcon: <Graphics.Wallet.PersonalID />,
    expiration: "До октября 2024",
  },
};

export const BachelorsDiploma: Story = {
  args: {
    title: "Диплом бакалавра",
    docIcon: <Graphics.Wallet.BachelorsDiploma />,
  },
};

export const Birth: Story = {
  args: {
    title: "Свидетельство о рождении",
    docIcon: <Graphics.Wallet.Birth />,
  },
};

export const CarDocument: Story = {
  args: {
    title: "Паспорт транспортного средства",
    docIcon: <Graphics.Wallet.CarDocument />,
  },
};

export const CarInsurance: Story = {
  args: {
    title: "Mazda CX-5, 580HDA01",
    docIcon: <Graphics.Wallet.CarInsurance />,
  },
};

export const Driverlicense: Story = {
  args: {
    title: "Водительские права",
    docIcon: <Graphics.Wallet.Driverlicense />,
  },
};

export const Education: Story = {
  args: {
    title: "Сведения об образовании",
    docIcon: <Graphics.Wallet.Education />,
  },
};

export const Marriage: Story = {
  args: {
    title: "Свидетельство о заключении брака",
    docIcon: <Graphics.Wallet.Marriage />,
  },
};

export const MastersDiploma: Story = {
  args: {
    title: "Диплом магистра",
    docIcon: <Graphics.Wallet.MastersDiploma />,
  },
};

export const NationalFund: Story = {
  args: {
    title: "Начисления из НацФонда",
    docIcon: <Graphics.Wallet.NationalFund />,
  },
};

export const Passport: Story = {
  args: {
    title: "Паспорт РК",
    docIcon: <Graphics.Wallet.Passport />,
    expiration: "До октября 2024",
  },
};
