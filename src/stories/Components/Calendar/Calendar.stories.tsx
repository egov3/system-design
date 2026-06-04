import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { Components } from "~components";
import type { ISelectedPeriod } from "~interfaces/Calendar";
import type { ICalendarProps } from "../../../components/Calendar";
import { CardWrapperItem } from "../../CardWrapperItem";

const DefaultCalendarPreview = (args: ICalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <Components.Calendar
      {...args}
      mode="default"
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
    />
  );
};

const PeriodCalendarPreview = (args: ICalendarProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<ISelectedPeriod>({
    fromDate: null,
    toDate: null,
    periodSelected: false,
  });

  return (
    <Components.Calendar
      {...args}
      mode="period"
      selectedPeriod={selectedPeriod}
      onPeriodChange={setSelectedPeriod}
    />
  );
};

const meta = {
  title: "Components/Calendar/Calendar",
  component: Components.Calendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            width: 600,
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  args: {
    isOpen: true,
    lang: "ru",
  },
  argTypes: {
    lang: { control: "select", options: ["ru", "kk", "en"] },
    onSave: {
      action: (date: Date | null | ISelectedPeriod) => {
        console.log(date);
      },
    },
  },
} satisfies Meta<typeof Components.Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: "default",
  },
  render: (args) => <DefaultCalendarPreview {...args} />,
};

export const Period: Story = {
  args: {
    mode: "period",
  },
  render: (args) => <PeriodCalendarPreview {...args} />,
};
