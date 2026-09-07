import { type CSSProperties, type SyntheticEvent, useState } from "react";
import styles from "./PhotoCutter.module.css";

export interface IPhotoCutterProps {
  src: string;
}

export const PhotoCutter = ({ src }: IPhotoCutterProps) => {
  const [mediaRatio, setMediaRatio] = useState<number | null>(null);

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>): void => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setMediaRatio(naturalWidth / naturalHeight);
  };

  return (
    <div className={styles.wrapper} data-testid="PhotoCutter_WRAPPER">
      <div
        className={styles.media}
        style={{ "--media-ratio": mediaRatio ?? 1 } as CSSProperties}
        data-testid="PhotoCutter_MEDIA"
      >
        <img
          className={styles.image}
          src={src}
          alt="Фотография для обрезки"
          onLoad={handleImageLoad}
          data-testid="PhotoCutter_IMAGE"
        />
      </div>
    </div>
  );
};
