import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { Components } from "~components";
import { SetUpAccess } from "../../../components/SetUpAccess";

const metaSetUpAccess: Meta<typeof SetUpAccess> = {
  title: "Components/Profile/SetUpAccess",
  component: SetUpAccess,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    lang: "ru",
    lock: false,
    close: false,
  },
  argTypes: {
    lang: {
      control: { type: "select" },
      options: ["ru", "kk", "en"],
    },
    lock: {
      control: { type: "boolean" },
    },
    close: {
      control: { type: "boolean" },
    },
    unlock: {
      action: "unlock",
    },
    setClose: {
      action: "setClose",
    },
  },
  render: (args) => (
    <div
      style={{
        width: "400px",
      }}
    >
      <Components.SetUpAccess {...args} />
    </div>
  ),
};

export default metaSetUpAccess;

type StorySetUpAccess = StoryObj<typeof metaSetUpAccess>;

export const Default: StorySetUpAccess = {
  args: {
    lang: "ru",
    lock: false,
    close: false,
  },
};

export const AllLocked: StorySetUpAccess = {
  args: {
    lang: "ru",
    lock: true,
    close: false,
  },
};

export const KazakhLanguage: StorySetUpAccess = {
  args: {
    lang: "kk",
    lock: false,
    close: false,
  },
};

export const EnglishLanguage: StorySetUpAccess = {
  args: {
    lang: "en",
    lock: false,
    close: false,
  },
};

export const Interactive: StorySetUpAccess = {
  render: (args) => {
    const InteractiveComponent = () => {
      const [lock, setLock] = useState(false);
      const [close, setClose] = useState(false);

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "400px",
          }}
        >
          <SetUpAccess
            {...args}
            lock={lock}
            unlock={setLock}
            close={close}
            setClose={setClose}
          />
          <div>
            <div>{lock ? "Locked" : "Unlocked"}</div>
            <div>{close && "Close"}</div>
          </div>
        </div>
      );
    };
    return <InteractiveComponent />;
  },
  args: {
    lang: "ru",
  },
};
