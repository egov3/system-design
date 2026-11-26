import type { ReactNode } from "react";

import { Typography } from "~baseComponents";

import styles from "./PathInheritance.module.css";

export interface IPathInheritanceProps {
  actionBtns?: ReactNode;
  children: ReactNode;
  title: string;
}

export const PathInheritance = ({
  actionBtns,
  children,
  title,
}: IPathInheritanceProps): ReactNode => {
  return (
    <div
      className={styles.breadCrumpsContainer}
      data-testid="PathInheritance_WRAPPER"
    >
      <div
        className={styles.breadCrumpsItem1}
        data-testid="PathInheritance_BREADCRUMBS"
      >
        <div
          data-testid="PathInheritance_BREADCRUMBS_WRAPPER"
          className={styles.breadBlock}
        >
          {children}
        </div>
      </div>
      <div
        className={styles.breadCrumpsItem2}
        data-testid="PathInheritance_TITLE_WRAPPER"
      >
        <Typography
          aria-label={title}
          data-testid="PathInheritance_TITLE"
          fontClass="heading3"
          tag="h1"
        >
          {title}
        </Typography>
      </div>
      <div
        className={styles.breadCrumpsItem3}
        data-testid="PathInheritance_ACTIONS"
      >
        {actionBtns}
      </div>
    </div>
  );
};
