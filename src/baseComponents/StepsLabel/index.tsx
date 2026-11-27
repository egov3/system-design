import { Typography } from "../Typography";
import styles from "./StepsLabel.module.css";

export interface IStepsLabelProps {
  label: string;
}

export const StepsLabel = ({ label }: IStepsLabelProps) => (
  <Typography
    className={styles.title}
    tag="span"
    fontClass="subtitles2"
    data-testid="StepsLabel_TITLE"
    aria-label={label}
  >
    {label}
  </Typography>
);
