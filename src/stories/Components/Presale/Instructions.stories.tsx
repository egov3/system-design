import { Components } from "~components";
import { steps } from "~constants/mockData";
import { CardWrapperItem } from "../../CardWrapperItem";

const InstructionsStory = () => (
  <CardWrapperItem>
    <div
      style={{
        padding: "10px",
        background: "#fff",
        borderRadius: "12px",
      }}
    >
      <Components.PresaleComponent.Instructions
        instructions={steps}
        lang="ru"
      />
    </div>
  </CardWrapperItem>
);

export const Instructions = () => <InstructionsStory />;

export default {
  title: "Components/Presale/Instructions",
  component: InstructionsStory,
};
