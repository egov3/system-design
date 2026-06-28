import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Modal } from "~baseComponents";
import { SetUpAccess } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const metaSetUpAccess: Meta<typeof SetUpAccess> = {
  title: "Components/Profile/SetUpAccess",
  component: SetUpAccess,
  parameters: {
    layout: "centered",
  },

  decorators: [
    (StorySetUpAccess) => (
      <CardWrapperItem>
        <div
          style={{
            height: "500px",
            width: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Modal isOpen={true} setIsOpen={() => {}} variant="small" lang={"ru"}>
            <StorySetUpAccess />
          </Modal>
        </div>
      </CardWrapperItem>
    ),
  ],

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
      <SetUpAccess {...args} />
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
