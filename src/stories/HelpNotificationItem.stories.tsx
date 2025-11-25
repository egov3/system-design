import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Components } from "~components";
import styles from "../components/HelpNotification/HelpNotification.module.css";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "HelpNotificationItem",
  component: Components.HelpNotificationItem,
  parameters: {
    layout: "centered",
    viewport: {
      defaultViewport: "responsive",
    },
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            width: "370px",
            height: "100px",
          }}
        >
          <div
            className={styles.notification}
            style={{ right: "18px" }}
            data-testid="HelpNotification_NOTIFICATION"
          >
            <div className={styles.arrow} data-testid="HelpNotification_ARROW">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="13"
                viewBox="0 0 28 13"
              >
                <path d="M28 12.9988L0 12.9988C6.894 13.1061 10.7704 6.17509 12.6198 1.40184C13.0084 0.398973 14.9916 0.398973 15.3802 1.40184C17.2296 6.17509 21.106 13.1061 28 12.9988Z" />
              </svg>
            </div>
            <div className={styles.block} data-testid="HelpNotification_BLOCK">
              <Story />
            </div>
          </div>
        </div>
      </CardWrapperItem>
    ),
  ],
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Components.HelpNotificationItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lang: "ru",
    isRead: false,
    isUnderline: false,
  },
};
