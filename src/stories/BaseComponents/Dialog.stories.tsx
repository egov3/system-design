"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { Button, Checkbox, Dialog } from "~baseComponents";

import { CardWrapperItem } from "../CardWrapperItem";

type DialogProps = React.ComponentProps<typeof Dialog>;

const DialogWithState: React.FC<DialogProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="small"
        variant="tinted"
        style={{ width: "200px" }}
      >
        Открыть диалог
      </Button>
      {isOpen && <Dialog {...args} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

const meta: Meta<typeof Dialog> = {
  title: "BaseComponents/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div
          style={{
            width: 640,
            height: 420,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
  args: {
    lang: "ru",
    size: "S",
    isDividerTop: false,
    isDividerBottom: true,
    header: {
      title: "Dialog Header",
      isClosable: true,
    },
    children: <div style={{ padding: "16px 0" }}>Dialog content</div>,
    additionalButton: { text: "Contact Support", onClick: () => {} },
    footerButtons: [
      { text: "Cancel", onClick: () => {}, variant: "secondary" },
      { text: "Approve", onClick: () => {} },
    ],
  },
  argTypes: {
    size: {
      control: "select",
      options: ["S", "M", "L"],
    },
    isDividerTop: { control: "boolean" },
    isDividerBottom: { control: "boolean" },
  },
  render: (args) => <DialogWithState {...args} />,
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {};

export const SizeM: Story = {
  args: {
    size: "M",
  },
};

export const SizeL: Story = {
  args: {
    size: "L",
  },
};

export const WithStep: Story = {
  args: {
    size: "M",
    header: {
      stepText: "Раздел 1 из 1",
      title: "Dialog Header",
      isClosable: true,
    },
  },
};

export const WithoutFooter: Story = {
  args: {
    additionalButton: undefined,
    footerButtons: undefined,
  },
};

export const LongTitle: Story = {
  args: {
    header: {
      stepText: "Раздел 1 из 1",
      title:
        "Dialog header can wrap onto multiple lines and is displayed in full",
      isClosable: true,
    },
  },
};

const CheckboxList = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {["Повышенная температура", "Боли", "Затруднение дыхания"].map(
        (label) => (
          <Checkbox
            key={label}
            label={label}
            checked={Boolean(checked[label])}
            setChecked={(value) =>
              setChecked((prev) => ({ ...prev, [label]: value }))
            }
          />
        ),
      )}
    </div>
  );
};

export const WithScrollableContent: Story = {
  args: {
    size: "M",
    isDividerTop: true,
    isDividerBottom: true,
    header: {
      title: "Что вас беспокоит?",
      isClosable: true,
    },
    children: <CheckboxList />,
    isContentScroll: true,
  },
};

export const WithOutOverlay: Story = {
  args: {
    isWithOverlay: false,
  },
};
