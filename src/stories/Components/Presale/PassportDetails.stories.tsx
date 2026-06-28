import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Modal } from "~baseComponents";
import { PresaleComponent } from "~components";
import { i18n } from "~constants/i18n";
import { passportDetails } from "~constants/mockData";
import type { ILangProps } from "~interfaces/common";
import type { IPassportDetailsItem } from "../../../components/Presale/PassportDetails";
import { CardWrapperItem } from "../../CardWrapperItem";

interface IPassportModalTemplateProps extends ILangProps {
  details: IPassportDetailsItem[];
}

const PassportModalTemplate = ({
  details,
  lang,
}: IPassportModalTemplateProps) => (
  <Modal
    isOpen={true}
    setIsOpen={() => {}}
    header={{
      title: i18n.Common.passportBtnText[lang],
      isClosable: true,
    }}
    lang={lang}
    variant="small"
  >
    <PresaleComponent.PassportDetails details={details} lang={lang} />
  </Modal>
);

const meta: Meta<typeof PassportModalTemplate> = {
  title: "Components/Presale/PassportDetails",
  component: PassportModalTemplate,
  argTypes: {
    lang: {
      options: ["ru", "kk", "en"],
      control: { type: "radio" },
    },
  },
  args: {},
  decorators: [
    (Story) => (
      <CardWrapperItem>
        <div style={{ width: "600px", height: "500px" }}>
          <Story />
        </div>
      </CardWrapperItem>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PassportModalTemplate>;

export const Default: Story = {
  args: {
    lang: "ru",
    details: passportDetails,
  },
};
