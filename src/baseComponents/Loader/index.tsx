import styles from "./Loader.module.css";

export const Loader = () => (
  <div data-testid="Loader_MAIN" className={styles.backdrop}>
    <div data-testid="Loader_CIRCLE" className={styles.circularProgress}></div>
  </div>
);
