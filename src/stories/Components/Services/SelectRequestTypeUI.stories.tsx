import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import {
  IRequestTypeOption,
  SelectRequestTypeUI,
  TRequestType,
} from "src/components/Services/SelectRequestType/SelectRequestType";

const requestTypeOptions: IRequestTypeOption[] = [
  {
    label: "Проверить свою организацию",
    value: "self",
  },
  {
    label: "Проверить как участник",
    value: "thirdParty",
  },
];

const SelectRequestTypeUIStory = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [pendingRequestType, setPendingRequestType] =
    useState<TRequestType | null>(null);
  const [selectedRequestType, setSelectedRequestType] =
    useState<TRequestType | null>(null);

  const selectedLabel = requestTypeOptions.find(
    (option) => option.value === selectedRequestType,
  )?.label;

  const handleOpen = () => {
    setPendingRequestType(selectedRequestType);
    setIsOpenModal(true);
  };

  const handleSelect = () => {
    setSelectedRequestType(pendingRequestType);
    setIsOpenModal(false);
  };

  const handleChange = (value: string) => {
    if (value === "self" || value === "thirdParty") {
      setPendingRequestType(value);
    }
  };

  return (
    <SelectRequestTypeUI
      lang="ru"
      isOpenModal={isOpenModal}
      isCloseModal={setIsOpenModal}
      isDisabledModalSelectBtn={
        !pendingRequestType || pendingRequestType === selectedRequestType
      }
      selectedLabel={selectedLabel}
      pendingRequestType={pendingRequestType}
      requestTypeOptions={requestTypeOptions}
      onOpen={handleOpen}
      onRequestTypeSelect={handleSelect}
      onRequestTypeChange={handleChange}
    />
  );
};

const meta: Meta<typeof SelectRequestTypeUI> = {
  title: "Components/SelectRequestTypeUI",
  component: SelectRequestTypeUI,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof SelectRequestTypeUI>;

export const Default: Story = {
  render: () => <SelectRequestTypeUIStory />,
};

export const ModalOpened: Story = {
  args: {
    lang: "ru",
    isOpenModal: true,
    isCloseModal: () => {},
    isDisabledModalSelectBtn: true,
    selectedLabel: undefined,
    pendingRequestType: null,
    requestTypeOptions,
    onOpen: () => {},
    onRequestTypeSelect: () => {},
    onRequestTypeChange: () => {},
  },
};

export const SelectedValue: Story = {
  args: {
    lang: "ru",
    isOpenModal: false,
    isCloseModal: () => {},
    isDisabledModalSelectBtn: false,
    selectedLabel: "Проверить свою организацию",
    pendingRequestType: "self",
    requestTypeOptions,
    onOpen: () => {},
    onRequestTypeSelect: () => {},
    onRequestTypeChange: () => {},
  },
};
