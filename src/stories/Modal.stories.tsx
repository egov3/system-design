"use client";

import { useState } from "react";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "Modal",
  component: BaseComponents.Modal,
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
          size={"small"}
          variant={"tinted"}
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
              title: "Modal",
              isClosable: true
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
          size={"small"}
          variant={"tinted"}
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
              title: "Modal",
              isClosable: true
            }}
            lang="ru"
            variant="large"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
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
