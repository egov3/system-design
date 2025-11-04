"use client";

import type { Meta } from "@storybook/react-webpack5";
import { useState } from "react";
import { BaseComponents } from "../baseComponents";
import { CardWrapperItem } from "./CardWrapperItem";

const meta = {
  title: "SelectBoxButton",
  component: BaseComponents.SelectBoxButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BaseComponents.SelectBoxButton>;

export default meta;

export const SelectBoxButtonPreselectedValue = () => {
  const [open, setOpen] = useState<boolean>(false);

  const radioGroupItems = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];
  const [selectedOption, setSelectedOption] = useState<string>(
    radioGroupItems[0].value,
  );

  return (
    <CardWrapperItem>
      <div
        style={{
          height: "300px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseComponents.SelectBoxButton
          labelText="Select Box Button"
          disabled={false}
          error={false}
          modalValue={selectedOption}
          lang="en"
          setIsOpen={() => {
            setOpen(!open);
          }}
        />
        {open && (
          <BaseComponents.Modal
            open={open}
            setOpen={setOpen}
            header={{
              title: "Select an Option",
              isClosable: true,
            }}
            lang="en"
            variant="small"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <BaseComponents.RadioGroup
                radioGroupItems={radioGroupItems}
                setSelectedOption={(value: string) => {
                  setSelectedOption(value);
                  setOpen(!open);
                }}
                selectedOption={selectedOption}
              />
            </div>
          </BaseComponents.Modal>
        )}
      </div>
    </CardWrapperItem>
  );
};

export const SelectBoxButtonWithError = () => {
  const [open, setOpen] = useState<boolean>(false);

  const radioGroupItems = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];
  const [selectedOption, setSelectedOption] = useState<string>(
    radioGroupItems[0].value,
  );

  return (
    <CardWrapperItem>
      <div
        style={{
          height: "300px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseComponents.SelectBoxButton
          labelText="Select Box Button"
          disabled={false}
          error={true}
          modalValue={selectedOption}
          lang="en"
          setIsOpen={() => {
            setOpen(!open);
          }}
        />
        {open && (
          <BaseComponents.Modal
            open={open}
            setOpen={setOpen}
            header={{
              title: "Select an Option",
              isClosable: true,
            }}
            lang="en"
            variant="small"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <BaseComponents.RadioGroup
                radioGroupItems={radioGroupItems}
                setSelectedOption={(value: string) => {
                  setSelectedOption(value);
                  setOpen(!open);
                }}
                selectedOption={selectedOption}
              />
            </div>
          </BaseComponents.Modal>
        )}
      </div>
    </CardWrapperItem>
  );
};

export const SelectBoxButtonEmptyValue = () => {
  const [open, setOpen] = useState<boolean>(false);

  const radioGroupItems = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <CardWrapperItem>
      <div
        style={{
          height: "300px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseComponents.SelectBoxButton
          labelText="Select Box Button"
          disabled={false}
          error={false}
          modalValue={selectedOption}
          lang="en"
          setIsOpen={() => {
            setOpen(!open);
          }}
        />
        {open && (
          <BaseComponents.Modal
            open={open}
            setOpen={setOpen}
            header={{
              title: "Select an Option",
              isClosable: true,
            }}
            lang="en"
            variant="small"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <BaseComponents.RadioGroup
                radioGroupItems={radioGroupItems}
                setSelectedOption={(value: string) => {
                  setSelectedOption(value);
                  setOpen(!open);
                }}
                selectedOption={selectedOption}
              />
            </div>
          </BaseComponents.Modal>
        )}
      </div>
    </CardWrapperItem>
  );
};

export const SelectBoxButtonDisabled = () => {
  const [open, setOpen] = useState<boolean>(false);

  const radioGroupItems = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
  ];
  const [selectedOption, setSelectedOption] = useState<string>(
    radioGroupItems[0].value,
  );

  return (
    <CardWrapperItem>
      <div
        style={{
          height: "300px",
          width: "400px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BaseComponents.SelectBoxButton
          labelText="Select Box Button"
          disabled={true}
          error={false}
          modalValue={selectedOption}
          lang="en"
          setIsOpen={() => {
            setOpen(!open);
          }}
        />
        {open && (
          <BaseComponents.Modal
            open={open}
            setOpen={setOpen}
            header={{
              title: "Select an Option",
              isClosable: true,
            }}
            lang="en"
            variant="small"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <BaseComponents.RadioGroup
                radioGroupItems={radioGroupItems}
                setSelectedOption={(value: string) => {
                  setSelectedOption(value);
                  setOpen(!open);
                }}
                selectedOption={selectedOption}
              />
            </div>
          </BaseComponents.Modal>
        )}
      </div>
    </CardWrapperItem>
  );
};
