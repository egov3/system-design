import { joinClasses } from "~utils/joinClasses";
import { Typography } from "../Typography";
import styles from "./LoadingSkeleton.module.css";

export interface ILoadingSkeletonProps {
  cardsCount?: number;
  isShimmerVisible?: boolean;
  isTitleLoading?: boolean;
  title?: string;
}

export const LoadingSkeleton = ({
  cardsCount = 2,
  isShimmerVisible = true,
  isTitleLoading = false,
  title,
}: ILoadingSkeletonProps) => {
  const skeletonItems = Array.from(
    { length: cardsCount },
    (_, item) => `skeleton-card-${item + 1}`,
  );
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
      <div
        className={styles.cardWrapper}
        data-testid="SectionLoadingSkeleton_CARDS"
      >
        {skeletonItems.map((item) => (
          <div
            aria-hidden="true"
            className={styles.skeletonCard}
            data-testid="SectionLoadingSkeleton_ITEM"
            key={item}
          >
            <div
              className={joinClasses(styles.skeletonIcon, shimmerClassName)}
              data-testid="SectionLoadingSkeleton_ICON"
            />
            <div className={styles.skeletonTextWrapper}>
              <div className={styles.skeletonTextRow}>
                <div
                  className={joinClasses(styles.skeletonText, shimmerClassName)}
                  data-testid="SectionLoadingSkeleton_TEXT"
                />
              </div>
              <div className={styles.skeletonTextRowShort}>
                <div
                  className={joinClasses(
                    styles.skeletonText,
                    styles.skeletonTextShort,
                    shimmerClassName,
                  )}
                  data-testid="SectionLoadingSkeleton_TEXT_SHORT"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
