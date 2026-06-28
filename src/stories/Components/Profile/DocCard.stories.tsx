// src/stories/DocsAndProfile/DocCard.stories.tsx

import { BachelorsDiplomaWalletIllustration } from "@egov3/graphics/Wallet/BachelorsDiploma";
import { BirthWalletIllustration } from "@egov3/graphics/Wallet/Birth";
import { CarDocumentWalletIllustration } from "@egov3/graphics/Wallet/CarDocument";
import { CarInsuranceWalletIllustration } from "@egov3/graphics/Wallet/CarInsurance";
import { DriverlicenseWalletIllustration } from "@egov3/graphics/Wallet/Driverlicense";
import { EducationWalletIllustration } from "@egov3/graphics/Wallet/Education";
import { MarriageWalletIllustration } from "@egov3/graphics/Wallet/Marriage";
import { MastersDiplomaWalletIllustration } from "@egov3/graphics/Wallet/MastersDiploma";
import { NationalFundWalletIllustration } from "@egov3/graphics/Wallet/NationalFund";
import { PassportWalletIllustration } from "@egov3/graphics/Wallet/Passport";
import { PersonalIDWalletIllustration } from "@egov3/graphics/Wallet/PersonalID";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { DocCard } from "~components";


const meta: Meta<typeof DocCard> = {
  title: "Components/Profile/DocCard",
  component: DocCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: null,
    lang: "ru",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PersonalID: Story = {
  args: {
    title: "Удостоверение личности",
    docIcon: <PersonalIDWalletIllustration />,
    expiration: "До октября 2024",
  },
};

export const BachelorsDiploma: Story = {
  args: {
    title: "Диплом бакалавра",
    docIcon: <BachelorsDiplomaWalletIllustration />,
  },
};

export const Birth: Story = {
  args: {
    title: "Свидетельство о рождении",
    docIcon: <BirthWalletIllustration />,
  },
};

export const CarDocument: Story = {
  args: {
    title: "Паспорт транспортного средства",
    docIcon: <CarDocumentWalletIllustration />,
  },
};

export const CarInsurance: Story = {
  args: {
    title: "Mazda CX-5, 580HDA01",
    docIcon: <CarInsuranceWalletIllustration />,
  },
};

export const Driverlicense: Story = {
  args: {
    title: "Водительские права",
    docIcon: <DriverlicenseWalletIllustration />,
  },
};

export const Education: Story = {
  args: {
    title: "Сведения об образовании",
    docIcon: <EducationWalletIllustration />,
  },
};

export const Marriage: Story = {
  args: {
    title: "Свидетельство о заключении брака",
    docIcon: <MarriageWalletIllustration />,
  },
};

export const MastersDiploma: Story = {
  args: {
    title: "Диплом магистра",
    docIcon: <MastersDiplomaWalletIllustration />,
  },
};

export const NationalFund: Story = {
  args: {
    title: "Начисления из НацФонда",
    docIcon: <NationalFundWalletIllustration />,
  },
};

export const Passport: Story = {
  args: {
    title: "Паспорт РК",
    docIcon: <PassportWalletIllustration />,
    expiration: "До октября 2024",
  },
};
