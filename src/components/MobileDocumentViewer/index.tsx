import type { ReactNode } from "react";

import { ChevronLeftIcon } from "@egov3/graphics/Basic/ChevronLeft";
import { ShareV1Icon } from "@egov3/graphics/General/ShareV1";

import { Button } from "../../baseComponents/Button";
import { Loader } from "../../baseComponents/Loader";
import { Typography } from "../../baseComponents/Typography";
import styles from "./MobileDocumentViewer.module.css";

export interface IMobileDocumentViewerProps {
  title: string;
  backLabel: string;
  shareLabel?: string;
  onBack: () => void;
  onShare?: () => void;
  isLoading: boolean;
  children: ReactNode;
}

export const MobileDocumentViewer = ({
  title,
  backLabel,
  shareLabel,
  onBack,
  onShare,
  isLoading,
  children,
}: IMobileDocumentViewerProps) => (
  <div className={styles.wrapper} data-testid="MobileDocumentViewer_ROOT">
    <header className={styles.header}>
      <Button
        aria-label={backLabel}
        data-testid="MobileDocumentViewer_BACK_BTN"
        onClick={onBack}
        size="small"
        variant="text"
      >
        <ChevronLeftIcon aria-hidden="true" width={24} height={24} />
      </Button>
      <Typography
        tag="span"
        fontClass="subtitles2"
        className={styles.title}
        data-testid="MobileDocumentViewer_TITLE"
      >
        {title}
      </Typography>
      {onShare && shareLabel && (
        <Button
          aria-label={shareLabel}
          data-testid="MobileDocumentViewer_SHARE_BTN"
          onClick={onShare}
          size="small"
          variant="text"
        >
          <ShareV1Icon aria-hidden="true" width={24} height={24} />
        </Button>
      )}
    </header>
    <main className={styles.body}>
      {isLoading ? (
        <div
          className={styles.loading}
          data-testid="MobileDocumentViewer_LOADING"
        >
          <Loader />
        </div>
      ) : (
        children
      )}
    </main>
  </div>
);
