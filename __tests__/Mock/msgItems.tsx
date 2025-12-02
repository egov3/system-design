import type { IMsgDataItem } from "~interfaces/Messages";
import { getCurrentTime } from "~utils/date/getCurrentTime";

export const msgItems: IMsgDataItem[] = [
  {
    id: "4158a0e7-4ec2-474d-8e47-8a99d37605a2",
    header: {
      service: "услуга",
      message:
        "Справка Ф-2 (об отсутствии обременений (залога, ареста) на недвижимость",
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
    isRead: false,
  },
  {
    id: "4158a0e7-4ec2-474d-8e47-8a99d37605a3",
    header: {
      service: "услуга",
      message:
        "Справка Ф-2 (об отсутствии обременений (залога, ареста) на недвижимость",
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
    isRead: true,
  },
  {
    id: "4158a0e7-4ec2-474d-8e47-8a99d37605a4",
    header: {
      service: "услуга",
      message:
        "Справка Ф-2 (об отсутствии обременений (залога, ареста) на недвижимость",
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
    isRead: false,
    msgType: "REQUEST_HISTORY",
    time: getCurrentTime(new Date("2025-11-28T10:15:12.749957748Z")),
  },
  {
    id: "4158a0e7-4ec2-474d-8e47-8a99d37605a5",
    header: {
      service: "Геоинформационный портал",
      message:
        "Уведомление об изменении статуса услуги «Заключение договоров на предоставление коммунальных услуг при смене собственника недвижимости»",
    },
    isRead: false,
    msgType: "NOTIFICATIONS",
    time: getCurrentTime(new Date("2025-11-28T10:15:12.749957748Z")),
  },
];
