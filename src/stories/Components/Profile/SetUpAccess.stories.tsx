import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { Components } from "~components";

const metaSetUpAccess: Meta<typeof Components.SetUpAccess> = {
  title: "Components/Profile/SetUpAccess",
  component: Components.SetUpAccess,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    lang: "ru",
    lock: false,
  },
  argTypes: {
    lang: {
      control: { type: "select" },
      options: ["ru", "kk", "en"],
    },
    lock: {
      control: { type: "boolean" },
    },
    unlock: {
      action: "unlock",
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
  },
};

export const AllLocked: StorySetUpAccess = {
  args: {
    lang: "ru",
    lock: true,
  },
};

export const KazakhLanguage: StorySetUpAccess = {
  args: {
    lang: "kk",
    lock: false,
  },
};

export const EnglishLanguage: StorySetUpAccess = {
  args: {
    lang: "en",
    lock: false,
  },
};

export const Interactive: StorySetUpAccess = {
  render: (args) => {
    const InteractiveComponent = () => {
      const [lock, setLock] = useState(false);

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "400px",
          }}
        >
          <Components.SetUpAccess {...args} lock={lock} unlock={setLock} />
          <div>
            <div>{lock ? "Locked" : "Unlocked"}</div>
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
