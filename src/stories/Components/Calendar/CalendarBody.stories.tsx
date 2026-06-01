import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { Components } from "~components";

const CalendarBodyPreview = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  return (
    <div style={{ width: 368 }}>
      <Components.CalendarBody
        month={new Date().getMonth()}
        year={new Date().getFullYear()}
        selectedDate={selectedDate}
        onDayClick={setSelectedDate}
      />
    </div>
  );
};

const meta = {
  title: "Components/Calendar/CalendarBody",
  component: Components.CalendarBody,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Components.CalendarBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CalendarBodyPreview />,
};
