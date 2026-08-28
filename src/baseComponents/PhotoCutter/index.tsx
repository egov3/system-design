import { type CSSProperties, type SyntheticEvent, useRef } from "react";
import {
  CROP_CORNERS,
  type ICropWindow,
  useCropWindow,
} from "~customHooks/useCropWindow";
import { cropImage } from "~utils/cropImage";
import styles from "./PhotoCutter.module.css";

export interface IPhotoCutterProps {
  src: string;
  ratio: number;
  onCropChange?: (croppedImage: string) => void;
}

export const PhotoCutter = ({
  src,
  ratio,
  onCropChange,
}: IPhotoCutterProps) => {
  const mediaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleSettle = (settled: ICropWindow): void => {
    const image = imageRef.current;
    if (!image || !onCropChange) return;
    onCropChange(cropImage(image, settled));
  };

  const { crop, mediaRatio, openWith, windowProps, cornerProps } =
    useCropWindow(mediaRef, ratio, handleSettle);

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>): void => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    handleSettle(openWith(naturalWidth / naturalHeight));
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
          ref={imageRef}
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
          >
            {CROP_CORNERS.map((corner) => (
              <span
                key={corner}
                className={styles.corner}
                data-ord={corner}
                data-testid={`PhotoCutter_CORNER_${corner}`}
                {...cornerProps(corner)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
