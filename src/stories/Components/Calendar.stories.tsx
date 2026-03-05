import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";
import { CardWrapperItem } from "../CardWrapperItem";

const meta: Meta<typeof Components.Calendar> = {
  title: "Components/Calendar",
  component: Components.Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    isOpen: true,
    setIsOpen: () => {},
    variant: "default",
    lang: "ru",
    selectedDate: null,
    setSelectedDate: (_date) => {},
    selectedPeriod: null,
    setSelectedPeriod: (_period) => {},
    isWeekdaysOnly: false,
    availableDays: [],
    yearRange: {
      from: { day: 1, month: 1, year: 2020 },
      to: { day: 31, month: 12, year: 2027 },
    },
    hintText: "",
  },
  render: (args) => (
    <CardWrapperItem>
      <div
        style={{
          height: "500px",
          width: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Components.Calendar {...args} />
      </div>
    </CardWrapperItem>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    lang: "ru",
  },
};
