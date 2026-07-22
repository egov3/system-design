"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import { Button, Modal, OverlayPortalProvider } from "~baseComponents";
import { i18n } from "~constants/i18n";
import { CardWrapperItem } from "../CardWrapperItem";

type ModalProps = React.ComponentProps<typeof Modal>;

const ModalWithState: React.FC<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="small"
        variant="tinted"
        style={{ width: "200px" }}
      >
        Открыть модальное окно
      </Button>
      {isOpen && <Modal {...args} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

const ModalDecorator = (Story: () => React.ReactElement) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );

  useEffect(() => {
    setPortalContainer(containerRef.current);
  }, []);

  return (
    <CardWrapperItem>
      <div
        ref={containerRef}
        style={{
          width: 600,
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          transform: "translateZ(0)",
          overflow: "hidden",
        }}
      >
        {portalContainer ? (
          <OverlayPortalProvider container={portalContainer}>
            <Story />
          </OverlayPortalProvider>
        ) : null}
      </div>
    </CardWrapperItem>
  );
};

const meta: Meta<typeof Modal> = {
  title: "BaseComponents/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  decorators: [ModalDecorator],
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

type Story = StoryObj<typeof Modal>;

export const Small: Story = {
  args: {
    header: {
      title: i18n.Common.passportBtnText.ru,
      isClosable: true,
    },
  },
};

export const LongTitle: Story = {
  args: {
    lang: "kk",
    header: {
      title: i18n.Common.confirmationCollectProcessTitle.kk,
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
    header: { handleHeaderLogoClick: () => {} },
  },
};

export const LogoWithBackButton: Story = {
  args: {
    header: {
      handleHeaderLogoClick: () => {},
      goBackService: () => {},
    },
  },
};

export const LogoWithIsClosable: Story = {
  args: {
    header: {
      isClosable: true,
      handleHeaderLogoClick: () => {},
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
        variant: "secondary",
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
