"use client";

import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "../../baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/Modal",
  component: BaseComponents.Modal,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 800, height: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaseComponents.Modal>;
export default meta;

export const SmallVariantWithModalScroll = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <CardWrapperItem>
      <div
        style={{
          height: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseComponents.Button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          size="small"
          variant="tinted"
          style={{
            width: "200px",
          }}
        >
          Открыть модальное окно
        </BaseComponents.Button>
        {isOpen && (
          <BaseComponents.Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            header={{
              title: "Small Modal",
              isClosable: true,
            }}
            lang="ru"
            variant="small"
            isContentScroll={false}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
                height: "400px",
              }}
            >
              Modal
            </div>
          </BaseComponents.Modal>
        )}
      </div>
    </CardWrapperItem>
  );
};

export const LargeVariant = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <CardWrapperItem>
      <div
        style={{
          height: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseComponents.Button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          size="small"
          variant="tinted"
          style={{
            width: "200px",
          }}
        >
          Открыть модальное окно
        </BaseComponents.Button>
        {isOpen && (
          <BaseComponents.Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            header={{
              title: "Large Modal",
              isClosable: true,
            }}
            lang="ru"
            variant="large"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "40px",
              }}
            >
              Modal
            </div>
          </BaseComponents.Modal>
        )}
      </div>
    </CardWrapperItem>
  );
};

export const OnlyLogo = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleGoMain = () => {
    setIsOpen(false);
  };

  return (
    <CardWrapperItem>
      <BaseComponents.Button
        onClick={() => setIsOpen(true)}
        size="small"
        variant="tinted"
      >
        Открыть модальное окно
      </BaseComponents.Button>
      {isOpen && (
        <BaseComponents.Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          header={{
            goIdentityMain: handleGoMain,
          }}
          lang="ru"
          variant="small"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            Modal
          </div>
        </BaseComponents.Modal>
      )}
    </CardWrapperItem>
  );
};

export const LogoWithBackButton = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleGoBack = () => {
    setIsOpen(false);
  };

  return (
    <CardWrapperItem>
      <BaseComponents.Button
        onClick={() => setIsOpen(true)}
        size="small"
        variant="tinted"
      >
        Открыть модальное окно
      </BaseComponents.Button>
      {isOpen && (
        <BaseComponents.Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          header={{
            goIdentityMain: () => {},
            goBackService: handleGoBack,
          }}
          lang="ru"
          variant="small"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            Modal
          </div>
        </BaseComponents.Modal>
      )}
    </CardWrapperItem>
  );
};

export const LogoWithIsClosable = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleGoMain = () => {
    setIsOpen(false);
  };

  return (
    <CardWrapperItem>
      <BaseComponents.Button
        onClick={() => setIsOpen(true)}
        size="small"
        variant="tinted"
      >
        Открыть модальное окно
      </BaseComponents.Button>
      {isOpen && (
        <BaseComponents.Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          header={{
            isClosable: true,
            goIdentityMain: handleGoMain,
          }}
          lang="ru"
          variant="small"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            Modal
          </div>
        </BaseComponents.Modal>
      )}
    </CardWrapperItem>
  );
};

export const ScrollableContentWithFooter = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <CardWrapperItem>
      <BaseComponents.Button
        onClick={() => {
          setIsOpen(true);
        }}
        size="small"
        variant="tinted"
      >
        Открыть модальное окно
      </BaseComponents.Button>
      {isOpen && (
        <BaseComponents.Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          header={{
            isClosable: true,
            title: "Modal without close button",
          }}
          lang="ru"
          variant="small"
          footerButtons={[
            {
              text: "Cancel",
              onClick: () => {},
              isDisabled: true,
              dataTestid: "ButtonList_CANCEL",
            },
            {
              text: "Закрыть",
              onClick: () => {
                setIsOpen(false);
              },
            },
          ]}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "500px",
            }}
          >
            Закрыть
          </div>
        </BaseComponents.Modal>
      )}
    </CardWrapperItem>
  );
};

export const WithoutOverlay = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <CardWrapperItem>
      <BaseComponents.Button
        onClick={() => {
          setIsOpen(true);
        }}
        size="small"
        variant="tinted"
      >
        Открыть модальное окно
      </BaseComponents.Button>
      {isOpen && (
        <BaseComponents.Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          header={{
            isClosable: true,
          }}
          lang="ru"
          variant="small"
          isWithOverlay={false}
        >
          <div
            style={{
              width: "300px",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            Modal
          </div>
        </BaseComponents.Modal>
      )}
    </CardWrapperItem>
  );
};
