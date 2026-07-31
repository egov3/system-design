import { AngryIcon } from "@egov3/graphics/Emoji/Angry";
import { FrowningIcon } from "@egov3/graphics/Emoji/Frowning";
import { GrinIcon } from "@egov3/graphics/Emoji/Grin";
import { NeutralIcon } from "@egov3/graphics/Emoji/Neutral";
import { SmileIcon } from "@egov3/graphics/Emoji/Smile";
import type { TSearchQualityRatingValue } from "./types";

interface IRatingIconProps {
  dataTestid?: string;
  value: TSearchQualityRatingValue;
}

const ratingIconMap = {
  1: AngryIcon,
  2: FrowningIcon,
  3: NeutralIcon,
  4: SmileIcon,
  5: GrinIcon,
};

export const RatingIcon = ({
  dataTestid = "RatingIcon_ICON",
  value,
}: IRatingIconProps) => {
  const Icon = ratingIconMap[value];

  return (
    <Icon aria-hidden="true" data-testid={dataTestid} fill="currentColor" />
  );
};
