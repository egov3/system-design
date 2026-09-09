import type { CSSProperties } from "react";
import { Typography } from "../Typography";
import styles from "./ProgressBar.module.css";

export const ProgressBar = ({ progress = 0 }: { progress?: number }) => {
  const value = Math.min(100, Math.max(0, progress));

  return (
    <div
      data-testid="ProgressBar"
      className={`${styles.circularProgress} ${
        value === 100 ? styles.circularProgressCompleted : ""
      }`}
      style={{ "--progress": `${value * 3.6}deg` } as CSSProperties}
    >
      <div
        className={styles.circularProgressRing}
        data-testid="ProgressBar_RING"
      >
        <div
          className={styles.circularProgressInner}
          data-testid="ProgressBar_INNER"
        >
          <Typography
            tag="h1"
            fontClass="heading1"
            data-testid="ProgressBar_VALUE"
          >
            {Math.round(value)}%
          </Typography>
        </div>
      </div>
    </div>
  );
};
