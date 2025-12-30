import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import { fn } from "storybook/test";
import { BaseComponents } from "~baseComponents";
import { CardWrapperItem } from "../CardWrapperItem";

const meta = {
  title: "BaseComponents/SearchBar",
  component: BaseComponents.SearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "chat", "modal"],
    },
    lang: {
      control: "select",
      options: ["ru", "kk", "en"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    autoFocus: { control: "boolean" },
    showClearButton: { control: "boolean" },
  },
  args: {
    lang: "ru",
    variant: "default",
    loading: false,
    disabled: false,
    autoFocus: false,
    showClearButton: true,
    handleOnEnter: fn(),
    handleModalOpen: fn(),
  },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <Story />
      </CardWrapperItem>
    ),
  ],
} satisfies Meta<typeof BaseComponents.SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lang: "ru",
    variant: "default",
  },
};

export const WithDefaultValue: Story = {
  args: {
    lang: "ru",
    variant: "default",
    defaultValue: "Пример поиска",
  },
};

export const Loading: Story = {
  args: {
    lang: "ru",
    variant: "default",
    loading: true,
    defaultValue: "Загрузка...",
  },
};

export const Disabled: Story = {
  args: {
    lang: "ru",
    variant: "default",
    disabled: true,
    defaultValue: "Отключено",
  },
};

export const ChatVariant: Story = {
  args: {
    lang: "ru",
    variant: "chat",
  },
};

export const ModalVariant: Story = {
  args: {
    lang: "ru",
    variant: "modal",
  },
};

export const WithoutClearButton: Story = {
  args: {
    lang: "ru",
    variant: "default",
    showClearButton: false,
    defaultValue: "Без кнопки очистки",
  },
};

const InteractiveSearchBar = (args: NonNullable<Story["args"]>) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleOnEnter = (value: string) => {
    setSearchValue(value);
    args.handleOnEnter?.(value);
  };

  return (
    <CardWrapperItem>
      <div
        style={{
          width: "400px",
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <BaseComponents.Typography
          tag="span"
          fontClass="body1Regular"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "12px",
          }}
        >
          Результат поиска: {searchValue || "(пусто)"}
        </BaseComponents.Typography>
        <BaseComponents.SearchBar
          {...args}
          lang={args.lang ?? "ru"}
          handleOnEnter={handleOnEnter}
        />
      </div>
    </CardWrapperItem>
  );
};

export const Interactive: Story = {
  args: {
    lang: "ru",
    variant: "default",
  },
  render: (args) => {
    return <InteractiveSearchBar {...args} lang={args.lang} />;
  },
};
