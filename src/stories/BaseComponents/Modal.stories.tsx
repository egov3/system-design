"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { i18n } from "~constants/i18n";
import { BaseComponents } from "../../baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

type ModalProps = React.ComponentProps<typeof BaseComponents.Modal>;

const ModalWithState: React.FC<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <BaseComponents.Button
        onClick={() => setIsOpen(true)}
        size="small"
        variant="tinted"
        style={{ width: "200px" }}
      >
        Открыть модальное окно
      </BaseComponents.Button>
      {isOpen && (
        <BaseComponents.Modal {...args} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

const meta: Meta<typeof BaseComponents.Modal> = {
  title: "BaseComponents/Modal",
  component: BaseComponents.Modal,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            width: 600,
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  args: {
    lang: "ru",
    variant: "small",
    isContentScroll: false,
    children: (
      <div
        style={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Modal content
      </div>
    ),
  },
  render: (args) => <ModalWithState {...args} />,
};

export default meta;

type Story = StoryObj<typeof BaseComponents.Modal>;

export const Small: Story = {
  args: {
    header: {
      title: i18n.Common.passportBtnText.ru,
      isClosable: true,
    },
  },
};

export const Large: Story = {
  args: {
    header: {
      title: "Large Modal",
      isClosable: true,
    },
    variant: "large",
  },
};

export const OnlyLogo: Story = {
  args: {
    header: { goIdentityMain: () => {} },
  },
};

export const LogoWithBackButton: Story = {
  args: {
    header: {
      goIdentityMain: () => {},
      goBackService: () => {},
    },
  },
};

export const LogoWithIsClosable: Story = {
  args: {
    header: {
      isClosable: true,
      goIdentityMain: () => {},
    },
  },
};

export const ScrollableContentWithFooter: Story = {
  args: {
    isContentScroll: true,
    header: {
      title: "Modal with footer",
      isClosable: true,
    },
    footerButtons: [
      {
        text: "Cancel",
        onClick: () => {},
        isDisabled: true,
        dataTestid: "ButtonList_CANCEL",
      },
      {
        text: "Закрыть",
        onClick: () => {},
      },
    ],
  },
};

export const WithOutOverlay: Story = {
  args: {
    header: {
      isClosable: true,
    },
    isWithOverlay: false,
  },
};
