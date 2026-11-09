import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { useState } from "react";

import { Accordion } from "~baseComponents";
import { PresaleComponent } from "~components";
import { accordion, htmlSample } from "~constants/mockData";

import { CardWrapperItem } from "../../CardWrapperItem";

interface IServiceNotificationComponentProps {
  notification: string;
}

const ServiceNotificationComponent = ({
  notification,
}: IServiceNotificationComponentProps) => {
  const [isShowDetails, setIsShowDetails] = useState<boolean>(true);
  return (
    <CardWrapperItem>
      <div
        style={{
          padding: "10px",
          background: "#fff",
          borderRadius: "12px",
          width: "850px",
        }}
      >
        <Accordion
          open={isShowDetails}
          setOpen={setIsShowDetails}
          title={<PresaleComponent.AccordionTitle title={accordion.ru} />}
        >
          <PresaleComponent.ServiceNotification notification={notification} />
        </Accordion>
      </div>
    </CardWrapperItem>
  );
};

const meta = {
  title: "Components/Presale/ServiceNotification",
  component: ServiceNotificationComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PresaleComponent.ServiceNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notification: htmlSample,
  },
};
