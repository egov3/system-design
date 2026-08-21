import {
  type CSSProperties,
  type SyntheticEvent,
  useRef,
  useState,
} from "react";
import { useCropWindow } from "~customHooks/useCropWindow";
import styles from "./PhotoCutter.module.css";

export interface IPhotoCutterProps {
  src: string;
  ratio: number;
}

export const PhotoCutter = ({ src, ratio }: IPhotoCutterProps) => {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [mediaRatio, setMediaRatio] = useState<number | null>(null);
  const { crop, windowProps } = useCropWindow(mediaRef, ratio, mediaRatio);

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>): void => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setMediaRatio(naturalWidth / naturalHeight);
  };

  return (
    <div className={styles.wrapper} data-testid="PhotoCutter_WRAPPER">
      <div
        className={styles.media}
        ref={mediaRef}
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
        {crop && (
          <div
            className={styles.frame}
            style={{
              left: `${crop.x}%`,
              top: `${crop.y}%`,
              width: `${crop.width}%`,
              height: `${crop.height}%`,
            }}
            data-testid="PhotoCutter_FRAME"
            {...windowProps}
          />
        )}
      </div>
    </div>
  );
};
