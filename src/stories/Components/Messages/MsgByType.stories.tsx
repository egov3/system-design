import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";
import type { IMsgDataItem } from "~interfaces/Messages";
import { formatDate } from "~utils/date/formatDate";
import { getCurrentTime } from "~utils/date/getCurrentTime";
import { inverseDate } from "~utils/date/inverseDate";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta = {
  title: "Components/Messages/MsgByType",
  component: Components.MsgByType,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ backgroundColor: "#fff" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Components.MsgByType>;

export default meta;

type Story = StoryObj<typeof meta>;

const msgItems: IMsgDataItem[] = [
  {
    id: "4158a0e7-4ec2-474d-8e47-8a99d37605a2",
    header: {
      serviceName: "услуга",
      type: "Справка Ф-2 (об отсутствии обременений (залога, ареста) на недвижимость",
    },
    description: [
      {
        text: "Запрос отправлен",
        type: "inProgress",
      },
      {
        text: "Заявка #101000000001966",
        type: "info",
      },
    ],
    msgType: "REQUEST_HISTORY",
    time: getCurrentTime(new Date("2025-11-28T10:15:12.749957748Z")),
    date: inverseDate(formatDate(new Date("2025-11-28T10:15:12.749957748Z"))),
  },
  {
    id: "4158a0e7-4ec2-474d-8e47-8a99d37605a2",
    header: {
      serviceName: "услуга",
      type: "Справка Ф-2 (об отсутствии обременений (залога, ареста) на недвижимость",
    },
    description: [
      {
        text: "Запрос исполнен",
        type: "success",
      },
      {
        text: "Заявка #101000000001966",
        type: "info",
      },
    ],
    msgType: "REQUEST_HISTORY",
    time: getCurrentTime(new Date("2025-11-28T10:15:12.749957748Z")),
    date: inverseDate(formatDate(new Date("2025-11-28T10:15:12.749957748Z"))),
  },
  {
    id: "4158a0e7-4ec2-474d-8e47-8a99d37605a2",
    header: {
      serviceName: "услуга",
      type: "Справка Ф-2 (об отсутствии обременений (залога, ареста) на недвижимость",
    },
    description: [
      {
        text: "Запрос отклонен",
        type: "error",
      },
      {
        text: "Заявка #101000000001966",
        type: "info",
      },
    ],
    msgType: "REQUEST_HISTORY",
    time: getCurrentTime(new Date("2025-11-28T10:15:12.749957748Z")),
    date: inverseDate(formatDate(new Date("2025-11-28T10:15:12.749957748Z"))),
  },
];

export const InProgressMessage: Story = {
  args: {
    msgItem: msgItems[0],
  },
};

export const SuccessMessage: Story = {
  args: {
    msgItem: msgItems[1],
  },
};

export const ErrorMessage: Story = {
  args: {
    msgItem: msgItems[2],
  },
};
