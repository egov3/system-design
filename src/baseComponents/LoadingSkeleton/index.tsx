import { joinClasses } from "~utils/joinClasses";
import { Typography } from "../Typography";
import styles from "./LoadingSkeleton.module.css";

export interface ILoadingSkeletonProps {
  isShimmerVisible?: boolean;
  isTitleLoading?: boolean;
  title?: string;
}

export const LoadingSkeleton = ({
  isShimmerVisible = true,
  isTitleLoading = false,
  title,
}: ILoadingSkeletonProps) => {
  const shimmerClassName = !isShimmerVisible && styles.withoutShimmer;

  return (
    <div className={styles.sectionWrap} data-testid="SectionLoadingSkeleton">
      {title && !isTitleLoading && (
        <Typography
          aria-label={title}
          data-testid="SectionLoadingSkeleton_TITLE"
          fontClass="body1Medium"
          tag="h3"
        >
          {title}
        </Typography>
      )}
      {isTitleLoading && (
        <div
          aria-hidden="true"
          className={joinClasses(styles.skeletonTitle, shimmerClassName)}
          data-testid="SectionLoadingSkeleton_TITLE"
        />
      )}
    </div>
  );
};
