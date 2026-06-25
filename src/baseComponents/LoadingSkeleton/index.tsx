import { joinClasses } from "~utils/joinClasses";
import { Typography } from "../Typography";
import styles from "./LoadingSkeleton.module.css";

export interface ILoadingSkeletonProps {
  isShimmerVisible?: boolean;
  isTitleVisible?: boolean;
  title?: string;
}

export const LoadingSkeleton = ({
  isShimmerVisible = true,
  isTitleVisible = false,
  title,
}: ILoadingSkeletonProps) => {
  const shimmerClassName = !isShimmerVisible && styles.withoutShimmer;

  return (
    <div className={styles.sectionWrap} data-testid="SectionLoadingSkeleton">
      {title && isTitleVisible && (
        <Typography
          aria-label={title}
          data-testid="SectionLoadingSkeleton_TITLE"
          fontClass="body1Medium"
          tag="h3"
        >
          {title}
        </Typography>
      )}
      {title && !isTitleVisible && (
        <div
          aria-hidden="true"
          className={joinClasses(styles.skeletonTitle, shimmerClassName)}
          data-testid="SectionLoadingSkeleton_TITLE"
        />
      )}
    </div>
  );
};
