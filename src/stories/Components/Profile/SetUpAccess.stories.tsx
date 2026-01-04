import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseComponents } from "~baseComponents";
import { Components } from "~components";
import { CardWrapperItem } from "../../CardWrapperItem";

const metaSetUpAccess: Meta<typeof Components.SetUpAccess> = {
  title: "Components/Profile/SetUpAccess",
  component: Components.SetUpAccess,
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
          <BaseComponents.Modal
            open={true}
            setOpen={() => {}}
            variant="small"
            lang={"ru"}
          >
            <StorySetUpAccess />
          </BaseComponents.Modal>
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
