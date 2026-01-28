import type { Meta, StoryFn } from "@storybook/react-webpack5";
import { Components } from "~components";
import type { INotificationComponent } from "~interfaces/INotificationComponent";

export default {
  title: "Components/NotificationComponent",
  component: Components.NotificationComponent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          height: "80px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<INotificationComponent> = (args) => (
  <Components.NotificationComponent {...args} />
);

export const SuccessNotification = Template.bind({});
SuccessNotification.args = {
  text: "Success notification",
  open: true,
  isSuccess: true,
  toggleNotification: () => {},
  type: "success",
};

export const ErrorNotification = Template.bind({});
ErrorNotification.args = {
  text: "Error notification",
  type: "error",
  open: true,
  isSuccess: false,
  toggleNotification: () => {},
};

export const WarningNotification = Template.bind({});
WarningNotification.args = {
  text: "Warning notification",
  open: true,
  type: "warning",
  toggleNotification: () => {},
};

export const InfoNotification = Template.bind({});
InfoNotification.args = {
  text: "Info notification",
  open: true,
  type: "info",
  toggleNotification: () => {},
};
