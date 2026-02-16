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
  const [open, setOpen] = useState(false);
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
            setOpen(!open);
          }}
          size="small"
          variant="tinted"
          style={{
            width: "200px",
          }}
        >
          Открыть модальное окно
        </BaseComponents.Button>
        {open && (
          <BaseComponents.Modal
            isOpen={open}
            setIsOpen={setOpen}
            headerConfig={[
              {
                position: "left",
                type: "title",
                title: "Small Modal",
              },
              {
                position: "right",
                type: "close",
              },
            ]}
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
  const [open, setOpen] = useState(false);
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
            setOpen(!open);
          }}
          size="small"
          variant="tinted"
          style={{
            width: "200px",
          }}
        >
          Открыть модальное окно
        </BaseComponents.Button>
        {open && (
          <BaseComponents.Modal
            isOpen={open}
            setIsOpen={setOpen}
            headerConfig={[
              {
                position: "left",
                type: "title",
                title: "Large Modal",
              },
              {
                position: "right",
                type: "close",
              },
            ]}
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

export const WithBackButton = () => {
  const [open, setOpen] = useState(false);

  const handleGoBack = () => {
    setOpen(false);
  };

  return (
    <CardWrapperItem>
      <BaseComponents.Button
        onClick={() => setOpen(true)}
        size="small"
        variant="tinted"
      >
        Открыть модальное окно
      </BaseComponents.Button>
      {open && (
        <BaseComponents.Modal
          isOpen={open}
          setIsOpen={setOpen}
          headerConfig={[
            {
              position: "left",
              type: "back",
              goBackService: handleGoBack,
            },
            {
              position: "center",
              type: "title",
              title: "Back button modal",
            },
            {
              position: "right",
              type: "close",
            },
          ]}
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

export const WithLogo = () => {
  const [open, setOpen] = useState(false);

  const handleGoMain = () => {
    setOpen(false);
  };

  return (
    <CardWrapperItem>
      <BaseComponents.Button
        onClick={() => setOpen(true)}
        size="small"
        variant="tinted"
      >
        Открыть модальное окно
      </BaseComponents.Button>
      {open && (
        <BaseComponents.Modal
          isOpen={open}
          setIsOpen={setOpen}
          headerConfig={[
            {
              position: "center",
              type: "logo",
              goIdentityMain: handleGoMain,
            },
          ]}
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
  const [open, setOpen] = useState(false);

  return (
    <CardWrapperItem>
      <BaseComponents.Button
        onClick={() => {
          setOpen(true);
        }}
        size="small"
        variant="tinted"
      >
        Открыть модальное окно
      </BaseComponents.Button>
      {open && (
        <BaseComponents.Modal
          isOpen={open}
          setIsOpen={setOpen}
          headerConfig={[
            {
              position: "left",
              type: "back",
              goBackService: () => console.log("Назад"),
            },
            {
              position: "center",
              type: "title",
              title: "Подробный паспорт услуги",
            },
            {
              position: "right",
              type: "close",
            },
          ]}
          lang="ru"
          variant="small"
          footerButtons={[
            {
              text: "Cancel",
              onClick: () => {},
              disabled: true,
              dataTestid: "ButtonList_CANCEL",
            },
            {
              text: "Закрыть",
              onClick: () => {
                setOpen(false);
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
  const [open, setOpen] = useState(false);

  return (
    <CardWrapperItem>
      <BaseComponents.Button
        onClick={() => {
          setOpen(true);
        }}
        size="small"
        variant="tinted"
      >
        Открыть модальное окно
      </BaseComponents.Button>
      {open && (
        <BaseComponents.Modal
          isOpen={open}
          setIsOpen={setOpen}
          headerConfig={[
            {
              position: "right",
              type: "close",
            },
          ]}
          lang="ru"
          variant="small"
          isWithOverlay={false}
        >
          <div
            style={{
              width: "400px",
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

export const headerConfigNull = () => {
  const [open, setOpen] = useState(false);

  return (
    <CardWrapperItem>
      <BaseComponents.Button
        onClick={() => {
          setOpen(true);
        }}
        size="small"
        variant="tinted"
      >
        Открыть модальное окно
      </BaseComponents.Button>
      {open && (
        <BaseComponents.Modal
          isOpen={open}
          setIsOpen={setOpen}
          headerConfig={[]}
          lang="ru"
          variant="small"
          isWithOverlay={false}
        >
          <div
            style={{
              width: "400px",
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
