import type { IMsgDataItem } from "~interfaces/Messages";
import { formatDate } from "~utils/date/formatDate";
import { getCurrentTime } from "~utils/date/getCurrentTime";
import { inverseDate } from "~utils/date/inverseDate";

export const msgItems: IMsgDataItem[] = [
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
