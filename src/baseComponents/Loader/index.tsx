import styles from "./Loader.module.css"

export const Loader = ({
  open,
}: {
  open: boolean;
}) => {
  if (!open) {
    return null;
  }

  return (
    <div data-testid="Loader_MAIN" className={styles.backdrop}>
      <div
        data-testid="Loader_CIRCLE"
        className={styles.circularProgress}
      ></div>
    </div>
  );
};
