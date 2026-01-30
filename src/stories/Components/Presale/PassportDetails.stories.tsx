"use client";

import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "~baseComponents";
import { Components } from "~components";
import { i18n } from "~constants/i18n";
import type { TReleasedServices } from "~interfaces/PresaleTemplate";
import { CardWrapperItem } from "../../CardWrapperItem";

const meta: Meta<typeof Components.PresaleComponent.PassportDetails> = {
  title: "Components/Presale/PassportDetails",
  component: Components.PresaleComponent.PassportDetails,
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ width: "600px", height: "500px" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Components.PresaleComponent.PassportDetails>;

const PassportStory = ({ serviceId }: { serviceId: TReleasedServices }) => {
  const [showPassport, setShowPassport] = useState(false);

  return (
    <>
      <Components.PresaleComponent.ShowPassportBtn
        setShowPassport={setShowPassport}
        showPassport={showPassport}
        lang="ru"
      />
      {showPassport && (
        <BaseComponents.Modal
          open={showPassport}
          setOpen={setShowPassport}
          header={{
            title: i18n.Services.passport.titles.passportBtnText.ru,
            isClosable: true,
          }}
          lang="ru"
          variant="small"
        >
          <Components.PresaleComponent.PassportDetails
            serviceId={serviceId}
            lang="ru"
          />
        </BaseComponents.Modal>
      )}
    </>
  );
};

export const P601: Story = {
  render: () => <PassportStory serviceId="P601" />,
};

export const P305: Story = {
  render: () => <PassportStory serviceId="P305" />,
};

export const P2203: Story = {
  render: () => <PassportStory serviceId="P2203" />,
};

export const P608: Story = {
  render: () => <PassportStory serviceId="P608" />,
};

export const P3061: Story = {
  render: () => <PassportStory serviceId="P3061" />,
};
