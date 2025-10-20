import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import type { IStrictSelectedPeriod } from "~interfaces/Calendar";
import { Components } from "../components/index";

const meta = {
  title: "Calendar",
  component: Components.Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selectedPeriod: {
      control: {
        type: "object",
      },
    },
    lang: {
      control: {
        type: "select",
        options: ["ru", "en", "kk"],
      },
    },
  },
} satisfies Meta<typeof Components.Calendar>;

export default meta;
type Story = StoryObj<typeof Components.Calendar>;

const CalendarWrapper = (args: any) => {
  const [selectedPeriod, setSelectedPeriod] = useState<IStrictSelectedPeriod>({
    fromDate: args.selectedPeriod?.fromDate || "2024-01-01",
    toDate: args.selectedPeriod?.toDate || "2025-12-31",
    allTime: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedRadioOption, setSelectedRadioOption] = useState("fullPeriod");

  return (
    <>
      {isModalOpen && selectedRadioOption && (
        <Components.Calendar
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          setIsModalOpen={setIsModalOpen}
          setSelectedRadioOption={setSelectedRadioOption}
          lang={args.lang}
        />
      )}
    </>
  );
};

export const Default: Story = {
  args: {
    selectedPeriod: {
      fromDate: "2024-05-01",
      toDate: "2025-12-31",
      allTime: false,
    },
    lang: "ru",
  },
  render: (args) => <CalendarWrapper {...args} />,
};

export const LangIsKk: Story = {
  args: {
    selectedPeriod: {
      fromDate: "2025-01-01",
      toDate: "2025-12-31",
      allTime: false,
    },
    lang: "kk",
  },
  render: (args) => <CalendarWrapper {...args} />,
};

export const LangIsEn: Story = {
  args: {
    selectedPeriod: {
      fromDate: "2025-01-01",
      toDate: "2025-12-31",
      allTime: false,
    },
    lang: "en",
  },
  render: (args) => <CalendarWrapper {...args} />,
};
