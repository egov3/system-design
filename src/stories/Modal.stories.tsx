"use client";

import React, { useState } from "react";

import { CardWrapperItem } from "./CardWrapperItem";
import { Components } from "~components";

const meta = {
  title: "Modal",
  component: Components.Modal,
};

export default meta;

export const SmallVariant = () => {
  const [showPassport, setShowPassport] = useState(false);
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
        <Components.Button
          onClick={() => {
            setShowPassport(!showPassport);
          }}
          size={"small"}
          variant={"tinted"}
          style={{
            width: "200px",
          }}
        >
          Открыть модальное окно
        </Components.Button>
        <Components.Modal
          open={showPassport}
          setOpen={setShowPassport}
          headerTitle={"Modal"}
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
        </Components.Modal>
      </div>
    </CardWrapperItem>
  );
};

export const LargeVariant = () => {
  const [showPassport, setShowPassport] = useState(false);
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
        <Components.Button
          onClick={() => {
            setShowPassport(!showPassport);
          }}
          size={"small"}
          variant={"tinted"}
          style={{
            width: "200px",
          }}
        >
          Открыть модальное окно
        </Components.Button>
        <Components.Modal
          open={showPassport}
          setOpen={setShowPassport}
          headerTitle="Modal"
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
        </Components.Modal>
      </div>
    </CardWrapperItem>
  );
};
