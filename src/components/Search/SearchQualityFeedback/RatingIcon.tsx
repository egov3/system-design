import { Icons } from "@egov3/graphics";
import type { TSearchQualityRatingValue } from "./types";

interface IRatingIconProps {
  dataTestid?: string;
  value: TSearchQualityRatingValue;
}

const ratingIconMap = {
  1: Icons.Emoji.AngryIcon,
  2: Icons.Emoji.FrowningIcon,
  3: Icons.Emoji.NeutralIcon,
  4: Icons.Emoji.SmileIcon,
  5: Icons.Emoji.GrinIcon,
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
