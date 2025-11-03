"use client";

import { useState } from "react";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "Modal",
  component: BaseComponents.Modal,
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const SmallVariant = () => {
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
            open={open}
            setOpen={setOpen}
            header={{
              title: "Small Modal",
              isClosable: true,
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
            open={open}
            setOpen={setOpen}
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
          open={open}
          setOpen={setOpen}
          header={{
            title: "Back button modal",
            isClosable: true,
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
          open={open}
          setOpen={setOpen}
          header={{
            isClosable: true,
            title: "Modal with Logo",
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

export const WithoutCloseButton = () => {
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
          open={open}
          setOpen={setOpen}
          header={{
            isClosable: false,
            title: "Modal without close button",
          }}
          lang="ru"
          variant="small"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <BaseComponents.Button
              onClick={() => {
                setOpen(false);
              }}
              size="medium"
              style={{ marginBottom: "20px" }}
            >
              Закрыть
            </BaseComponents.Button>
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
          open={open}
          setOpen={setOpen}
          header={{
            isClosable: true,
          }}
          lang="ru"
          variant="small"
          withOverlay={false}
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
