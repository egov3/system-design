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
  cardsCount = 1,
  isShimmerVisible = true,
  isTitleLoading = true,
  title,
}: ILoadingSkeletonProps) => {
  const skeletonItems = Array.from(
    { length: cardsCount },
    (_, item) => `skeleton-card-${item + 1}`,
  );
  const shimmerClassName = !isShimmerVisible && styles.withoutShimmer;

  return (
    <div className={styles.sectionWrap} data-testid="SectionLoadingSkeleton">
      {(title || isTitleLoading) && (
        <div className={styles.label}>
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
            <div
              className={styles.skeletonTextWrapper}
              data-testid="SectionLoadingSkeleton_TEXT_WRAPPER"
            >
              <div
                className={styles.skeletonTextRow}
                data-testid="SectionLoadingSkeleton_TEXT_ROW"
              >
                <div
                  className={joinClasses(styles.skeletonText, shimmerClassName)}
                  data-testid="SectionLoadingSkeleton_TEXT"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
