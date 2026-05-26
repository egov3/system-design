import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useEffect, useState } from "react";
import { Components } from "~components";
import type { INotificationData } from "~interfaces/Notification";

const defaultItems: INotificationData[] = [
  {
    id: "1356865",
    isOpen: true,
    text: "Профиль успешно обновлен",
    type: "success",
  },
  {
    id: "265843234",
    isOpen: true,
    text: "Уведомление с предупреждением",
    type: "warning",
  },
  {
    id: "309876543",
    isOpen: true,
    text: "Ошибка при загрузке",
    type: "error",
  },
  {
    id: "single",
    isOpen: true,
    text: "Уведомление с информацией",
    type: "info",
  },
];

interface IPlaygroundProps {
  items: INotificationData[];
  sequential?: boolean;
}

const NotificationWrapperPlayground = ({
  items,
  sequential = false,
}: IPlaygroundProps) => {
  const [localItems, setLocalItems] = useState<INotificationData[]>(
    sequential ? [] : items,
  );

  useEffect(() => {
    if (!sequential) {
      setLocalItems(items);
      return;
    }

    setLocalItems([]);
    let index = 0;
    const timerId = setInterval(() => {
      const nextItem = items[index];
      if (!nextItem) {
        clearInterval(timerId);
        return;
      }

      setLocalItems((prev) => [nextItem, ...prev]);
      index += 1;
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [items, sequential]);

  return (
    <Components.NotificationWrapper
      items={localItems}
      removeNotificationData={(id) => {
        setLocalItems((prev) => prev.filter((item) => item.id !== id));
      }}
    />
  );
};

const meta = {
  title: "Components/Notification/NotificationWrapper",
  component: Components.NotificationWrapper,
  tags: [],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
    docs: { disable: true },
  },
} satisfies Meta<typeof Components.NotificationWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: defaultItems,
    removeNotificationData: () => {},
  },
  render: () => (
    <NotificationWrapperPlayground items={defaultItems} sequential />
  ),
};

export const SingleNotification: Story = {
  args: {
    items: defaultItems.slice(0, 1),
    removeNotificationData: () => {},
  },
  render: () => (
    <NotificationWrapperPlayground items={defaultItems.slice(0, 1)} />
  ),
};
